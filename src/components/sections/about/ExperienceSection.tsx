"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { experienceCards } from "@/data/experience";
import { PROJECT_MAILTO } from "@/lib/contact";


/**
 * "Work Experience" — a row of dashed paper cards that scrolls sideways.
 * The row is a native overflow scroller (trackpad / touch / keyboard work as
 * is); on a mouse the cards can also be dragged.
 */
export default function ExperienceSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !rowRef.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: rowRef.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !rowRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      rowRef.current.classList.add("is-dragging");
    }
    rowRef.current.scrollLeft = d.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    rowRef.current?.classList.remove("is-dragging");
  };

  // A drag that ends on the "here" link must not follow it.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <ScrollReveal className="xp" stagger=".xp-head, .xp-card" lift={false}>
      <div className="xp-bar">
        <h2 className="xp-head">Work Experience</h2>
      </div>

      <div
        ref={rowRef}
        className="xp-row"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        tabIndex={0}
        role="region"
        aria-label="Work experience"
      >
        {experienceCards.map((card) => (
          <article key={card.id} className="xp-card">
            <div className="xp-frame">
              <svg className="xp-dash" aria-hidden="true">
                <rect width="100%" height="100%" />
              </svg>
              <h3 className="xp-title">
                {card.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p className="xp-period">{card.period}</p>

              {card.body && (
                <p className="xp-body">
                  {card.body}{" "}
                  <a href={PROJECT_MAILTO} draggable={false} className="xp-link">
                    here
                  </a>
                  .
                </p>
              )}

              {card.tags && (
                <ul className="xp-tags">
                  {card.tags.map((tag, i) => (
                    <li key={tag}>
                      <span className="xp-tag">{tag}</span>
                      {i < card.tags!.length - 1 && (
                        <span className="xp-comma">,</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </ScrollReveal>
  );
}
