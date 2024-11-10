import FeaturesSection from "@/components/landing-page/FeaturesSection";
import Header from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";

export default function LandingPagePage() {
  return (
    <div>
      <Header />

      <main className="grid gap-40 py-40">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
