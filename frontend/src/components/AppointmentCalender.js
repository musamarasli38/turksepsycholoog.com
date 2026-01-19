export default function AppointmentCalendar() {
    return (
        <section id="appointment" className="py-24">
            <h2 className="text-3xl font-bold text-center mb-8">
                Maak een afspraak
            </h2>

            <div className="max-w-4xl mx-auto h-[700px]">
                <iframe
                    src="https://calendly.com/semra-tasdemir-turksepsycholoog/0"
                    className="w-full h-full border-0 rounded-lg shadow"
                    loading="lazy"
                />
            </div>
        </section>
    );
}
