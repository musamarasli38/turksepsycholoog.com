'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { getPsychologistAppointments } from '@/lib/appointments';

export default function AppointmentsPage() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'cancelled'

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPsychologistAppointments(token);
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const upcomingAppointments = filteredAppointments.filter(
    (apt) => new Date(apt.appointment_date) >= new Date()
  );

  const pastAppointments = filteredAppointments.filter(
    (apt) => new Date(apt.appointment_date) < new Date()
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Appointments</h1>
        <p className="text-gray-600">
          View and manage all client appointments.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {['all', 'confirmed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded capitalize font-medium transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No appointments found</p>
        </div>
      ) : (
        <>
          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            </div>
          )}

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Past Appointments</h2>
              <div className="space-y-3">
                {pastAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AppointmentCard({ appointment }) {
  const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const isCancelled = appointment.status === 'cancelled';
  const isPast = new Date(appointment.appointment_date) < new Date();

  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${
      isCancelled ? 'border-red-500' : 'border-green-500'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date & Time */}
        <div>
          <p className="text-sm text-gray-600">Date & Time</p>
          <p className="text-lg font-semibold">{appointmentDate}</p>
          <p className="text-lg font-semibold">{appointment.appointment_time}</p>
        </div>

        {/* Client Info */}
        <div>
          <p className="text-sm text-gray-600">Client</p>
          <p className="text-lg font-semibold">{appointment.client_name}</p>
          <p className="text-sm text-gray-600">{appointment.client_email}</p>
          <p className="text-sm text-gray-600">{appointment.client_phone}</p>
        </div>

        {/* Status & Actions */}
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p className={`text-lg font-semibold mb-3 ${
            isCancelled ? 'text-red-600' : 'text-green-600'
          }`}>
            {isCancelled ? 'Cancelled' : 'Confirmed'}
          </p>
          {appointment.client_notes && (
            <div>
              <p className="text-sm text-gray-600">Notes</p>
              <p className="text-sm">{appointment.client_notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
