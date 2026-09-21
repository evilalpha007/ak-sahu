"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HorizontalScroll, {
  type HorizontalScrollHandle,
} from "@/components/ui/HorizontalScroll";
import type { Spine } from "@/data/work";

/** Width of an opened panel, in vh — keep in sync with `.book-wrap.is-open` in globals.css. */
const PANEL_VH = 75;
/** How much narrower the active spine is than a resting one (18vh - 15.9vh). */
const ACTIVE_SPINE_SHRINK_VH = 2.1;

function SpineBody({ spine }: { spine: Spine }) {
  return (
    <>
      <div className="brand-title">
        {spine.titleImage ? (
          <Image
            src={spine.titleImage}
            alt={`${spine.title} — Light Yagami's work`}
            width={374}
            height={73}
            draggable={false}
            className="brand-title-img"
          />
        ) : (
          <span className="brand-title-text">{spine.title}</span>
        )}
      </div>
      <div className="brand-meta">
        {spine.isNew && <span className="brand-new">New</span>}
        <span className="brand-year">{spine.year}</span>
      </div>
    </>
  );
}

function Panel({ spine, open }: { spine: Spine; open: boolean }) {
  if (!spine.slug) return null;
  return (
    <div className={`book-wrap${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="book-inner">
        {spine.tags && (
          <div className="book-tags">
            {spine.tags.map((tag) => (
              <span key={tag} className="book-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="book-title-w">
          {spine.titleImage && (
            <Image
              src={spine.titleImage}
              alt={spine.title}
              width={374}
              height={73}
              draggable={false}
              className="book-title-img"
            />
          )}
        </div>

        <p className="book-desc">{spine.description}</p>

        {spine.thumbnail && (
          <div className="book-img-w">
            <Image
              src={spine.thumbnail}
              alt={spine.description ?? spine.title}
              width={1200}
              height={800}
              draggable={false}
              className="book-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkBoard({
  intro,
  outro,
  spines,
}: {
  intro: React.ReactNode;
  outro?: React.ReactNode;
  spines: Spine[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const scroller = useRef<HorizontalScrollHandle>(null);
  const items = useRef<Record<string, HTMLLIElement | null>>({});
  const pendingX = useRef<number | null>(null);

  const toggle = (slug: string) => {
    const next = active === slug ? null : slug;
    if (next) {
      const el = items.current[next];
      const track = el?.closest(".work-track");
      if (el && track) {
        // Position of the item inside the track (both move together, so the
        // current translate cancels out).
        let x =
          el.getBoundingClientRect().left - track.getBoundingClientRect().left;
        // If a panel before it is about to collapse, everything after shifts left.
        const from = spines.findIndex((s) => s.slug === active);
        const to = spines.findIndex((s) => s.slug === next);
        if (from >= 0 && from < to)
          x -= ((PANEL_VH - ACTIVE_SPINE_SHRINK_VH) / 100) * window.innerHeight;
        // Applied after render: the extra room after the last project (`has-open`)
        // must exist before the target is clamped to the scrollable width.
        pendingX.current = x;
      }
    }
    setActive(next);
  };

  useEffect(() => {
    if (pendingX.current === null) return;
    scroller.current?.scrollTo(pendingX.current);
    pendingX.current = null;
  }, [active]);

  // After a panel closes the row gets shorter; ease back inside the content.
  useEffect(() => {
    if (active) return;
    const t = window.setTimeout(() => scroller.current?.reclamp(), 650);
    return () => window.clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <HorizontalScroll ref={scroller}>
      {intro}

      <ul className={`brand-list${active ? " has-open" : ""}`}>
        {spines.map((spine) => {
          const open = active === spine.slug;
          return (
            <li
              key={spine.title}
              ref={(el) => {
                if (spine.slug) items.current[spine.slug] = el;
              }}
              className={`brand-item${open ? " is-active" : ""}`}
            >
              {spine.slug ? (
                <button
                  type="button"
                  aria-label={`Light Yagami – ${spine.title}`}
                  aria-expanded={open}
                  className="brand-inner"
                  onClick={() => toggle(spine.slug!)}
                >
                  <SpineBody spine={spine} />
                </button>
              ) : (
                <div className="brand-inner">
                  <SpineBody spine={spine} />
                </div>
              )}
              <Panel spine={spine} open={open} />
            </li>
          );
        })}
      </ul>

      {outro}
    </HorizontalScroll>
  );
}
