import ScrollReveal from "@/components/ui/ScrollReveal";
import StampReveal from "@/components/ui/StampReveal";

export default function WebsiteBand() {
  return (
    <>
      {/* Website band + stamp */}
      <ScrollReveal className="h-item h-span-3 h-stamp">
        <div className="relative flow-root">
          <h2 className="head-set2">Website</h2>
          <div className="stamp-w">
            <StampReveal />
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
