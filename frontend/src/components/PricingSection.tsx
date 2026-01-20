import {getTranslations} from 'next-intl/server';

export default async function PricingSection() {
  const t = await getTranslations('pricing');

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-black">{t('title')}</h2>
        <p className="text-center text-black mb-12 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kennismaking */}
          <div className="border-2 border-gray-200 rounded-lg p-8">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{t('consultation')}</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">{t('consultationPrice')}</p>
            </div>
            <p className="text-gray-700 mb-6">
              {t('consultationDesc')}
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ Geen verplichtingen</li>
              <li>✓ Flexibel planbaar</li>
              <li>✓ Volledig vertrouwelijk</li>
            </ul>
            <a 
              href="https://calendly.com/semra-tasdemir-turksepsycholoog/0"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
            >
              {t('consultation')}
            </a>
          </div>

          {/* Individuele Therapie */}
          <div className="border-2 border-blue-600 rounded-lg p-8 bg-blue-50">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{t('therapy')}</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">{t('therapyPrice')}</p>
            </div>
            <p className="text-gray-700 mb-6">
              {t('therapyDesc')}
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>✓ Individueel afgestemd</li>
              <li>✓ Betaal per sessie</li>
              <li>✓ Geen wachtlijst</li>
              <li>✓ Flexibel planbaar</li>
            </ul>
            <a 
              href="https://calendly.com/semra-tasdemir-turksepsycholoog/0"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
            >
              {t('therapy')}
            </a>
          </div>
        </div>

        {/* Praktische Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg text-gray-900 mb-3">{t('payment')}</h4>
            <p className="text-gray-700">
              {t('paymentText')}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg text-gray-900 mb-3">{t('cancellation')}</h4>
            <p className="text-gray-700">
              {t('cancellationText')}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg text-gray-900 mb-3">{t('insurance')}</h4>
            <p className="text-gray-700">
              {t('insuranceText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
