import Image from "next/image";
import type { Testimonial } from "@/data/work";

function FancyName({ name, mode }: { name: string; mode?: "space" | "plain" }) {
  if (!mode) return <>{name}</>;
  const cls = mode === "space" ? "f-span space" : "f-span";
  return (
    <>
      {name.split(/(o)/i).map((part, i) =>
        part.toLowerCase() === "o" ? (
          <span key={i} className={cls}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function TestimonialCard({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) {
  const n = index + 1;
  return (
    <div className={`aw-block s-${n}`}>
      <div className="aw-content">
        <div className={`aw-desc s${n}`}>{item.quote}</div>
        <div className="aw-infos">
          <div className="aw-box">
            {item.photo && (
              <Image
                src={item.photo}
                alt=""
                width={100}
                height={100}
                className="aw-thumb"
              />
            )}
          </div>
          <div className="aw-info">
            <h3 className="aw-name">
              <FancyName name={item.name} mode={item.fancy} />
            </h3>
            <div className="aw-role">
              {item.role}
              {item.roleLink && (
                <>
                  {" "}
                  <a
                    href={item.roleLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className="link"
                  >
                    {item.roleLink.label}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="aw-inner" aria-hidden="true">
        <div className="dash" />
      </div>
    </div>
  );
}
