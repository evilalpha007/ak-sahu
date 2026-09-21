import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import WorkCard from "@/components/ui/WorkCard";
import { upcomingWork } from "@/data/work";

export default function UpcomingThink() {
  return (
    <>
      {/* Upcoming Next | card | Think, Create, Deliver */}
      <ScrollReveal className="h-item h-span-3 h-demo">
        <div className="h-col-left">
          <div className="h-info-w">
            <div className="h-headline">
              <h2 className="head-title">
                Up<span className="dom">co</span>min
                <span className="dom">g</span> Next
              </h2>
              <p className="head-desc-left">
                Fresh entry – A selected
                <br />
                work from the latest
                <br />
                digital releases.
              </p>
              <div className="head-caption">
                <span className="cap-title">Tip!</span>
                <span className="cap-desc">Click on the image to explore</span>
              </div>
            </div>
            <div className="h-info-col">
              <WorkCard
                item={upcomingWork[0]}
                className="w-[28vw] max-md:w-full md:mr-[3vw]"
                aspect="aspect-[28/11]"
              />
            </div>
          </div>
          <Image
            src="/images/avatar-3.jpeg"
            alt="Like an artisan, I like to start from raw matter and give life to an iconic product that makes your brand stand out, starting from a Visual Strategy that guide the client’s vision to reality."
            width={1468}
            height={1013}
            sizes="(max-width: 767px) 92vw, 60vw"
            className="h-auto w-full"
          />
        </div>

        <div className="h-col-right max-md:mt-[8vw]">
          <div className="relative">
            <h2 className="h-head h-head-s">
              Think, <span className="f-span">C</span>reate
            </h2>
            <h2 className="h-head h-head-sub2">Deliver</h2>
            <div className="rules rules-set3">
              <i className="rule rule-gap-12" />
              <i className="rule" />
            </div>
          </div>
          <div className="mt-[3vw]">
            <h5 className="has-dropcap">
              A strong project is created by deep collaboration. I design,
              develop, and deliver websites that drive results and win awards.
            </h5>
            <h3 className="text-lead">
              Like an artisan, I like to start from raw matter and give life to
              an iconic product that makes your brand stand out, starting from a
              Visual Strategy that guide the client’s vision to reality.
            </h3>
          </div>
          <Link
            href="/work"
            aria-label="Light Yagami – Work"
            className="cta-home"
          >
            <span className="cta-layer cta-layer-text">
              <span className="cta-text">
                All W<span className="f-span space">o</span>rk
              </span>
            </span>
            <span className="cta-layer cta-layer-arrow" aria-hidden="true">
              <Image
                src="/images/arrow-long.svg"
                alt=""
                width={123}
                height={38}
                draggable={false}
                className="cta-arrow"
              />
            </span>
          </Link>
        </div>
      </ScrollReveal>
    </>
  );
}
