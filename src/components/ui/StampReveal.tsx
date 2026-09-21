"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { onScrollReady } from "@/lib/scroll-context";

/**
 * Matches the source site's own end-state for the postage stamp: it drops in
 * from translateY(25vw), scale(0.4) and rotate(720deg) to its resting state.
 */
export default function StampReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;

    const unsubscribe = onScrollReady((scroller) => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y: "25vw", scale: 0.4, rotate: 720 },
          {
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              // Trigger on the untransformed wrapper: measuring the shrunk,
              // shifted element itself would fire the reveal too late.
              trigger: el.parentElement ?? el,
              scroller,
              start: "top 80%",
            },
          },
        );
      }, el);
    });

    return () => {
      unsubscribe();
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref}>
      <Image src="/images/stamp.png" alt="" width={288} height={359} className="postage" />
    </div>
  );
}
