import {getTranslations} from 'next-intl/server';

export default async function CookiePolicy() {
  const t = await getTranslations('cookies');

  return (
    <div className="max-w-4xl mx-auto py-16 px-8">
      <h1 className="text-4xl font-bold mb-8 text-black">{t('title')}</h1>
      
      <section className="mb-8">
        <p className="text-gray-700 mb-4">{t('intro')}</p>
        <p className="text-gray-700 mb-4">
          <strong>{t('lastUpdated')}</strong> {new Date().toLocaleDateString('nl-BE')}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section1.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section1.content')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section2.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section2.content')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section3.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section3.content')}</p>
        <div className="bg-blue-50 p-6 rounded-lg mt-4">
          <p className="text-gray-700">{t('section3.note')}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('contact.title')}</h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-2">{t('contact.content')}</p>
          <p className="text-gray-700 mb-2"><strong>{t('contact.email')}</strong> <a href="mailto:semra.tasdemir@turksepsycholoog.com" className="text-blue-600 hover:underline">semra.tasdemir@turksepsycholoog.com</a></p>
        </div>
      </section>
    </div>
  );
}
