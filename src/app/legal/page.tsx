import type { Metadata } from "next";
import Footer from "@/components/common/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Legal — Light Yagami",
};

export default function LegalPage() {
  return (
    <>
      <main className="flex flex-col gap-8 px-6 pt-32 pb-24 md:px-10">
        <ScrollReveal className="flex flex-col gap-8 max-w-prose">
          <h1>Legal</h1>
          <p className="text-muted-on-light">
            Placeholder legal copy — the real privacy policy and terms for this
            site weren&apos;t captured in the source snapshot this project was
            rebuilt from, so this page is a stand-in until the actual text is
            available.
          </p>

          <div className="flex flex-col gap-3">
            <h4>Privacy</h4>
            <p className="text-muted-on-light">
              This placeholder section would describe what data is collected,
              how it&apos;s used, and who it&apos;s shared with.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4>Cookies</h4>
            <p className="text-muted-on-light">
              This placeholder section would describe the cookies used on this
              site and how to manage them.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4>Copyright</h4>
            <p className="text-muted-on-light">
              All work shown on this site remains the property of its respective
              creators and clients.
            </p>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </>
  );
}
