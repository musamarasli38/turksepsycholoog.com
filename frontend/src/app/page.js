import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AppointmentCalendar from "@/components/AppointmentCalender";
import Image from "next/image";
export default function Home() {
  return (
    <main className="mx-40 flex flex-col content-center ">
      <HeroSection />


      <AppointmentCalendar />


      <Footer />
    </main>
  );
}
