import Image from "next/image";
import {getTranslations} from 'next-intl/server';

export default async function HeroSection() {
  const t = await getTranslations('hero');
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-black rounded-r-lg shadow-lg px-6 py-16 sm:px-10 lg:px-16 flex justify-around">
      <section className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <p className="text-sm sm:text-md lg:text-xl mb-8  max-w-xl mx-auto">
          {t('note')}
        </p>
      </section>
      <div className="relative h-64 ml-8 bg-linear-to-l from-gray-900 to-black rounded-lg shadow-lg mx-auto lg:mx-0 lg:mt-0 mt-8 lg:w-80 lg:h-80">
        <Image
          src="/profile-picture.jpg"
          alt="Semra Nur Tasdemir"
          fill
          className="object-contain object-center rounded-lg"
        />
      </div>
    </div>
  );
}
