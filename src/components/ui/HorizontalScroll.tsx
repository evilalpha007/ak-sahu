"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from "react";

/**
 * A full-height row that scrolls sideways. The mouse wheel (and trackpad
 * vertical swipe) drives an eased horizontal translate on a GPU-composited
 * track — the same technique the homepage's smooth scroll uses — so movement
 * stays fluid even under the full-screen paper grain. Touch swipes follow the
 * finger; phones (< 768px) fall back to a normal vertical page.
 */
const SMOOTHING = 6.5; // higher = snappier; time-based so it is frame-rate independent
const WHEEL_SPEED = 1.25;

export type HorizontalScrollHandle = {
  /** Ease the row so that `x` (px from the start of the track) sits at the left edge. */
  scrollTo: (x: number) => void;
  /** Pull the position back inside the content after it got shorter. */
  reclamp: () => void;
};

const HorizontalScroll = forwardRef<
  HorizontalScrollHandle,
  { children: ReactNode }
>(function HorizontalScroll({ children }, ref) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const api = useRef<HorizontalScrollHandle>({ scrollTo() {}, reclamp() {} });
  useImperativeHandle(ref, () => ({
    scrollTo: (x) => api.current.scrollTo(x),
    reclamp: () => api.current.reclamp(),
  }));

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const wide = window.matchMedia("(min-width: 768px)");
    let current = 0;
    let target = 0;
    let raf = 0;
    let last = 0;

    // The rail padding is part of clientWidth but the track cannot use it.
    const room = () =>
      wrap.clientWidth - parseFloat(getComputedStyle(wrap).paddingLeft);
    const max = () => Math.max(0, track.offsetWidth - room());
    const clamp = (v: number) => Math.min(max(), Math.max(0, v));
    const write = () => {
      track.style.transform = wide.matches
        ? `translate3d(${-current}px,0,0)`
        : "";
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.3) {
        current = target;
        write();
        raf = 0;
        return;
      }
      current += diff * (1 - Math.exp(-dt * SMOOTHING));
      write();
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (!wide.matches || e.ctrlKey) return;
      if (document.querySelector('nav button[aria-expanded="true"]')) return;
      e.preventDefault();
      const unit =
        e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta =
        (Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * unit;
      target = clamp(target + delta * WHEEL_SPEED);
      kick();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!wide.matches) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        target = clamp(target + 260);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        target = clamp(target - 260);
      else return;
      e.preventDefault();
      kick();
    };

    // Touch: the track follows the finger, then eases to rest.
    let touchX = 0;
    let touching = false;
    const onTouchStart = (e: TouchEvent) => {
      if (!wide.matches) return;
      touching = true;
      touchX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touching) return;
      const x = e.touches[0].clientX;
      target = clamp(target - (x - touchX));
      touchX = x;
      kick();
    };
    const onTouchEnd = () => {
      touching = false;
    };

    api.current = {
      scrollTo: (x) => {
        if (!wide.matches) return;
        target = clamp(x);
        kick();
      },
      reclamp: () => {
        target = clamp(target);
        kick();
      },
    };

    const onResize = () => {
      target = clamp(target);
      current = clamp(current);
      write();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    wrap.addEventListener("touchstart", onTouchStart, { passive: true });
    wrap.addEventListener("touchmove", onTouchMove, { passive: true });
    wrap.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);
    wide.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      wrap.removeEventListener("touchstart", onTouchStart);
      wrap.removeEventListener("touchmove", onTouchMove);
      wrap.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="work-scroller" data-testid="work-scroller">
      <div ref={trackRef} className="work-track" data-testid="work-track">
        {children}
      </div>
    </div>
  );
});

export default HorizontalScroll;
