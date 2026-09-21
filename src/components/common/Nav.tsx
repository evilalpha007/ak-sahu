"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import PaperSweep, {
  preloadPaperTexture,
  type PaperSweepHandle,
} from "@/components/ui/PaperSweep";
import Logo from "@/components/ui/Logo";
import ContactButton from "@/components/ui/ContactButton";
import { socialLinks } from "@/data/social";

const menuLinks = [
  { href: "/", label: <>Index</> },
  {
    href: "/work",
    label: (
      <>
        W<span className="f-span">o</span>rk
      </>
    ),
  },
  {
    href: "/about",
    label: (
      <>
        Ab<span className="f-span">o</span>ut
      </>
    ),
  },
];

/** Pages that scroll sideways get a menu sweep that runs left to right. */
const HORIZONTAL_ROUTES = ["/work", "/about"];

const barPadding = "px-6 py-4 md:px-[2vw] md:py-[1.8vw]";
const logoClass = "h-6 w-auto md:h-auto md:w-[9.5vw]";

export default function Nav() {
  const [open, setOpen] = useState(false); // logical state (drives the animation)
  const [mounted, setMounted] = useState(false); // overlay exists in the DOM
  const [horizontal, setHorizontal] = useState(false); // sweep direction, fixed when the menu opens
  const pathname = usePathname();
  const sweepRef = useRef<PaperSweepHandle>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const progress = useRef({ p: 0 });

  const apply = () => {
    const p = progress.current.p;
    sweepRef.current?.setProgress(p);
    const t = Math.min(1, Math.max(0, (p - 0.35) / 0.4));
    if (contentRef.current)
      contentRef.current.style.opacity = String(t * t * (3 - 2 * t));
  };

  // Menu text: each link slides up out of its mask, then the orange line draws
  // across the current page. Played on open and reversed on close, so exit is
  // the same motion backwards (line retracts, then the text drops away).
  // Decode the paper texture ahead of the first open so the curtain never stalls.
  useEffect(() => {
    preloadPaperTexture();
  }, []);

  useEffect(() => {
    const root = menuRef.current;
    if (!mounted || !root) return;
    const ctx = gsap.context(() => {
      const words = root.querySelectorAll(".menu-word");
      const lines = root.querySelectorAll(".menu-active");
      const meta = root.querySelectorAll(".menu-meta");
      gsap.set(words, { yPercent: 115 });
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(meta, { y: 24, opacity: 0 });
      // The first ~1.1s is the paper sweep uncovering the page; text starts after.
      menuTl.current = gsap
        .timeline({ paused: true })
        .to(words, { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, 1.1)
        .to(lines, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, ">-0.1")
        .to(meta, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "<0.1");
    }, root);
    return () => {
      ctx.revert();
      menuTl.current = null;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    tween.current?.kill();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const to = open ? 1 : 0;
    if (reduce) {
      menuTl.current?.progress(to);
      progress.current.p = to;
      apply();
      if (!open) requestAnimationFrame(() => setMounted(false));
      return;
    }
    if (open) menuTl.current?.timeScale(1).play();
    else menuTl.current?.timeScale(1.2).reverse();
    tween.current = gsap.to(progress.current, {
      p: to,
      duration: open ? 2 : 1.5,
      ease: "sine.inOut",
      onUpdate: apply,
      onComplete: () => {
        if (!open) setMounted(false);
      },
    });
    return () => {
      tween.current?.kill();
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isWork = pathname === "/work";

  return (
    <nav
      className={
        isWork
          ? `fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-ink/60 bg-background ${barPadding} md:right-auto md:bottom-0 md:w-[14vh] md:flex-col-reverse md:border-r md:border-b-0 md:border-ink/50 md:px-0 md:py-[6vh]`
          : `fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-ink/60 bg-background ${barPadding}`
      }
    >
      <span
        className={
          isWork
            ? "hidden text-ink sm:block md:text-[2vh] md:[writing-mode:vertical-rl]"
            : "hidden text-ink sm:block"
        }
      >
        New Delhi, India
      </span>

      <Link
        href="/"
        aria-label="Light Yagami – Home"
        className={
          isWork
            ? "absolute left-1/2 block -translate-x-1/2 text-ink md:top-1/2 md:h-[16.6vh] md:w-[2.6vh] md:-translate-y-1/2"
            : "absolute left-1/2 block -translate-x-1/2 text-ink"
        }
      >
        <Logo
          className={
            isWork
              ? `${logoClass} md:absolute md:top-1/2 md:left-1/2 md:h-auto md:w-[16.6vh] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2 md:rotate-90`
              : logoClass
          }
        />
      </Link>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setHorizontal(
              HORIZONTAL_ROUTES.includes(pathname) &&
                window.matchMedia("(min-width: 768px)").matches,
            );
            setMounted(true);
            setOpen(true);
          }
        }}
        className={
          isWork
            ? "relative z-[70] ml-auto flex h-8 w-10 flex-col items-center justify-center gap-2 md:ml-0 md:w-[3.2vh]"
            : "relative z-[70] ml-auto flex h-8 w-10 flex-col items-center justify-center gap-2 md:w-[2vw]"
        }
      >
        {/* Tailwind v4 emits translate/rotate as their own CSS properties, so the
            transition must list them (not `transform`) to animate. */}
        <span
          className={`block h-[2px] w-full transition-[translate,rotate,background-color] duration-[600ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] ${
            open ? "translate-y-[4.5px] rotate-45 bg-paper" : "bg-ink"
          }`}
          style={{ transitionDelay: open ? "0ms, 0ms, 450ms" : "0ms, 0ms, 900ms" }}
        />
        <span
          className={`block h-px w-full transition-[translate,rotate,background-color] duration-[600ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] ${
            open ? "translate-y-[-5px] -rotate-45 bg-paper" : "bg-ink"
          }`}
          style={{ transitionDelay: open ? "0ms, 0ms, 450ms" : "0ms, 0ms, 900ms" }}
        />
      </button>

      {mounted && (
        <div
          className="fixed inset-0 z-[60] text-paper"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <PaperSweep ref={sweepRef} horizontal={horizontal} />
          <div
            ref={(el) => {
              contentRef.current = el;
              menuRef.current = el;
            }}
            className="relative flex h-full flex-col"
            style={{ opacity: 0 }}
          >
            <div
              className={`relative flex items-center justify-end ${barPadding}`}
            >
              <Link
                href="/"
                aria-label="Light Yagami – Home"
                onClick={() => setOpen(false)}
                className="absolute left-1/2 block -translate-x-1/2"
              >
                <Logo className={logoClass} />
              </Link>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="relative block text-center"
                >
                  <span className="text-menu relative inline-block">
                    <span className="menu-mask">
                      <span className="menu-word">{link.label}</span>
                    </span>
                    {isActive(link.href) && <i className="menu-active" />}
                  </span>
                </Link>
              ))}
            </div>

            <div className="menu-meta text-menu-meta flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-8 md:pb-[2.5vw]">
              {socialLinks.map((social, i) => (
                <span key={social.href} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden>•</span>}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </span>
              ))}
              <span className="flex items-center gap-3">
                <span aria-hidden>•</span>
                <ContactButton onClick={() => setOpen(false)} className="uppercase">
                  contact
                </ContactButton>
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
