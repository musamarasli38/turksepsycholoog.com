import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'noreply@turksepsycholoog.com'; // Change to your domain

// Send appointment confirmation email
export const sendAppointmentConfirmation = async (appointmentData) => {
  const { client_email, client_name, appointment_date, appointment_time, confirmation_code, id } = appointmentData;

  const editLink = `${process.env.FRONTEND_URL}/appointments/${id}?code=${confirmation_code}&email=${encodeURIComponent(client_email)}`;

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: client_email,
      subject: 'Appointment Confirmation',
      html: `
        <h1>Appointment Confirmed</h1>
        <p>Hello ${client_name},</p>
        <p>Your appointment has been confirmed!</p>

        <h2>Appointment Details:</h2>
        <ul>
          <li><strong>Date:</strong> ${formatDate(appointment_date)}</li>
          <li><strong>Time:</strong> ${appointment_time}</li>
        </ul>

        <p>
          <a href="${editLink}" style="background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View or Manage Appointment
          </a>
        </p>

        <p>You will receive an SMS reminder 24 hours before your appointment.</p>
        <p>If you need to cancel or reschedule, please use the link above.</p>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

// Send appointment cancellation email
export const sendAppointmentCancellation = async (client_email, client_name, appointment_date, appointment_time) => {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: client_email,
      subject: 'Appointment Cancelled',
      html: `
        <h1>Appointment Cancelled</h1>
        <p>Hello ${client_name},</p>
        <p>Your appointment has been cancelled.</p>

        <h2>Cancelled Appointment:</h2>
        <ul>
          <li><strong>Date:</strong> ${formatDate(appointment_date)}</li>
          <li><strong>Time:</strong> ${appointment_time}</li>
        </ul>

        <p>If you would like to book another appointment, please visit our website.</p>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    throw error;
  }
};

// Send appointment update email
export const sendAppointmentUpdate = async (appointmentData) => {
  const { client_email, client_name, appointment_date, appointment_time, confirmation_code, id } = appointmentData;

  const editLink = `${process.env.FRONTEND_URL}/appointments/${id}?code=${confirmation_code}&email=${encodeURIComponent(client_email)}`;

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: client_email,
      subject: 'Appointment Updated',
      html: `
        <h1>Appointment Updated</h1>
        <p>Hello ${client_name},</p>
        <p>Your appointment has been updated.</p>

        <h2>New Appointment Details:</h2>
        <ul>
          <li><strong>Date:</strong> ${formatDate(appointment_date)}</li>
          <li><strong>Time:</strong> ${appointment_time}</li>
        </ul>

        <p>
          <a href="${editLink}" style="background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Appointment
          </a>
        </p>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending update email:', error);
    throw error;
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
