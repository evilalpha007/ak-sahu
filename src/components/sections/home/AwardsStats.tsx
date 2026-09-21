import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { init: "Site of the day", title: "Awards", count: 9 },
  { init: "Site of the month", title: "Winners", count: 1 },
  { init: "FWA of the day", title: "Awards", count: 6 },
  {
    init: "Acclaimed",
    title: (
      <>
        Menti<span className="f-span space">o</span>ns
      </>
    ),
    count: 8,
  },
];

export default function AwardsStats() {
  return (
    <>
      {/* Awards stats — same grid, so the 4vw row gap applies */}
      <ScrollReveal className="h-item h-span-3 h-awards">
        <Link
          href="/about"
          aria-label="Light Yagami – Awards & Publications"
          className="m-row"
        >
          {stats.map((stat) => (
            <div key={stat.init} className="m-col">
              <div className="m-wrap">
                <div className="m-inner">
                  <h3 className="m-init">{stat.init}</h3>
                  <h3 className="m-title">{stat.title}</h3>
                </div>
                <div className="m-numb">{stat.count}</div>
              </div>
            </div>
          ))}
        </Link>
      </ScrollReveal>
    </>
  );
}
