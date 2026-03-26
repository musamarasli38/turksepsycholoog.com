'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/dashboard/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                Dashboard
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/dashboard/availability"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Availability
                </Link>
                <Link
                  href="/dashboard/appointments"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Appointments
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
