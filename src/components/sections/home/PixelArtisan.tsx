import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PixelArtisan() {
  return (
    <>
      {/* The pixel perfect artisan */}
      <ScrollReveal className="h-item h-span-3">
        <div className="aw-row">
          <div className="aw-col aw-col-l">
            <div className="aw-inn">
              <div className="aw-frame aw-frame-hat">
                <Image
                  src="/images/avatar-hat.jpeg"
                  alt="Light Yagami is an award-winning designer &amp; developer who's passionate about creating iconic digital experiences through motion, typography and creative coding for worldwide brands."
                  fill
                  sizes="14vw"
                  className="object-cover"
                />
              </div>
              <h2 className="m-head m-head-s1">The</h2>
            </div>
            <div className="aw-inn aw-inn-sp">
              <h2 className="m-head m-head-sub">pixel</h2>
            </div>
          </div>
          <div className="aw-col aw-col-r">
            <div className="aw-frame aw-frame-star">
              <Image
                src="/images/avatar-2.jpeg"
                alt="Light Yagami is an award-winning designer &amp; developer who's passionate about creating iconic digital experiences through motion, typography and creative coding for worldwide brands."
                fill
                sizes="(max-width: 479px) 92vw, 47vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="aw-row aw-row-sp">
          <div className="aw-frame aw-frame-award">
            <Image
              src="/images/trophy.jpeg"
              alt="A strong project arises from a deep collaboration. I design, develops &amp; delivers website that drive results and win awards."
              fill
              sizes="27vw"
              className="object-cover"
            />
          </div>
          <h2 className="m-head">
            perfe<span className="f-span">c</span>t
          </h2>
        </div>

        <div className="aw-row aw-row-sp aw-row-text">
          <div className="aw-block-sub">
            <h2 className="m-head m-head-shape">artisan</h2>
          </div>
          <div className="pa-desc pa-desc-desktop">
            <p className="txt">
              Over the past 5+ years, I&apos;ve teamed up with high-profile
              clients and partners globally earning{" "}
              <Link href="/about" className="under">
                mentions &amp; awards
              </Link>{" "}
              from digital platforms like The FWA,
            </p>
            <a
              href="https://www.awwwards.com/niccolo.miranda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="awwwards"
              className="block"
            >
              <h2 className="h-head">Awwwards</h2>
            </a>
            <p className="txt">
              Communication Arts, Site Inspire, Behance, Codrops and many
              others.
            </p>
          </div>
          <div className="pa-desc pa-desc-mobile">
            <p className="txt">
              Over the past 3+ years, I teamed up with high-profile clients and
              partners globally earning{" "}
              <Link href="/about" className="under">
                mentions &amp; awards
              </Link>{" "}
              from digital platforms like The FWA, Awwwards, Communication Arts,
              Site Inspire, Behance, Codrops and many others.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
