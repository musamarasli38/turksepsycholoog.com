const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Get all availability slots
export const getAvailability = async (token) => {
  const response = await fetch(`${API_URL}/api/availability`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch availability');
  }

  return response.json();
};

// Create availability slot
export const createAvailability = async (token, data) => {
  const response = await fetch(`${API_URL}/api/availability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create availability');
  }

  return response.json();
};

// Update availability slot
export const updateAvailability = async (token, id, data) => {
  const response = await fetch(`${API_URL}/api/availability/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update availability');
  }

  return response.json();
};

// Delete availability slot
export const deleteAvailability = async (token, id) => {
  const response = await fetch(`${API_URL}/api/availability/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete availability');
  }

  return response.json();
};
