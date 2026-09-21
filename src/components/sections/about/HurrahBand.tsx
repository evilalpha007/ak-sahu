import ScrollReveal from "@/components/ui/ScrollReveal";

/** The oversized "HURRAH!" celebration band between experience and clients. */
export default function HurrahBand() {
  return (
    <ScrollReveal className="hr" lift={false}>
      <div className="hr-band">
        <h2 data-rise className="hr-text">
          Hurrah!
        </h2>
      </div>
    </ScrollReveal>
  );
}
