import Footer from "@/components/common/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AllWorkSection from "@/components/sections/about/AllWorkSection";
import AwardsSection from "@/components/sections/about/AwardsSection";
import ClientsSection from "@/components/sections/about/ClientsSection";
import ExperienceSection from "@/components/sections/about/ExperienceSection";
import HurrahBand from "@/components/sections/about/HurrahBand";

export default function AboutPage() {
  return (
    <>
      <main className="ab-main">
        <AboutHero />
        <AwardsSection />
      </main>

      <ExperienceSection />
      <HurrahBand />
      <ClientsSection />
      <AllWorkSection />

      <Footer />
    </>
  );
}
