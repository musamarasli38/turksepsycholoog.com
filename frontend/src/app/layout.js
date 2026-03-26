import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

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
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
