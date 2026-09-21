import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { clientImages } from "@/data/clients";

/** "Clients & Partners" — a big statement with inline name tags, then a pair of illustrations. */
export default function ClientsSection() {
  return (
    <ScrollReveal className="cl" stagger=".cl-head, .cl-statement" lift={false}>
      <h2 className="cl-head">Clients &amp; Partners</h2>

      <p className="cl-statement">
        Over the past 3+ years, I teamed up with high-profile clients and
        agencies globally such as <span className="cl-tag">Prada</span>{" "}
        <span className="cl-tag">Awwwards</span>
        <span className="cl-comma">,</span> <span className="cl-tag">Akqa</span>{" "}
        and much more.
      </p>

      <ul className="cl-grid">
        {clientImages.map((img) => (
          <li key={img.src} data-clip className="cl-photo">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="48vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}
