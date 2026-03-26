'use client';

export default function ConfirmationView({ data, onReset }) {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">No appointment data available</p>
      </div>
    );
  }

  const appointmentDate = new Date(data.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow p-8 space-y-6">
      {/* Success Message */}
      <div className="text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Appointment Confirmed!</h3>
        <p className="text-gray-600">
          Thank you for booking an appointment. A confirmation email has been sent to{' '}
          <strong>{data.client_email}</strong>
        </p>
      </div>

      {/* Appointment Details */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-4">Appointment Details</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="text-lg font-medium">
              {appointmentDate} at {data.appointment_time}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Your Name</p>
            <p className="text-lg font-medium">{data.client_name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="text-lg font-medium">{data.client_phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-medium">{data.client_email}</p>
          </div>

          {data.client_notes && (
            <div>
              <p className="text-sm text-gray-600">Notes</p>
              <p className="text-lg font-medium">{data.client_notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Important Info */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Important Information</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ A confirmation has been sent to your email</li>
          <li>✓ You will receive an SMS reminder 24 hours before your appointment</li>
          <li>✓ Check your email for details and a link to manage your appointment</li>
          <li>✓ You can reschedule or cancel directly from the email link</li>
        </ul>
      </div>

      {/* Confirmation Code */}
      <div className="bg-gray-100 p-4 rounded text-center">
        <p className="text-xs text-gray-600 mb-2">Confirmation Code</p>
        <p className="text-lg font-mono font-bold text-gray-900">{data.confirmation_code}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Book Another Appointment
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 rounded-lg transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
