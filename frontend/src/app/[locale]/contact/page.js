import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {getTranslations} from 'next-intl/server';

export default async function Contact() {
    const t = await getTranslations('contact');

    return (
        <main className="min-h-screen flex flex-col justify-between bg-gray-50">
            <div className="py-16 px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl font-bold mb-8 text-center">{t('title')}</h1>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <ContactForm />

                        {/* Contact Info & Map */}
                        <div>
                            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
                                <h2 className="text-2xl font-bold mb-6">{t('contactInfo')}</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <a href="mailto:semra.tasdemir@turksepsycholoog.com" className="text-blue-600 hover:underline">
                                            semra.tasdemir@turksepsycholoog.com
                                        </a>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Telefoon</h3>
                                        <a href="tel:+32485655784" className="text-blue-600 hover:underline">
                                            +32 (0) 485 65 57 84
                                        </a>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                                        <p className="text-gray-700">
                                            Toekomststraat 50<br />
                                            1930 Zaventem<br />
                                            Belgium
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{t('availability')}</h3>
                                        <p className="text-gray-700">
                                            {t('availabilityText')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps */}
                            <div className="rounded-lg shadow-md overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.2365917582596!2d4.415!3d50.889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3d0c7e7c7e7c7%3A0x0!2sToekomststraat%2050%2C%201930%20Zaventem!5e0!3m2!1snl!2sbe!4v1705768800000"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
