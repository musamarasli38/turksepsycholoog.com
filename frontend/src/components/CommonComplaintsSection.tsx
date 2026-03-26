import {getTranslations} from 'next-intl/server';

export default async function CommonComplaintsSection() {
  const t = await getTranslations('complaints');
  const complaints = [
    {
      icon: "😔",
      name: t('items.depression'),
      description: t('items.depressionDesc')
    },
    {
      icon: "😰",
      name: t('items.anxiety'),
      description: t('items.anxietyDesc')
    },
    {
      icon: "🔥",
      name: t('items.burnout'),
      description: t('items.burnoutDesc')
    },
    {
      icon: "💔",
      name: t('items.relationships'),
      description: t('items.relationshipsDesc')
    },
    {
      icon: "😠",
      name: t('items.anger'),
      description: t('items.angerDesc')
    },
    {
      icon: "🎬",
      name: t('items.trauma'),
      description: t('items.traumaDesc')
    },
    {
      icon: "🌀",
      name: t('items.ocd'),
      description: t('items.ocdDesc')
    },
    {
      icon: "👶",
      name: t('items.children'),
      description: t('items.childrenDesc')
    }
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-black">{t('title')}</h2>
        <p className="text-center text-black mb-12 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complaints.map((complaint, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition">
              <div className="text-4xl mb-3">{complaint.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{complaint.name}</h3>
              <p className="text-sm text-gray-600">{complaint.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
          <p className="text-gray-700">
            {t('contact')} <strong>{t('contactBtn')}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
