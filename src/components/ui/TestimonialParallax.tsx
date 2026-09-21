import type { ReactNode } from "react";

/**
 * Static row of the four testimonial cards. Their overlap comes from the CSS
 * offsets on `.aw-block.s-2/.s-3/.s-4` (0, -22vw, -43vw, -65vw — the source's
 * own values); nothing here moves on scroll.
 */
export default function TestimonialParallax({ children }: { children: ReactNode }) {
  return (
    <div className="aw-clip">
      <div className="aw-block-w">{children}</div>
    </div>
  );
}
