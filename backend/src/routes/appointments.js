import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateUser } from '../middleware/auth.js';
import { getGoogleCalendarEvents, createGoogleCalendarEvent } from '../services/googleCalendar.js';
import { sendAppointmentConfirmation, sendAppointmentCancellation } from '../services/email.js';
import { sendAppointmentReminders, sendTestReminder } from '../services/smsReminder.js';
import crypto from 'crypto';

const router = express.Router();

// Generate random confirmation code
const generateConfirmationCode = () => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

// Get available slots for a specific date (PUBLIC endpoint)
router.get('/available-slots', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    // Get day of week (0 = Sunday, 6 = Saturday)
    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.getDay();

    // Get availability slots for this day from database
    const { data: availabilitySlots, error: slotError } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('day_of_week', dayOfWeek);

    if (slotError) {
      return res.status(500).json({ error: slotError.message });
    }

    // Get already booked appointments for this date
    const { data: bookedAppointments, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', date)
      .eq('status', 'confirmed');

    if (appointmentError) {
      return res.status(500).json({ error: appointmentError.message });
    }

    // Get Google Calendar events for this date (if psychologist has connected calendar)
    let googleEvents = [];
    const { data: oauthData } = await supabase
      .from('oauth_credentials')
      .select('access_token, refresh_token, token_expires_at')
      .eq('provider', 'google_calendar')
      .single();

    if (oauthData?.access_token) {
      try {
        const tokens = {
          access_token: oauthData.access_token,
          refresh_token: oauthData.refresh_token,
          expiry_date: new Date(oauthData.token_expires_at).getTime(),
        };
        googleEvents = await getGoogleCalendarEvents(tokens, date, date);
      } catch (error) {
        console.error('Error fetching Google Calendar events:', error);
        // Continue without Google Calendar data if error
      }
    }

    // Generate available slots
    const availableSlots = [];

    for (const slot of availabilitySlots) {
      const [startHour, startMin] = slot.start_time.split(':').map(Number);
      const [endHour, endMin] = slot.end_time.split(':').map(Number);
      const slotDuration = slot.slot_duration_minutes;

      // Generate all possible slots for this time range
      let currentMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      while (currentMinutes + slotDuration <= endMinutes) {
        const slotHour = Math.floor(currentMinutes / 60);
        const slotMinutes = currentMinutes % 60;
        const slotTime = `${String(slotHour).padStart(2, '0')}:${String(slotMinutes).padStart(2, '0')}`;
        const slotEndMinutes = currentMinutes + slotDuration;
        const slotEndHour = Math.floor(slotEndMinutes / 60);
        const slotEndMin = slotEndMinutes % 60;
        const slotEndTime = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMin).padStart(2, '0')}`;

        // Check if slot is already booked
        const isBooked = bookedAppointments.some(
          (apt) => apt.appointment_time === slotTime
        );

        // Check if slot conflicts with Google Calendar
        const hasGoogleConflict = googleEvents.some((event) => {
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          const slotStart = new Date(`${date}T${slotTime}:00`);
          const slotEnd = new Date(`${date}T${slotEndTime}:00`);

          return slotStart < eventEnd && slotEnd > eventStart;
        });

        if (!isBooked && !hasGoogleConflict) {
          availableSlots.push({
            time: slotTime,
            endTime: slotEndTime,
          });
        }

        currentMinutes += slotDuration;
      }
    }

    res.json({ date, availableSlots });
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

// Book an appointment (PUBLIC endpoint)
router.post('/', async (req, res) => {
  try {
    const { client_name, client_email, client_phone, client_notes, appointment_date, appointment_time } = req.body;

    // Validation
    if (!client_name || !client_email || !client_phone || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slot is still available
    const { data: existingAppointment, error: checkError } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', appointment_date)
      .eq('appointment_time', appointment_time)
      .eq('status', 'confirmed')
      .single();

    if (existingAppointment) {
      return res.status(400).json({ error: 'This time slot is no longer available' });
    }

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Get psychologist info (currently only one, but scalable for multiple)
    const { data: psychologist } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'psychologist')
      .single();

    if (!psychologist) {
      return res.status(500).json({ error: 'No psychologist found' });
    }

    // Create appointment
    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert([
        {
          client_name,
          client_email,
          client_phone,
          client_notes,
          appointment_date,
          appointment_time,
          status: 'confirmed',
          confirmation_code: confirmationCode,
          created_by: psychologist.id,
        },
      ])
      .select();

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    const newAppointment = appointment[0];

    // Get psychologist's Google Calendar credentials
    const { data: oauthData } = await supabase
      .from('oauth_credentials')
      .select('access_token, refresh_token, token_expires_at')
      .eq('user_id', psychologist.id)
      .eq('provider', 'google_calendar')
      .single();

    // Create Google Calendar event if credentials exist
    if (oauthData?.access_token) {
      try {
        const tokens = {
          access_token: oauthData.access_token,
          refresh_token: oauthData.refresh_token,
          expiry_date: new Date(oauthData.token_expires_at).getTime(),
        };

        const googleEvent = await createGoogleCalendarEvent(tokens, {
          client_name,
          client_email,
          client_phone,
          client_notes,
          appointment_date,
          appointment_time,
        });

        // Store Google event ID
        await supabase
          .from('appointments')
          .update({ google_event_id: googleEvent.id })
          .eq('id', newAppointment.id);
      } catch (error) {
        console.error('Error creating Google Calendar event:', error);
        // Continue without Google Calendar event
      }
    }

    // Send confirmation email
    try {
      await sendAppointmentConfirmation({
        ...newAppointment,
        id: newAppointment.id,
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // Don't fail the appointment if email fails
    }

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: {
        id: newAppointment.id,
        confirmation_code: confirmationCode,
        ...newAppointment,
      },
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Get appointment details (accessible with confirmation code + email)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, email } = req.query;

    if (!code || !email) {
      return res.status(400).json({ error: 'Confirmation code and email are required' });
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Verify confirmation code and email
    if (appointment.confirmation_code !== code || appointment.client_email !== email) {
      return res.status(403).json({ error: 'Invalid confirmation code or email' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error getting appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// Update appointment (accessible with confirmation code + email)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, email } = req.query;
    const { appointment_date, appointment_time, client_notes } = req.body;

    if (!code || !email) {
      return res.status(400).json({ error: 'Confirmation code and email are required' });
    }

    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Verify credentials
    if (appointment.confirmation_code !== code || appointment.client_email !== email) {
      return res.status(403).json({ error: 'Invalid confirmation code or email' });
    }

    // Update appointment
    const { data: updated, error: updateError } = await supabase
      .from('appointments')
      .update({
        ...(appointment_date && { appointment_date }),
        ...(appointment_time && { appointment_time }),
        ...(client_notes !== undefined && { client_notes }),
      })
      .eq('id', id)
      .select();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.json({
      message: 'Appointment updated successfully',
      appointment: updated[0],
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Cancel appointment (accessible with confirmation code + email)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, email } = req.query;

    if (!code || !email) {
      return res.status(400).json({ error: 'Confirmation code and email are required' });
    }

    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Verify credentials
    if (appointment.confirmation_code !== code || appointment.client_email !== email) {
      return res.status(403).json({ error: 'Invalid confirmation code or email' });
    }

    // Mark as cancelled instead of deleting
    const { error: updateError } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // Send cancellation email
    try {
      await sendAppointmentCancellation(
        appointment.client_email,
        appointment.client_name,
        appointment.appointment_date,
        appointment.appointment_time
      );
    } catch (error) {
      console.error('Error sending cancellation email:', error);
    }

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});

// Send appointment reminders for tomorrow (PROTECTED - requires auth or webhook key)
router.post('/reminders/send', authenticateUser, async (req, res) => {
  try {
    const result = await sendAppointmentReminders();
    res.json(result);
  } catch (error) {
    console.error('Error sending reminders:', error);
    res.status(500).json({ error: 'Failed to send reminders' });
  }
});

// Send test reminder to specific appointment (PROTECTED - requires auth)
router.post('/:id/reminder-test', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify appointment belongs to this psychologist
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .eq('created_by', req.user.id)
      .single();

    if (fetchError || !appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const result = await sendTestReminder(id);
    res.json(result);
  } catch (error) {
    console.error('Error sending test reminder:', error);
    res.status(500).json({ error: 'Failed to send test reminder' });
  }
});

export default router;
