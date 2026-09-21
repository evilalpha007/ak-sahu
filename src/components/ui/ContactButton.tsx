"use client";

import type { ReactNode } from "react";
import { openContact } from "@/lib/contact";

/** A button that opens the contact modal; usable from server components. */
export default function ContactButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openContact();
      }}
    >
      {children}
    </button>
  );
}
