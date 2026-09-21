import Footer from "@/components/common/Footer";
import AwardsStats from "@/components/sections/home/AwardsStats";
import HeroWorkStrip from "@/components/sections/home/HeroWorkStrip";
import IntroRow from "@/components/sections/home/IntroRow";
import YagamiBand from "@/components/sections/home/YagamiBand";
import PixelArtisan from "@/components/sections/home/PixelArtisan";
import Testimonials from "@/components/sections/home/Testimonials";
import UpcomingThink from "@/components/sections/home/UpcomingThink";
import WebsiteBand from "@/components/sections/home/WebsiteBand";
import { featuredWork } from "@/data/work";

export default function Homepage() {
  return (
    <>
      <HeroWorkStrip
        before={featuredWork.slice(0, 3)}
        after={featuredWork.slice(3)}
        descriptionLines={[
          "A Featured selection",
          "the latest work –",
          "of the last years.",
        ]}
        tip="Drag sideways to navigate"
      />

      <main className="flex flex-col gap-24 pb-2 md:gap-40">
        <div className="h-grid mt-[-1vw]">
          <YagamiBand />
          <IntroRow />
          <WebsiteBand />
          <UpcomingThink />
          <AwardsStats />
          <PixelArtisan />
          <Testimonials />
        </div>
      </main>

      <Footer />
    </>
  );
}
