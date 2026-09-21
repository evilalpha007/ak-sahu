import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/ui/ContactButton";
import { socialLinks } from "@/data/social";
import { PROJECT_MAILTO } from "@/lib/contact";

/** One repeat of the marquee: the line + the "Email Me" button. */
function MarqueeItem() {
  return (
    <div className="ft-marquee-content">
      <h4 className="ft-news">Let&apos;s create something together</h4>
      <a
        href={PROJECT_MAILTO}
        aria-label="Yagami – Project Request"
        draggable={false}
        className="ft-marquee-link"
      >
        <span className="ft-marquee-text">Email Me</span>
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-marquee">
        <div className="ft-marquee-inner">
          {[0, 1, 2, 3].map((i) => (
            <MarqueeItem key={i} />
          ))}
        </div>
      </div>

      <div className="ft-info">
        <div className="ft-col">
          <span className="ft-title">Yagami©</span>
          <Image
            src="/images/stamp.png"
            alt="Light Yagami is an award-winning designer & developer who's passionate about creating iconic digital experiences through motion, typography and creative coding for worldwide brands."
            width={288}
            height={359}
            className="ft-stamp"
          />
          <span className="ft-legal">
            <Link href="/legal" aria-label="yagami-legal" draggable={false} className="ft-link">
              Legal
            </Link>
          </span>
        </div>

        <div className="ft-col">
          <div className="ft-socials">
            {socialLinks.map((social, i) => (
              <span key={social.href} className="ft-social">
                {i > 0 && <span className="ft-dot">·</span>}
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  className="ft-li"
                >
                  {social.label}
                </a>
              </span>
            ))}
            <span className="ft-social">
              <span className="ft-dot">·</span>
              <ContactButton className="ft-li">contact</ContactButton>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
