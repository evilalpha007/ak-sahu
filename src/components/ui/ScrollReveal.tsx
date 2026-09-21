"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { onScrollReady } from "@/lib/scroll-context";

/**
 * Scroll-triggered entrance for a block. By default the whole block fades and
 * lifts in. Descendants can opt into richer effects:
 *
 *   data-rise   slides up out of its (overflow-hidden) parent — for big
 *               headlines that sit inside a clipped band.
 *   data-clip   an image frame that wipes open from the bottom while the image
 *               inside eases down from a slight zoom.
 *
 * `stagger` takes a CSS selector: those descendants come in one after another
 * (and the block itself no longer lifts as a whole). `lift={false}` keeps the
 * block still — use it when the interesting motion is on its descendants.
 *
 * Each effect has its own trigger, so items far down a tall block animate when
 * they scroll into view, not when the block starts. Reduced-motion users get
 * the finished layout with no animation.
 */
const EASE = "expo.out";

export default function ScrollReveal({
  children,
  className,
  stagger,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;

    const unsubscribe = onScrollReady((scroller) => {
      ctx = gsap.context(() => {
        const at = (trigger: Element, start = "top 85%") => ({
          trigger,
          scroller,
          start,
        });

        if (stagger) {
          const items = el.querySelectorAll(stagger);
          if (items.length)
            gsap.from(items, {
              opacity: 0,
              y: 60,
              duration: 1.2,
              ease: EASE,
              stagger: 0.12,
              scrollTrigger: at(el),
            });
        } else if (lift) {
          gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1.3,
            ease: EASE,
            scrollTrigger: at(el),
          });
        }

        el.querySelectorAll("[data-rise]").forEach((node, i) => {
          gsap.from(node, {
            yPercent: 110,
            duration: 1.4,
            ease: EASE,
            delay: i * 0.1,
            // Trigger on the clipping parent: the risen element is displaced.
            scrollTrigger: at(node.parentElement ?? el, "top 88%"),
          });
        });

        el.querySelectorAll("[data-clip]").forEach((node) => {
          const tl = gsap.timeline({ scrollTrigger: at(node, "top 88%") });
          tl.fromTo(
            node,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          );
          const img = node.querySelector("img");
          if (img) tl.from(img, { scale: 1.3, duration: 1.8, ease: EASE }, 0);
        });
      }, el);
    });

    return () => {
      unsubscribe();
      ctx?.revert();
    };
  }, [stagger, lift]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
