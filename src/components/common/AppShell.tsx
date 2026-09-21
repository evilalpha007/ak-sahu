import type { ReactNode } from "react";
import Nav from "@/components/common/Nav";
import PageIntro from "@/components/common/PageIntro";
import ContactModal from "@/components/ui/ContactModal";
import SmoothScroll from "@/components/ui/SmoothScroll";

/**
 * Everything that wraps every page: the load intro, the navigation and the
 * smooth-scroll container.
 *
 * Nav renders outside SmoothScroll deliberately: Locomotive Scroll applies a
 * CSS transform to its container to drive smooth scrolling, and
 * `position: sticky` breaks (its containing block becomes that transformed
 * element instead of the viewport) for anything nested inside it. Fixed
 * positioning here sidesteps that entirely.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <PageIntro>
      <Nav />
      <SmoothScroll>{children}</SmoothScroll>
      <ContactModal />
    </PageIntro>
  );
}
