/**
 * Social links shown in the menu and footer. "Contact" is not a link: it opens
 * the contact modal (see ContactButton).
 * NOTE: the github / linkedin URLs are placeholders — replace with the real profiles.
 */
export type SocialLink = { href: string; label: string };

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/lightyagami", label: "github" },
  { href: "https://www.linkedin.com/in/lightyagami", label: "linkedin" },
  { href: "https://instagram.com/niccolomiranda", label: "instagram" },
];
