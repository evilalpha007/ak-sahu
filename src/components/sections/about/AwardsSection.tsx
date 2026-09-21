import Image from "next/image";
import AwardsAccordion from "@/components/sections/about/AwardsAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { awardGroups } from "@/data/awards";

export default function AwardsSection() {
  return (
    <ScrollReveal className="ab-cols">
      <div className="ab-left">
        <div data-clip className="ab-photo">
          <Image
            src="/images/trophy.jpeg"
            alt="A strong project arises from a deep collaboration. I design, develops & delivers website that drive results and win awards."
            fill
            sizes="35vw"
            className="object-cover"
          />
        </div>

        <div className="ab-selected">
          <h2 className="ab-selected-head">
            Selected
            <br />
            Awards!
          </h2>
          <i className="ab-line ab-line-1" />
          <i className="ab-line ab-line-2" />
        </div>

        <p className="ab-drop has-dropcap">
          As a multidisciplinary freelance, who’s passionate about creating
          iconic digital exp-eriences through motion, typography and creative
          coding for companies and agencies globally.
        </p>
      </div>
      <div className="ab-right">
        <AwardsAccordion groups={awardGroups} />
      </div>
    </ScrollReveal>
  );
}
