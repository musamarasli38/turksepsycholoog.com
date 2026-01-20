import {getTranslations} from 'next-intl/server';

export default async function PrivacyPolicy() {
  const t = await getTranslations('privacy');

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
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>{t('section1.item1')}</li>
          <li>{t('section1.item2')}</li>
          <li>{t('section1.item3')}</li>
          <li>{t('section1.item4')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section2.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section2.content')}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>{t('section2.item1')}</li>
          <li>{t('section2.item2')}</li>
          <li>{t('section2.item3')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section3.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section3.content')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section4.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section4.content')}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>{t('section4.item1')}</li>
          <li>{t('section4.item2')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section5.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section5.content')}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>{t('section5.right1')}</strong> {t('section5.right1Desc')}</li>
          <li><strong>{t('section5.right2')}</strong> {t('section5.right2Desc')}</li>
          <li><strong>{t('section5.right3')}</strong> {t('section5.right3Desc')}</li>
        </ul>
        <p className="text-gray-700 mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <strong>{t('section5.note')}</strong> {t('section5.noteContent')}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section6.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section6.content')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('contact.title')}</h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-2"><strong>{t('contact.name')}</strong> Semra Tasdemir</p>
          <p className="text-gray-700 mb-2"><strong>{t('contact.email')}</strong> <a href="mailto:semra.tasdemir@turksepsycholoog.com" className="text-blue-600 hover:underline">semra.tasdemir@turksepsycholoog.com</a></p>
          <p className="text-gray-700 mb-2"><strong>{t('contact.phone')}</strong> <a href="tel:+32485655784" className="text-blue-600 hover:underline">+32 (0) 485 65 57 84</a></p>
          <p className="text-gray-700"><strong>{t('contact.address')}</strong> Zaventem/Bertem, België</p>
        </div>
      </section>
    </div>
  );
}
