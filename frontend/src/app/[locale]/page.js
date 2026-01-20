import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import CommonComplaintsSection from "@/components/CommonComplaintsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="mx-40 flex flex-col content-center  bg-black">
      <HeroSection />
      <ExpertiseSection />
      <CommonComplaintsSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
