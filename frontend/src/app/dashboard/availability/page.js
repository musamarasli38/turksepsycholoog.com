'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from '@/lib/availability';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityPage() {
  const { token } = useAuth();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    day_of_week: 1,
    start_time: '09:00',
    end_time: '17:00',
    slot_duration_minutes: 60,
  });

  useEffect(() => {
    fetchAvailability();
  }, [token]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAvailability(token);
      setSlots(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await updateAvailability(token, editingId, formData);
        setSuccess('Availability updated successfully');
      } else {
        await createAvailability(token, formData);
        setSuccess('Availability slot added successfully');
      }
      setFormData({
        day_of_week: 1,
        start_time: '09:00',
        end_time: '17:00',
        slot_duration_minutes: 60,
      });
      setEditingId(null);
      fetchAvailability();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (slot) => {
    setFormData({
      day_of_week: slot.day_of_week,
      start_time: slot.start_time,
      end_time: slot.end_time,
      slot_duration_minutes: slot.slot_duration_minutes,
    });
    setEditingId(slot.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this availability slot?')) {
      return;
    }

    try {
      setError('');
      await deleteAvailability(token, id);
      setSuccess('Availability slot deleted');
      fetchAvailability();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      day_of_week: 1,
      start_time: '09:00',
      end_time: '17:00',
      slot_duration_minutes: 60,
    });
  };

  // Group slots by day
  const slotsByDay = {};
  DAYS.forEach((_, index) => {
    slotsByDay[index] = slots.filter(s => s.day_of_week === index);
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Availability</h1>
        <p className="text-gray-600">
          Set your working hours and available time slots for clients to book appointments.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded">
          {success}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Availability' : 'Add New Availability Slot'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Day of Week
              </label>
              <select
                value={formData.day_of_week}
                onChange={(e) =>
                  setFormData({ ...formData, day_of_week: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {DAYS.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slot Duration (minutes)
              </label>
              <input
                type="number"
                min="15"
                step="15"
                value={formData.slot_duration_minutes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slot_duration_minutes: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              {editingId ? 'Update' : 'Add'} Slot
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Weekly Schedule Display */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>

        {loading ? (
          <p>Loading availability slots...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAYS.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-4">{day}</h3>

                {slotsByDay[dayIndex].length > 0 ? (
                  <div className="space-y-3">
                    {slotsByDay[dayIndex].map((slot) => (
                      <div
                        key={slot.id}
                        className="bg-gray-50 p-4 rounded border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {slot.start_time} - {slot.end_time}
                            </p>
                            <p className="text-sm text-gray-600">
                              {slot.slot_duration_minutes}-minute slots
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(slot)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(slot.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No availability set</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
