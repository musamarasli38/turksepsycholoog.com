'use client';

import { useTranslations } from 'next-intl';
import BookingView from '@/components/BookingView';
import ConfirmationView from '@/components/ConfirmationView';
import { useState } from 'react';

export default function AppointmentsPage() {
  const t = useTranslations('appointments');
  const [step, setStep] = useState('booking');
  const [appointmentData, setAppointmentData] = useState(null);

  const handleBookingComplete = (data) => {
    setAppointmentData(data);
    setStep('confirmation');
  };

  const handleReset = () => {
    setStep('booking');
    setAppointmentData(null);
  };

  return (
    <section id="appointment" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">{t('title')}</h1>

        {step === 'booking' ? (
          <BookingView onComplete={handleBookingComplete} />
        ) : (
          <ConfirmationView data={appointmentData} onReset={handleReset} />
        )}
      </div>
    </section>
  );
}
