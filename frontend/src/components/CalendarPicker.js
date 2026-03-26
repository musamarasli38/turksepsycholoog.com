'use client';

import { useState } from 'react';

export default function CalendarPicker({ onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleSelectDay = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Format as YYYY-MM-DD
    const dateString = selectedDate.toISOString().split('T')[0];
    onSelectDate(dateString);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Previous
        </button>
        <h3 className="text-lg font-semibold">{monthName}</h3>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gray-50 p-4 rounded-lg">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
            <div key={dayName} className="text-center text-sm font-semibold text-gray-600">
              {dayName}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="aspect-square" />;
            }

            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            dayDate.setHours(0, 0, 0, 0);
            const isPastDate = dayDate < today;

            return (
              <button
                key={day}
                onClick={() => handleSelectDay(day)}
                disabled={isPastDate}
                className={`aspect-square rounded-lg font-medium text-sm transition ${isPastDate
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-500'
                  }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Select a date to see available times
      </p>
    </div>
  );
}
