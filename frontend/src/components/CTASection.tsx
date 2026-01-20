import {getTranslations} from 'next-intl/server';

export default async function CTASection() {
  const t = await getTranslations('cta');
  return (
    <section className="py-20 px-8 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
          {t('title')}
        </h2>
          <p className="text-xl mb-8  max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://calendly.com/semra-tasdemir-turksepsycholoog/0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold text-lg text-center"
          >
            {t('bookBtn')}
          </a>
          <a 
            href="mailto:semra.tasdemir@turksepsycholoog.com"
            className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition font-bold text-lg text-center"
          >
            {t('infoBtn')}
          </a>
        </div>
      </div>
    </section>
  );
}
