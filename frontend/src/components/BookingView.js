'use client';

import { useState, useEffect } from 'react';
import { getAvailableSlots, bookAppointment } from '@/lib/appointments';
import CalendarPicker from './CalendarPicker';

export default function BookingView({ onComplete }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    client_notes: '',
  });
  const [currentStep, setCurrentStep] = useState('date'); // 'date', 'time', 'form'

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    const fetchSlots = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getAvailableSlots(selectedDate);
        setAvailableSlots(data.availableSlots || []);
        setSelectedTime(null);
      } catch (err) {
        setError(err.message);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep('time');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep('form');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.client_name || !formData.client_email || !formData.client_phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const result = await bookAppointment({
        ...formData,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
      });

      onComplete(result.appointment);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 space-y-6">
      {/* Step 1: Select Date */}
      {currentStep === 'date' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
          <CalendarPicker onSelectDate={handleDateSelect} />
        </div>
      )}

      {/* Step 2: Select Time */}
      {currentStep === 'time' && (
        <div>
          <button
            onClick={() => setCurrentStep('date')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Change Date
          </button>
          <h3 className="text-lg font-semibold mb-4">
            Select a Time
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {loading ? (
            <p className="text-gray-500">Loading available times...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTimeSelect(slot.time)}
                  className={`p-2 rounded border text-sm font-medium transition ${selectedTime === slot.time
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-700 hover:border-blue-600'
                    }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available times for this date</p>
          )}
        </div>
      )}

      {/* Step 3: Booking Form */}
      {currentStep === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            type="button"
            onClick={() => setCurrentStep('time')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Change Time
          </button>

          <div>
            <h3 className="text-lg font-semibold mb-4">Your Information</h3>
            <p className="text-gray-600 mb-4">
              {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              at {selectedTime}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="client_email"
              value={formData.client_email}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="client_phone"
              value={formData.client_phone}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+31XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes / Reason for Visit
            </label>
            <textarea
              name="client_notes"
              value={formData.client_notes}
              onChange={handleFormChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about your appointment needs..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      )}
    </div>
  );
}
