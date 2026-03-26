const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Get available slots for a specific date (PUBLIC)
export const getAvailableSlots = async (date) => {
  const response = await fetch(`${API_URL}/api/appointments/available-slots?date=${date}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch available slots');
  }

  return response.json();
};

// Book an appointment (PUBLIC)
export const bookAppointment = async (appointmentData) => {
  const response = await fetch(`${API_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to book appointment');
  }

  return response.json();
};

// Get appointment details (PUBLIC - with confirmation code)
export const getAppointment = async (id, code, email) => {
  const response = await fetch(
    `${API_URL}/api/appointments/${id}?code=${code}&email=${encodeURIComponent(email)}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch appointment');
  }

  return response.json();
};

// Update appointment (PUBLIC - with confirmation code)
export const updateAppointment = async (id, code, email, updateData) => {
  const response = await fetch(
    `${API_URL}/api/appointments/${id}?code=${code}&email=${encodeURIComponent(email)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update appointment');
  }

  return response.json();
};

// Cancel appointment (PUBLIC - with confirmation code)
export const cancelAppointment = async (id, code, email) => {
  const response = await fetch(
    `${API_URL}/api/appointments/${id}?code=${code}&email=${encodeURIComponent(email)}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to cancel appointment');
  }

  return response.json();
};

// Get all appointments for psychologist (PROTECTED - requires auth)
export const getPsychologistAppointments = async (token) => {
  const response = await fetch(`${API_URL}/api/appointments/psychologist/all`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch appointments');
  }

  return response.json();
};
