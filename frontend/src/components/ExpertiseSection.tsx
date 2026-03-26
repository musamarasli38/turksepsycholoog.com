import {getTranslations} from 'next-intl/server';

export default async function ExpertiseSection() {
  const t = await getTranslations('expertise');
  const therapies = [
    {
      name: t('therapies.individual'),
      description: t('therapies.individualDesc')
    },
    {
      name: t('therapies.couples'),
      description: t('therapies.couplesDesc')
    },
    {
      name: t('therapies.family'),
      description: t('therapies.familyDesc')
    },
    {
      name: t('therapies.children'),
      description: t('therapies.childrenDesc')
    },
    {
      name: t('therapies.emdr'),
      description: t('therapies.emdrDesc')
    },
    {
      name: t('therapies.eft'),
      description: t('therapies.eftDesc')
    },
    {
      name: t('therapies.theraplay'),
      description: t('therapies.theraplayDesc')
    },
    {
      name: t('therapies.act'),
      description: t('therapies.actDesc')
    }
  ];

  return (
    <section className="py-16 bg-gray-50 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-black">{t('title')}</h2>
        <p className="text-center text-black mb-12 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapies.map((therapy, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{therapy.name}</h3>
              <p className="text-gray-700">{therapy.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{t('certificates')}</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Family Counseling Certificate</li>
            <li>✓ EFT (Emotionally Focused Therapy) Certificate</li>
            <li>✓ EFCT (Emotionally Focused Couples Therapy) Certificate</li>
            <li>✓ Theraplay Certificate (Niveau 1)</li>
            <li>✓ ACT (Acceptance & Commitment Therapy) Certificate</li>
            <li>✓ Experimental Play Therapy (Intermediate Level)</li>
            <li>✓ EMDR (Eye Movement Desensitization & Reprocessing) Niveau 1</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
