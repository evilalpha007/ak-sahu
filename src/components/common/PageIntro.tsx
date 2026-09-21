"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Page-load intro. The page itself is the loader — no separate screen:
 *   1. it starts shrunk and below the viewport, then slides up until its top
 *      edge sits ~20% from the top of the screen;
 *   2. it then rotates a full turn while zooming to fill the screen (phones
 *      skip the rotation and only zoom).
 *
 * The initial (shrunk, off-screen) state is a CSS class, so server-rendered
 * HTML never flashes at full size. Rotation/zoom pivot on the middle of the
 * first viewport so the top of the page lands exactly at the top of the screen.
 *
 * The intro only plays when the site is first opened on the home page; on any
 * other route (About, Work, …) the page shows immediately.
 *
 * Scroll setup (Locomotive / ScrollTrigger) waits for `data-intro-done` on
 * <html>, because measuring a scaled, rotated page would give wrong offsets.
 */
const START_SCALE = 0.42;
const RESTING_TOP_VH = 20;

export default function PageIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Decided once, on first render, so client-side navigation later never
  // re-applies the shrunk `page-intro` class (and SSR/hydration agree).
  const [playIntro] = useState(usePathname() === "/");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;

    // A restored scroll position would make the page land part-way down and
    // then jump to the top when smooth-scroll takes over.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const finish = () => {
      gsap.set(el, { clearProps: "transform" });
      el.classList.remove("page-intro");
      document.body.classList.remove("is-revealing");
      window.scrollTo(0, 0);
      root.dataset.introDone = "true";
      window.dispatchEvent(new Event("intro-complete"));
    };

    if (
      !playIntro ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finish();
      return;
    }

    document.body.classList.add("is-revealing");
    const spin = window.matchMedia("(min-width: 768px)").matches ? 360 : 0;

    // With the pivot at 50vh, a scaled page's top edge sits at
    // 50vh * (1 - scale) + y — solve for y so the top lands where we want.
    const yForTop = (topVh: number) => topVh - 50 * (1 - START_SCALE);
    const yStart = `${yForTop(100)}vh`;
    const yResting = `${yForTop(RESTING_TOP_VH)}vh`;

    const tl = gsap.timeline({ delay: 0.3, onComplete: finish });
    tl.fromTo(
      el,
      { y: yStart, scale: START_SCALE, rotate: 0 },
      { y: yResting, duration: 1.3, ease: "power3.out" },
    ).to(el, { y: 0, scale: 1, rotate: spin, duration: 2.2, ease: "power3.inOut" });

    return () => {
      tl.kill();
    };
  }, [playIntro]);

  return (
    <div
      ref={ref}
      className={`page-shell${playIntro ? " page-intro" : ""} flex flex-1 flex-col`}
    >
      {children}
    </div>
  );
}
