'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { getGoogleAuthUrl, completeGoogleAuth } from '@/lib/auth';
import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const searchParams = useSearchParams();
  const [googleConnected, setGoogleConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle Google OAuth redirect callback
  useEffect(() => {
    const code = searchParams.get('code');
    if (code && token) {
      handleGoogleCallback(code);
    }
  }, [searchParams, token]);

  const handleGoogleCallback = async (code) => {
    try {
      setLoading(true);
      setMessage('');
      await completeGoogleAuth(token, code);
      setMessage('Google Calendar connected successfully!');
      setGoogleConnected(true);
      // Clean up URL
      window.history.replaceState({}, document.title, '/dashboard');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleCalendar = async () => {
    try {
      setLoading(true);
      setMessage('');
      const data = await getGoogleAuthUrl(token);
      // Redirect to Google OAuth
      window.location.href = data.authUrl;
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-600">
          Manage your appointments and availability from here.
        </p>
      </div>

      {/* Google Calendar Setup */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Google Calendar Integration</h2>
        <p className="text-gray-600 mb-4">
          Connect your Google Calendar to automatically sync appointments and check for conflicts.
        </p>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${message.includes('Error')
                ? 'bg-red-50 text-red-700'
                : 'bg-green-50 text-green-700'
              }`}
          >
            {message}
          </div>
        )}

        {!googleConnected ? (
          <button
            onClick={connectGoogleCalendar}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded"
          >
            {loading ? 'Connecting...' : 'Connect Google Calendar'}
          </button>
        ) : (
          <div className="bg-green-50 text-green-700 p-4 rounded">
            ✓ Google Calendar connected
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Your Availability</h3>
          <p className="text-gray-600 mb-4">
            Set your working hours and available time slots.
          </p>
          <a href="/dashboard/availability" className="text-blue-600 hover:text-blue-700 font-medium">
            Manage Availability →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Appointments</h3>
          <p className="text-gray-600 mb-4">
            View and manage your client appointments.
          </p>
          <a href="/dashboard/appointments" className="text-blue-600 hover:text-blue-700 font-medium">
            View Appointments →
          </a>
        </div>
      </div>
    </div>
  );
}
