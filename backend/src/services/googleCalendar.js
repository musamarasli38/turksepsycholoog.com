import { google } from 'googleapis';
import { createAuthWithTokens, getGoogleCalendarService } from '../config/google-calendar.js';

// Create an event in Google Calendar
export const createGoogleCalendarEvent = async (tokens, eventData) => {
  try {
    const auth = createAuthWithTokens(tokens);
    const calendar = getGoogleCalendarService(auth);

    const event = {
      summary: `Appointment: ${eventData.client_name}`,
      description: `Client: ${eventData.client_name}\nPhone: ${eventData.client_phone}\nEmail: ${eventData.client_email}\nNotes: ${eventData.client_notes || 'N/A'}`,
      start: {
        dateTime: `${eventData.appointment_date}T${eventData.appointment_time}:00`,
        timeZone: 'Europe/Amsterdam', // Adjust based on psychologist timezone
      },
      end: {
        dateTime: `${eventData.appointment_date}T${addHours(eventData.appointment_time, 1)}:00`,
        timeZone: 'Europe/Amsterdam',
      },
      attendees: [
        {
          email: eventData.client_email,
          responseStatus: 'needsAction',
        },
      ],
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
};

// Update an event in Google Calendar
export const updateGoogleCalendarEvent = async (tokens, eventId, eventData) => {
  try {
    const auth = createAuthWithTokens(tokens);
    const calendar = getGoogleCalendarService(auth);

    const event = {
      summary: `Appointment: ${eventData.client_name}`,
      description: `Client: ${eventData.client_name}\nPhone: ${eventData.client_phone}\nEmail: ${eventData.client_email}\nNotes: ${eventData.client_notes || 'N/A'}`,
      start: {
        dateTime: `${eventData.appointment_date}T${eventData.appointment_time}:00`,
        timeZone: 'Europe/Amsterdam',
      },
      end: {
        dateTime: `${eventData.appointment_date}T${addHours(eventData.appointment_time, 1)}:00`,
        timeZone: 'Europe/Amsterdam',
      },
    };

    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating Google Calendar event:', error);
    throw error;
  }
};

// Delete an event from Google Calendar
export const deleteGoogleCalendarEvent = async (tokens, eventId) => {
  try {
    const auth = createAuthWithTokens(tokens);
    const calendar = getGoogleCalendarService(auth);

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    return { deleted: true };
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error);
    throw error;
  }
};

// Get all events from Google Calendar for a date range
export const getGoogleCalendarEvents = async (tokens, startDate, endDate) => {
  try {
    const auth = createAuthWithTokens(tokens);
    const calendar = getGoogleCalendarService(auth);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: `${startDate}T00:00:00Z`,
      timeMax: `${endDate}T23:59:59Z`,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Error getting Google Calendar events:', error);
    throw error;
  }
};

// Helper function to add hours to a time string
const addHours = (timeString, hours) => {
  const [hour, minute] = timeString.split(':').map(Number);
  const newHour = String((hour + hours) % 24).padStart(2, '0');
  return `${newHour}:${String(minute).padStart(2, '0')}`;
};
