import Image from "next/image";
import type { WorkItem } from "@/data/work";

export default function WorkCard({
  item,
  className = "",
  aspect = "aspect-4/3",
}: {
  item: WorkItem;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={`group flex select-none flex-col ${className}`}>
      <div className={`wcard-frame ${aspect}`}>
        <Image
          src={item.thumbnail}
          alt={item.description}
          fill
          draggable={false}
          sizes="(max-width: 767px) 90vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="wcard-block">
        <div className="wcard-tw">
          <Image
            src={item.titleImage}
            alt={`${item.title} — Light Yagami's work`}
            width={140}
            height={22}
            className="h-full w-auto max-w-none"
          />
          {item.isNew && <span className="badge-new">New</span>}
        </div>
        <p className="wcard-desc">{item.description}</p>
      </div>
    </div>
  );
}
