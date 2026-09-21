import HeroWorkStrip from "@/components/sections/home/HeroWorkStrip";
import { featuredWork } from "@/data/work";

/** The draggable "All Work!" strip, reused from the homepage but showing only two projects. */
export default function AllWorkSection() {
  return (
    <HeroWorkStrip
      before={featuredWork.slice(0, 1)}
      after={featuredWork.slice(1, 2)}
      descriptionLines={[
        "A Featured selection",
        "the latest work –",
        "of the last years.",
      ]}
      tip="Drag sideways to navigate"
    />
  );
}
