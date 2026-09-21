"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, Draggable } from "@/lib/gsap";
import WorkCard from "@/components/ui/WorkCard";
import type { WorkItem } from "@/data/work";

/**
 * Draggable strip: [cards] | "ALL WORK!" headline | [cards]. On mount it is
 * offset so the headline sits centered, with the neighbouring cards visible on
 * either side — dragging reveals the rest.
 */
export default function HeroWorkStrip({
  before,
  after,
  descriptionLines,
  tip,
}: {
  before: WorkItem[];
  after: WorkItem[];
  descriptionLines: string[];
  tip: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const center = centerRef.current;
    if (!wrap || !track || !center) return;

    const bounds = () => ({
      minX: Math.min(0, wrap.clientWidth - track.scrollWidth),
      maxX: 0,
    });
    const centeredX = () =>
      wrap.clientWidth / 2 - (center.offsetLeft + center.offsetWidth / 2);

    gsap.set(track, { x: centeredX() });
    const [draggable] = Draggable.create(track, {
      type: "x",
      inertia: true,
      bounds: bounds(),
      edgeResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
    });

    const onResize = () => {
      draggable.applyBounds(bounds());
      gsap.set(track, { x: centeredX() });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      draggable.kill();
    };
  }, []);

  const cardClass = "w-[78vw] shrink-0 sm:w-[28vw]";

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden py-[6vw] sm:py-[3vw]"
      data-testid="hero-work-strip"
    >
      <div ref={trackRef} className="flex w-max gap-[6vw] px-[6vw] sm:gap-[4.5vw] sm:px-[4vw]">
        {before.map((item) => (
          <WorkCard
            key={item.slug}
            item={item}
            className={cardClass}
            aspect="aspect-[4/3] sm:aspect-[28/11]"
          />
        ))}

        <div
          ref={centerRef}
          className="hws-center flex w-[78vw] shrink-0 select-none flex-col justify-center gap-[1.6vw] border-x border-ink/60 px-[2vw] text-center sm:w-[29vw]"
        >
          <h2 className="text-head-title">All Work!</h2>
          <p className="text-head-desc">
            {descriptionLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <p className="mt-auto">
            <span className="font-display uppercase">Tip!</span> {tip}
          </p>
        </div>

        {after.map((item) => (
          <WorkCard
            key={item.slug}
            item={item}
            className={cardClass}
            aspect="aspect-[4/3] sm:aspect-[28/11]"
          />
        ))}
      </div>
    </div>
  );
}
