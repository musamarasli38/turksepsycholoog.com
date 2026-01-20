import {getTranslations} from 'next-intl/server';

export default async function AboutSection() {
  const t = await getTranslations('about');
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">{t('title')}</h2>
        
        <div className="space-y-6 text-lg text-gray-700">
          <p>{t('intro')}</p>

          <p>{t('experience')}</p>

          <p>{t('approach')}</p>

          <div className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50">
            <p className="font-semibold text-gray-900">{t('languageTitle')}</p>
            <p className="mt-2 text-sm text-gray-700">{t('languageNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
