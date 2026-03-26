'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { getCurrentUser, getGoogleAuthUrl, completeGoogleAuth } from '@/lib/auth';

export default function SettingsPage() {
  const { user, token } = useAuth();
  const [googleConnected, setGoogleConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, [token]);

  const fetchSettings = async () => {
    try {
      const data = await getCurrentUser(token);
      setGoogleConnected(data.user.googleCalendarConnected);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleCalendar = async () => {
    try {
      setLoading(true);
      setMessage('');
      const data = await getGoogleAuthUrl(token);
      window.location.href = data.authUrl;
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and integrations.
        </p>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Google Calendar Integration */}
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
    </div>
  );
}
