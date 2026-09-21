import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function IntroRow() {
  return (
    <>
      {/* Interactive Artist! */}
      <ScrollReveal className="h-item h-item-rule flex flex-col">
        <div className="relative">
          <h2 className="h-head h-head-s1">
            Intera<span className="f-span">c</span>tive
          </h2>
          <h2 className="h-head h-head-sub">Artist!</h2>
          <div className="rules">
            <i className="rule rule-first" />
            <i className="rule" />
          </div>
        </div>
        <div className="h-frame h-frame-left mt-[2vw]">
          <Image
            src="/images/avatar-star.jpeg"
            alt="Light Yagami is an award-winning designer &amp; developer who's passionate about creating iconic digital experiences through motion, typography and creative coding for worldwide brands."
            fill
            sizes="(max-width: 767px) 92vw, 30vw"
            className="object-cover"
          />
        </div>
        <div className="mt-[3vw] w-[103%]">
          <h5 className="has-dropcap">
            As a multidisciplinary freelancer, I&apos;m passionate about
            creating iconic digital experiences through motion, typography, and
            creative coding for companies and agencies around the world.
          </h5>
        </div>
      </ScrollReveal>

      {/* Portrait + role stack */}
      <ScrollReveal className="h-item h-span-2">
        <div className="h-frame h-frame-right">
          <Image
            src="/images/avatar-1.jpeg"
            alt="Light Yagami is an award-winning designer &amp; developer who's passionate about creating iconic digital experiences through motion, typography and creative coding for worldwide brands."
            fill
            sizes="(max-width: 767px) 92vw, 62vw"
            className="object-cover"
          />
        </div>
        <div className="relative mt-[2.5vw] max-md:mt-[6vw]">
          <h2 className="h-head h-head-ex">
            di<span className="f-span">g</span>ital art dire
            <span className="f-span">c</span>t<span className="f-span">o</span>r
          </h2>
          <h2 className="h-head h-head-ex">
            Intera<span className="f-span">c</span>tive Desi
            <span className="f-span">g</span>ner
          </h2>
          <h2 className="h-head h-head-ex">
            <span className="f-span">c</span>reative devel
            <span className="f-span">o</span>per
          </h2>
          <h2 className="h-head h-head-ex">
            based in <span className="under">INDIA, NL</span>.
          </h2>
          <div className="rules">
            <i className="rule" />
            <i className="rule" />
            <i className="rule" />
            <i className="rule" />
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
