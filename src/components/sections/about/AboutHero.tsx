import ScrollReveal from "@/components/ui/ScrollReveal";

/** The three "XXX" of INDIA's coat of arms, drawn to sit inline with the statement. */
function Crosses() {
  const x =
    "M15 4 L50 39 L85 4 L100 19 L65 50 L100 81 L85 96 L50 61 L15 96 L0 81 L35 50 L0 19 Z";
  return (
    <svg className="ab-cross" viewBox="0 0 352 100" aria-hidden="true">
      <path d={x} fill="currentColor" />
      <path d={x} fill="currentColor" transform="translate(126 0)" />
      <path d={x} fill="currentColor" transform="translate(252 0)" />
    </svg>
  );
}

export default function AboutHero() {
  return (
    <>
      <ScrollReveal lift={false}>
        <h1 className="ab-head">
          <span data-rise className="inline-block">
            About Me
          </span>
        </h1>
      </ScrollReveal>

      <ScrollReveal className="ab-statement-wrap">
        <p className="ab-statement">
          <Crosses />
          INDIA-based independent Designer &amp; Developer with focus on Art
          direction, Motion and Branding.
        </p>
      </ScrollReveal>
    </>
  );
}
