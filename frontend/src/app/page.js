export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">

      <section className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welkom op de ankerpunt van uw psychologische welzijn bij Klinische Psychologe [Name]</h1>
        <p className="text-lg">
          Psychologische begeleiding en ondersteuning voor uw gezondheid en welzijn.
        </p>
      </section>


      <footer className="bg-gray-100 text-gray-700 p-4 text-center text-sm">
        <p>Privacy Policy | Contact: info@example.com</p>
        <p>Created by Musa Marasli © 2026</p>
        <p>
          Follow us on
          <a href="#" className="underline ml-1">Facebook</a>,
          <a href="#" className="underline ml-1">Instagram</a>
        </p>
      </footer>
    </main>
  );
}
