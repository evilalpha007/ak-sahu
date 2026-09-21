import Image from "next/image";
import { upcomingWork } from "@/data/work";
import { PROJECT_MAILTO } from "@/lib/contact";

const upcoming = upcomingWork[0];

export default function WorkOutro() {
  return (
    <section className="work-end">
      <div className="we-a">
        <p className="we-coming">Coming Out – July 2023</p>
        <Image
          src={upcoming.titleImage}
          alt={upcoming.title}
          width={491}
          height={75}
          className="we-title"
        />
        <p className="we-desc has-dropcap-vh">{upcoming.description}</p>
        <div className="we-img">
          <Image
            src={upcoming.heroImage ?? upcoming.thumbnail}
            alt={upcoming.description}
            fill
            sizes="60vh"
            className="object-cover"
          />
        </div>
      </div>

      <span className="we-rule" aria-hidden="true" />

      <div className="we-b">
        <h2 className="we-talk">
          Let’s
          Talk!
        </h2>
        <p className="we-ask">
          Are you looking for an eye-catching design? Let’s create something
          great together.
        </p>
           <p className="we-avail">
          <span className="we-avail-label">Availability</span> – February 2022
        </p>
        <a
          href={PROJECT_MAILTO}
          aria-label="Yagami – Project Request"
          draggable={false}
          className="cta-oval"
        >
          <span className="cta-oval-text">Email Me</span>
        </a>
     
      </div>
    </section>
  );
}
