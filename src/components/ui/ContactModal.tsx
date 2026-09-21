"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "@/lib/gsap";
import { CONTACT_EMAIL, OPEN_CONTACT_EVENT } from "@/lib/contact";

/**
 * "Contact us" popup. Mounted once (AppShell); anything can open it through
 * openContact(). There is no backend, so submitting composes an email to
 * CONTACT_EMAIL in the visitor's mail app.
 */
export default function ContactModal() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONTACT_EVENT, show);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, show);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!mounted || !overlay || !panel) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduce ? 0 : 1;
    if (open) {
      gsap.to(overlay, { opacity: 1, duration: 0.4 * d, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { y: 60 * d, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 * d, ease: "power3.out", delay: 0.1 * d },
      );
      nameRef.current?.focus({ preventScroll: true });
    } else {
      gsap.to(panel, { y: 40 * d, opacity: 0, duration: 0.4 * d, ease: "power2.in" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4 * d,
        delay: 0.1 * d,
        ease: "power2.in",
        onComplete: () => {
          setMounted(false);
          returnFocus.current?.focus?.({ preventScroll: true });
        },
      });
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the page's smooth-scroll from moving underneath the modal.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!mounted || !overlay) return;
    const stop = (e: Event) => e.stopPropagation();
    overlay.addEventListener("wheel", stop, { passive: true });
    overlay.addEventListener("touchmove", stop, { passive: true });
    return () => {
      overlay.removeEventListener("wheel", stop);
      overlay.removeEventListener("touchmove", stop);
    };
  }, [mounted]);

  if (!mounted) return null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Message from ${name}`);
    const phone = String(data.get("phone") ?? "").trim();
    const contact = [name, email, phone].filter(Boolean).join(" · ");
    const body = encodeURIComponent(`${message}\n\n— ${contact}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  return (
    <div
      ref={overlayRef}
      className="cm"
      style={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        ref={panelRef}
        className="cm-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cm-title"
        style={{ opacity: 0 }}
      >
        <button
          type="button"
          className="cm-close"
          aria-label="Close contact form"
          onClick={() => setOpen(false)}
        >
          <span />
          <span />
        </button>

        <div className="cm-frame">
          <h2 id="cm-title" className="cm-title">
            Contact
            us!
          </h2>
          <p className="cm-lead">
            Have a project in mind or just want to say hi? Drop a line and
            I&apos;ll get back to you.
          </p>

          <form className="cm-form" onSubmit={onSubmit}>
            <label className="cm-field">
              <span>Name</span>
              <input ref={nameRef} name="name" type="text" required autoComplete="name" />
            </label>
            <label className="cm-field">
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="cm-field">
              <span>Phone no.</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
            </label>
            <label className="cm-field">
              <span>Message</span>
              <textarea name="message" rows={4} required />
            </label>
            <button type="submit" className="cm-send">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
