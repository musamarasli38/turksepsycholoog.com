'use client';

import { useState } from 'react';
import BookingView from './BookingView';
import ConfirmationView from './ConfirmationView';

export default function AppointmentCalendar() {
    const [step, setStep] = useState('booking'); // 'booking' or 'confirmation'
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
        <section id="appointment" className="py-24">
            <h2 className="text-3xl font-bold text-center mb-8">
                Maak een afspraak
            </h2>

            <div className="max-w-2xl mx-auto">
                {step === 'booking' ? (
                    <BookingView onComplete={handleBookingComplete} />
                ) : (
                    <ConfirmationView data={appointmentData} onReset={handleReset} />
                )}
            </div>
        </section>
    );
}
