"use client";

import Image from "next/image";
import { useState } from "react";
import type { AwardGroup } from "@/data/awards";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

/** One group open at a time; the first starts open, like the source. */
export default function AwardsAccordion({ groups }: { groups: AwardGroup[] }) {
  const [open, setOpen] = useState<string | null>(groups[0]?.id ?? null);

  return (
    <div className="acc">
      {groups.map((group, index) => {
        const isOpen = open === group.id;
        return (
          <section
            key={group.id}
            className={`acc-item${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className={`acc-head${index === 0 ? " acc-head-first" : ""}`}
              aria-expanded={isOpen}
              aria-controls={`acc-${group.id}`}
              onClick={() => setOpen(isOpen ? null : group.id)}
            >
              <h2 className="acc-title">{group.title}</h2>
              <span className="acc-trigger">
                <Chevron />
              </span>
            </button>

            <div
              id={`acc-${group.id}`}
              className="acc-body"
              aria-hidden={!isOpen}
            >
              <div className="acc-body-inner">
                <ul className="acc-grid">
                  {group.items.map((item) => (
                    <li key={item.name} className="acc-card">
                      <span className="acc-thumb">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="10vw"
                          className="object-cover"
                        />
                      </span>
                      <span className="acc-text">
                        <span className="acc-year">{item.year}</span>
                        <h3 className="acc-name">{item.name}</h3>
                        <span className="acc-detail">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
