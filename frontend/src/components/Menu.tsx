'use client';

import Link from 'next/link';
import {useTranslations, useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const languages = [
    { code: 'nl', name: 'NL', flag: '🇳🇱' },
    { code: 'tr', name: 'TR', flag: '🇹🇷' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Home */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Semra Tasdemir
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
              {t('home')}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
              {t('contact')}
            </Link>

            {/* Language Selector */}
            <div className="flex gap-2 border-l pl-8">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    const segments = pathname.split('/');
                    if (segments[1]) {
                      segments[1] = lang.code;
                    }
                    const newPath = segments.join('/') || '/';
                    router.replace(newPath);
                  }}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    locale === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title={lang.name}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href="https://calendly.com/semra-tasdemir-turksepsycholoog/0"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {t('bookAppointment')}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1"
            aria-label="Menu"
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('contact')}
            </Link>
            
            {/* Mobile Language Selector */}
            <div className="flex gap-2 pt-4 border-t">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    const segments = pathname.split('/');
                    if (segments[1]) {
                      segments[1] = lang.code;
                    }
                    const newPath = segments.join('/') || '/';
                    router.replace(newPath);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    locale === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>

            <a 
              href="https://calendly.com/semra-tasdemir-turksepsycholoog/0"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
            >
              {t('bookAppointment')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
