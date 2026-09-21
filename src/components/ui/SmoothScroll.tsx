"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { markScrollReady, resetScrollReady } from "@/lib/scroll-context";

/** Routes that run their own scroller (the /work page scrolls sideways). */
const NATIVE_SCROLL_ROUTES = ["/work"];

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const own = NATIVE_SCROLL_ROUTES.includes(pathname);

  useEffect(() => {
    const root = document.documentElement;
    let cleanup: (() => void) | undefined;
    let started = false;

    const init = (): (() => void) | undefined => {
      const el = containerRef.current;
      if (!el) return;

      // Touch devices and routes with their own scroller keep native scrolling;
      // scroll-driven effects then scrub against the window.
      if ("ontouchstart" in window || own) {
        markScrollReady(window);
        return;
      }

      let locomotive: import("locomotive-scroll").default | null = null;
      let cancelled = false;

      import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
        if (cancelled) return;
        locomotive = new LocomotiveScroll({ el, smooth: true });
        locomotive.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (!locomotive) return 0;
            if (typeof value === "number") {
              locomotive.scrollTo(value, { duration: 0, disableLerp: true });
            }
            return locomotive.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        const refresh = () => locomotive?.update();
        ScrollTrigger.addEventListener("refresh", refresh);

        markScrollReady(el);
        ScrollTrigger.refresh();
      });

      return () => {
        cancelled = true;
        locomotive?.destroy();
        // destroy() leaves its inline transform/opacity on the container; on
        // the next route that would shove the whole page off-screen.
        el.removeAttribute("style");
      };
    };

    const start = () => {
      if (started) return;
      started = true;
      cleanup = init();
    };

    if (root.dataset.introDone === "true") start();
    else window.addEventListener("intro-complete", start, { once: true });

    return () => {
      window.removeEventListener("intro-complete", start);
      cleanup?.();
      resetScrollReady();
    };
    // Re-run on every route change: the old page's scroll offset must not
    // carry over to the next page.
  }, [pathname, own]);

  return (
    // pt-* compensates for Nav being `fixed` (removed from normal flow); the
    // /work page has a left rail instead of a top bar.
    <div
      ref={containerRef}
      data-scroll-container
      className={own ? "" : "pt-16 md:pt-[calc(3.6vw_+_2rem)]"}
    >
      {children}
    </div>
  );
}
