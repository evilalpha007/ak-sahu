import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/common/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import WorkCard from "@/components/ui/WorkCard";
import { allWork, getWorkBySlug } from "@/data/work";

export function generateStaticParams() {
  return allWork.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  return {
    title: item ? `${item.title} — Light Yagami` : "Work — Light Yagami",
  };
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  const more = allWork.filter((w) => w.slug !== item.slug).slice(0, 3);

  return (
    <>
      <main className="flex flex-col gap-16 px-6 pt-32 pb-24 md:px-10">
        <ScrollReveal className="flex flex-col gap-6">
          <Link href="/work" className="text-muted-on-light w-fit underline">
            ← All Work
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src={item.titleImage}
              alt={item.title}
              width={220}
              height={36}
              className="h-8 w-auto sm:h-10"
            />
            {item.isNew && <span className="badge-new">New</span>}
          </div>
          <p className="text-muted-on-light max-w-prose">{item.description}</p>
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            {item.year && (
              <div className="flex flex-col gap-1">
                <h6 className="text-muted-on-light">Year</h6>
                <p>{item.year}</p>
              </div>
            )}
            {item.services && (
              <div className="flex flex-col gap-1">
                <h6 className="text-muted-on-light">Services</h6>
                <p>{item.services.join(", ")}</p>
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal className="relative aspect-video w-full overflow-hidden rounded-sm">
          <Image
            src={item.thumbnail}
            alt={item.description}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </ScrollReveal>

        <ScrollReveal className="max-w-prose">
          <p className="text-muted-on-light">
            Placeholder case-study copy — the real write-up for this project
            wasn&apos;t captured in the source snapshot this site was rebuilt
            from, so this paragraph is a stand-in until the actual content is
            available.
          </p>
        </ScrollReveal>

        {more.length > 0 && (
          <ScrollReveal className="flex flex-col gap-10 border-t border-ink/20 pt-10">
            <h2>More Work</h2>
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((w) => (
                <WorkCard key={w.slug} item={w} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </main>

      <Footer />
    </>
  );
}
