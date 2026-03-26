'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getAppointment, updateAppointment, cancelAppointment } from '@/lib/appointments';

export default function AppointmentManagementPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;
  const code = searchParams.get('code');
  const email = searchParams.get('email');

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id || !code || !email) {
      setError('Invalid appointment link');
      setLoading(false);
      return;
    }

    fetchAppointment();
  }, [id, code, email]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAppointment(id, code, email);
      setAppointment(data);
      setEditData({
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        client_notes: data.client_notes,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateAppointment(id, code, email, {
        appointment_date: editData.appointment_date,
        appointment_time: editData.appointment_time,
        client_notes: editData.client_notes,
      });
      setAppointment({
        ...appointment,
        ...editData,
      });
      setIsEditing(false);
      alert('Appointment updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      await cancelAppointment(id, code, email);
      setAppointment({ ...appointment, status: 'cancelled' });
      alert('Appointment cancelled successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error && !appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow p-8 max-w-md">
          <p className="text-gray-600">Appointment not found</p>
        </div>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isCancelled = appointment.status === 'cancelled';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <a href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-block">
          ← Back to Home
        </a>

        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Manage Your Appointment</h1>
            <p className="text-blue-100">Confirmation Code: {appointment.confirmation_code}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded">
                {error}
              </div>
            )}

            {isCancelled && (
              <div className="bg-red-50 border border-red-200 p-4 rounded text-center">
                <p className="text-red-700 font-semibold">
                  This appointment has been cancelled
                </p>
              </div>
            )}

            {/* Appointment Details */}
            {!isEditing ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Current Appointment Details</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="text-lg font-medium">
                      {appointmentDate} at {appointment.appointment_time}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-lg font-medium">{appointment.client_name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-medium">{appointment.client_email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-lg font-medium">{appointment.client_phone}</p>
                  </div>

                  {appointment.client_notes && (
                    <div>
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="text-lg font-medium">{appointment.client_notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`text-lg font-medium ${isCancelled ? 'text-red-600' : 'text-green-600'
                      }`}>
                      {isCancelled ? 'Cancelled' : 'Confirmed'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveChanges} className="space-y-4">
                <h2 className="text-2xl font-bold">Edit Appointment</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editData.appointment_date}
                    onChange={(e) =>
                      setEditData({ ...editData, appointment_date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={editData.appointment_time}
                    onChange={(e) =>
                      setEditData({ ...editData, appointment_time: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={editData.client_notes || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, client_notes: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Actions */}
            {!isEditing && !isCancelled && (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
                >
                  Edit Appointment
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg"
                >
                  {saving ? 'Cancelling...' : 'Cancel Appointment'}
                </button>
              </div>
            )}

            {isCancelled && (
              <a
                href="/"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
              >
                Book a New Appointment
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
