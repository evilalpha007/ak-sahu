/** Where the contact form's message is sent. */
export const CONTACT_EMAIL = "info@niccolomiranda.com";

/** The plain "Email Me" link used by the footer, work page and About page. */
export const PROJECT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Project%20Request`;

export const OPEN_CONTACT_EVENT = "open-contact";

/** Opens the global contact modal (mounted once in AppShell). */
export function openContact() {
  window.dispatchEvent(new Event(OPEN_CONTACT_EVENT));
}
