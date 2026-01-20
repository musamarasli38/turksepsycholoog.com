import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const t = await getTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('about')}</h3>
            <p className="text-sm text-gray-400">
              {t('aboutText')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('services')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Individuele Therapie</a></li>
              <li><a href="#" className="hover:text-white transition">Paartherapie</a></li>
              <li><a href="#" className="hover:text-white transition">Familiegesprekken</a></li>
              <li><a href="#" className="hover:text-white transition">Kinderpsychologie</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('information')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacybeleid</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Beleid</Link></li>
              <li><Link href="/gdpr" className="hover:text-white transition">GDPR</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('contact')}</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="tel:+32485655784" className="hover:text-white transition">
                  +32 (0) 485 65 57 84
                </a>
              </p>
              <p>
                <a href="mailto:semra.tasdemir@turksepsycholoog.com" className="hover:text-white transition">
                  semra.tasdemir@turksepsycholoog.com
                </a>
              </p>
              <p>Zaventem/Bertem, Belgium</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} {t('copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/semra-tasdemir-01865aa3/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
            <a href="https://www.vind-een-psycholoog.be/psycholoog/semra-nur-tasdemir-zaventem-1.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Vind Een Psycholoog</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
