import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-black">

      <section className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welkom op de ankerpunt van uw psychologische welzijn bij Klinische Psychologe [Name]</h1>
        <p className="text-lg">
          Psychologische begeleiding en ondersteuning voor uw gezondheid en welzijn.
        </p>
      </section>

      <HeroSection />


      <Footer />
    </main>
  );
}
