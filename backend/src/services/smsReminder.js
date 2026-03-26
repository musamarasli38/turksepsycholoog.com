import { supabase } from '../config/supabase.js';

const SMS_API_URL = process.env.SMS_TOOLS_API_URL;
const SMS_API_KEY = process.env.SMS_TOOLS_API_KEY;
const SMS_ACCOUNT_ID = process.env.SMS_TOOLS_ACCOUNT_ID;

// Send SMS via SMS Tools API
const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await fetch(`${SMS_API_URL}/sms/send`, {
      method: 'POST',
      headers: {
        'api-key': SMS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        body: message,
        account_id: SMS_ACCOUNT_ID,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`SMS API error: ${error.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

// Send appointment reminders for tomorrow
export const sendAppointmentReminders = async () => {
  try {
    console.log('Starting appointment reminder check...');

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    // Get appointments for tomorrow that haven't had reminders sent
    const { data: appointments, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', tomorrowString)
      .eq('status', 'confirmed')
      .eq('reminder_sent', false);

    if (fetchError) {
      throw new Error(`Database error: ${fetchError.message}`);
    }

    if (!appointments || appointments.length === 0) {
      console.log('No appointments scheduled for tomorrow');
      return {
        success: true,
        message: 'No appointments to remind',
        count: 0,
      };
    }

    console.log(`Found ${appointments.length} appointments for tomorrow`);

    let successCount = 0;
    let failureCount = 0;
    const results = [];

    // Send reminder for each appointment
    for (const appointment of appointments) {
      try {
        // Format the message
        const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('nl-NL', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const reminderMessage = `Herinnering: U heeft morgen (${appointmentDate}) om ${appointment.appointment_time} een afspraak. Bedankt!`;

        // Send SMS
        const smsResponse = await sendSMS(appointment.client_phone, reminderMessage);

        // Record reminder as sent
        const { error: insertError } = await supabase
          .from('appointment_reminders')
          .insert([
            {
              appointment_id: appointment.id,
              reminder_sent_at: new Date().toISOString(),
              sms_tools_response: smsResponse,
            },
          ]);

        if (insertError) {
          throw insertError;
        }

        // Mark appointment as reminder sent
        await supabase
          .from('appointments')
          .update({ reminder_sent: true })
          .eq('id', appointment.id);

        successCount++;
        results.push({
          appointment_id: appointment.id,
          client_phone: appointment.client_phone,
          status: 'sent',
        });

        console.log(`✓ Reminder sent to ${appointment.client_phone}`);
      } catch (error) {
        failureCount++;
        results.push({
          appointment_id: appointment.id,
          client_phone: appointment.client_phone,
          status: 'failed',
          error: error.message,
        });

        console.error(`✗ Failed to send reminder to ${appointment.client_phone}:`, error.message);
      }
    }

    console.log(`Reminder check complete: ${successCount} sent, ${failureCount} failed`);

    return {
      success: true,
      message: 'Reminder check completed',
      totalAppointments: appointments.length,
      successCount,
      failureCount,
      results,
    };
  } catch (error) {
    console.error('Error in appointment reminder service:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Test function to send reminder to a specific appointment
export const sendTestReminder = async (appointmentId) => {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (error || !appointment) {
      throw new Error('Appointment not found');
    }

    const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('nl-NL');
    const reminderMessage = `Test reminder: Appointment on ${appointmentDate} at ${appointment.appointment_time}`;

    const smsResponse = await sendSMS(appointment.client_phone, reminderMessage);

    return {
      success: true,
      message: 'Test reminder sent',
      response: smsResponse,
    };
  } catch (error) {
    console.error('Error sending test reminder:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
