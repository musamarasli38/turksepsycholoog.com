import { Inter } from "next/font/google";
import "./globals.css";
// Root layout is kept minimal; locale-aware layout lives under [locale]/layout

const inter = Inter({
  
  subsets: ["latin"],
});



export const metadata = {
  title: "Turksepsycholoog.com - Semra Nur Tasdemir",
  description: "Klinisch psycholoog. Therapie voor individuen, families en koppels.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
