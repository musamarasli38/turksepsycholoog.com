'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('submit')); // reuse submit text as feedback for now
    setFormData({name: '', email: '', phone: '', subject: '', message: ''});
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{t('form')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">{t('name')} *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder={t('namePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">{t('email')} *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder={t('emailPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">{t('phone')}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder={t('phonePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">{t('subject')} *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder={t('subjectPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">{t('message')} *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder={t('messagePlaceholder')}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {t('submit')}
        </button>
      </form>
    </div>
  );
}
