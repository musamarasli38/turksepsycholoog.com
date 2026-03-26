import {getTranslations} from 'next-intl/server';

export default async function HowItWorksSection() {
  const t = await getTranslations('howItWorks');
  const steps = [
    {
      number: "1",
      title: t('steps.step1'),
      description: t('steps.step1Desc')
    },
    {
      number: "2",
      title: t('steps.step2'),
      description: t('steps.step2Desc')
    },
    {
      number: "3",
      title: t('steps.step3'),
      description: t('steps.step3Desc')
    },
    {
      number: "4",
      title: t('steps.step4'),
      description: t('steps.step4Desc')
    },
    {
      number: "5",
      title: t('steps.step5'),
      description: t('steps.step5Desc')
    },
    {
      number: "6",
      title: t('steps.step6'),
      description: t('steps.step6Desc')
    }
  ];

  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-black">{t('title')}</h2>
        <p className="text-center text-black mb-12 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold">
                  {step.number}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg border-l-4 border-blue-600">
          <h3 className="text-2xl font-bold mb-4 text-black">{t('details')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('duration')}</h4>
              <p className="text-gray-700">{t('durationText')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('frequency')}</h4>
              <p className="text-gray-700">{t('frequencyText')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('language')}</h4>
              <p className="text-gray-700">{t('languageText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
