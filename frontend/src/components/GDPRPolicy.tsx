import {getTranslations} from 'next-intl/server';

export default async function GDPRPolicy() {
  const t = await getTranslations('gdpr');

  return (
    <div className="max-w-4xl mx-auto py-16 px-8">
      <h1 className="text-4xl font-bold mb-8 text-black">{t('title')}</h1>
      
      <section className="mb-8">
        <p className="text-gray-700 mb-4">{t('intro')}</p>
        <p className="text-gray-700 mb-4">
          <strong>{t('lastUpdated')}</strong> {new Date().toLocaleDateString('nl-BE')}
        </p>
      </section>

      <section className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('professional.title')}</h2>
        <p className="text-gray-700 mb-4">{t('professional.content')}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>{t('professional.item1')}</li>
          <li>{t('professional.item2')}</li>
          <li>{t('professional.item3')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section1.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section1.content')}</p>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-black">{t('section1.basis1')}</h3>
            <p className="text-gray-700">{t('section1.basis1Desc')}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-black">{t('section1.basis2')}</h3>
            <p className="text-gray-700">{t('section1.basis2Desc')}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-black">{t('section1.basis3')}</h3>
            <p className="text-gray-700">{t('section1.basis3Desc')}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section2.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section2.content')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-blue-600">{t('section2.right1')}</h3>
            <p className="text-gray-700 text-sm">{t('section2.right1Desc')}</p>
          </div>
          <div className="border-2 border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-blue-600">{t('section2.right2')}</h3>
            <p className="text-gray-700 text-sm">{t('section2.right2Desc')}</p>
          </div>
          <div className="border-2 border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-blue-600">{t('section2.right3')}</h3>
            <p className="text-gray-700 text-sm">{t('section2.right3Desc')}</p>
          </div>
          <div className="border-2 border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-blue-600">{t('section2.right4')}</h3>
            <p className="text-gray-700 text-sm">{t('section2.right4Desc')}</p>
          </div>
          <div className="border-2 border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-blue-600">{t('section2.right5')}</h3>
            <p className="text-gray-700 text-sm">{t('section2.right5Desc')}</p>
          </div>
          <div className="border-2 border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-blue-600">{t('section2.right6')}</h3>
            <p className="text-gray-700 text-sm">{t('section2.right6Desc')}</p>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section3.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section3.content')}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>{t('section3.item1')}</li>
          <li>{t('section3.item2')}</li>
          <li>{t('section3.item3')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section4.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section4.content')}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>{t('section4.item1')}</li>
          <li>{t('section4.item2')}</li>
          <li>{t('section4.item3')}</li>
          <li>{t('section4.item4')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('section5.title')}</h2>
        <p className="text-gray-700 mb-4">{t('section5.content')}</p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-2"><strong>{t('section5.authority')}</strong></p>
          <p className="text-gray-700 mb-2">{t('section5.authorityName')}</p>
          <p className="text-gray-700 mb-2">
            <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              www.gegevensbeschermingsautoriteit.be
            </a>
          </p>
          <p className="text-gray-700 mb-2">{t('section5.address')}</p>
          <p className="text-gray-700">{t('section5.email')}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">{t('contact.title')}</h2>
        <p className="text-gray-700 mb-4">{t('contact.content')}</p>
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
