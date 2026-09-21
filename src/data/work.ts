export type WorkItem = {
  slug: string;
  title: string;
  titleImage: string;
  thumbnail: string;
  description: string;
  isNew?: boolean;
  /** Placeholder case-study details — no real case-study content was captured
   * in the mirrored source, so these are dummy values pending real copy. */
  year?: string;
  services?: string[];
  /** Large image used on the /work end section. */
  heroImage?: string;
  /** Short category chips shown in the /work panel (placeholder copy). */
  tags?: string[];
};

export const featuredWork: WorkItem[] = [
  {
    slug: "the-books-of-ye",
    tags: ["NFT", "Experience"],
    title: "The Books of Ye",
    titleImage: "/images/work/books-of-ye-title.svg",
    thumbnail: "/images/work/books-of-ye.jpeg",
    description:
      "The Books of Ye is a conceptual NFT web experience depicting the five Books of Moses, in which each instance of God is replaced with Ye (Kanye West).",
    year: "2022",
    services: ["Art Direction", "Interactive Design", "Development"],
  },
  {
    slug: "om-swami",
    tags: ["Editorial", "Spiritual"],
    title: "Om Swami",
    titleImage: "/images/work/om-swami-title.svg",
    thumbnail: "/images/work/om-swami.jpeg",
    description:
      "Om Swami is a spiritual leader, bestselling author and serial entrepreneur who resides in the Himalayan foothills.",
    year: "2022",
    services: ["Brand Design", "Web Design", "Development"],
  },
  {
    slug: "avroko",
    tags: ["Hospitality", "Interiors"],
    title: "AvroKO",
    titleImage: "/images/work/avroko-title.svg",
    thumbnail: "/images/work/avroko.jpeg",
    description:
      "AvroKO is an award-winning global design firm, established itself as a global leader in interior architecture for hospitality, restaurant and bars.",
    isNew: true,
    year: "2023",
    services: ["Art Direction", "Motion Design", "Development"],
  },
  {
    slug: "wow-concept",
    tags: ["Ecommerce", "Fashion"],
    title: "WOW Concept",
    titleImage: "/images/work/wow-concept-title.svg",
    thumbnail: "/images/work/wow-concept.webp",
    description:
      "WOW Concept is a the world’s first concept store based in Madrid revolutionizing retail with a dynamic & interactive shopping experience.",
    isNew: true,
    year: "2023",
    services: ["Interactive Design", "Development"],
  },
  {
    slug: "the-roger-hub",
    tags: ["Ecommerce", "Sports"],
    title: "The Roger Hub",
    titleImage: "/images/work/roger-hub-title.svg",
    thumbnail: "/images/work/roger-hub.webp",
    description:
      "The Roger Hub is an immersive web experience showcasing the tennis-inspired 'On' sneakers, a collaboration born out of a partnership with the legendary Roger Federer.",
    isNew: true,
    year: "2023",
    services: ["Art Direction", "Interactive Design", "Development"],
  },
  {
    slug: "prada",
    tags: ["Ecommerce", "Fashion"],
    title: "Prada",
    titleImage: "/images/work/prada-title.svg",
    thumbnail: "/images/work/prada.jpeg",
    description:
      "Prada Employees online store is an eCommerce outlet gathering previous Prada's collection seasons on a minimalist-based design.",
    year: "2021",
    services: ["Web Design", "eCommerce", "Development"],
  },
];

export const upcomingWork: WorkItem[] = [
  {
    slug: "unexpected-time",
    tags: ["Game", "Experience"],
    title: "Unexpected Time",
    titleImage: "/images/work/unexpected-time-title.svg",
    thumbnail: "/images/work/unexpected-time.webp",
    heroImage: "/images/work/unexpected-time-big.webp",
    description:
      "Unexpected Time is a classic-furitistic gamification web experience showcasing the lost history & culture in a world dominated by the virtual reality.",
    isNew: true,
    year: "2023",
    services: ["Art Direction", "Interactive Design", "Development"],
  },
];

/** Every case-study, deduplicated by slug — used by the /work listing page. */
export const allWork: WorkItem[] = [...featuredWork, ...upcomingWork];

export function getWorkBySlug(slug: string) {
  return allWork.find((item) => item.slug === slug);
}

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  roleLink?: { label: string; href: string };
  photo?: string;
  /** Wrap every "o" of the name in the alternate display face (source: .f-span). */
  fancy?: "space" | "plain";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "“Blurring the line between design & dev, Light has an umatched eye for detail and precise execution in his work which pushes the whole industry forward”",
    name: "Sam Day",
    role: "Creative Director & Designer",
    photo: "/images/sam-day.jpg",
  },
  {
    quote:
      "\"Light’s eye for detail & design as well as his impeccable aesthetics, make him one of the leaders in today’s digital design scene\"",
    name: "Sofia Papadopoulou",
    fancy: "space",
    role: "Designer & Art Director",
    photo: "/images/sofia-papadopoulou.jpg",
  },
  {
    quote:
      "\"High-skilled designer who creates novel experiences with ease and craft. His signature is more vivid on each new project he launches and this is only the start\"",
    name: "Bruno Arizio",
    fancy: "space",
    role: "Creative Director at",
    roleLink: { label: "Studio BA", href: "https://brunoarizio.com/" },
    photo: "/images/bruno-arizio.jpg",
  },
  {
    quote:
      "\"A very promising Creative Director and Interactive Designer given his natural aesthetic taste and innate instinct for functionality\"",
    name: "Enea Rossi",
    fancy: "plain",
    role: "Co-Founder at",
    roleLink: { label: "Adoratorio", href: "https://adoratorio.studio/" },
    photo: "/images/enea-rossi.jpg",
  },
];

/** Placeholder awards/publications list for the /about page — real list not captured. */
export const awards = [
  { year: "2023", title: "FWA Site of the Day", project: "The Roger Hub" },
  { year: "2023", title: "Awwwards Site of the Day", project: "WOW Concept" },
  { year: "2022", title: "CSS Design Awards Winner", project: "The Books of Ye" },
  { year: "2022", title: "Awwwards Honorable Mention", project: "Om Swami" },
  { year: "2021", title: "FWA Site of the Month", project: "AvroKO" },
  { year: "2021", title: "Communication Arts Feature", project: "Prada" },
];

export const publications = [
  "The FWA",
  "Awwwards",
  "Communication Arts",
  "Site Inspire",
  "Behance",
  "Codrops",
];

/**
 * One column ("spine") of the /work page. Entries with a `slug` link to a case
 * study; the rest are placeholders (the source lists more projects than we have
 * case-study content for), shown with a text title instead of a wordmark.
 */
export type Spine = {
  slug?: string;
  tags?: string[];
  description?: string;
  thumbnail?: string;
  title: string;
  titleImage?: string;
  year: string;
  isNew?: boolean;
};

const spineOf = (slug: string): Spine => {
  const w = getWorkBySlug(slug)!;
  return {
    slug,
    title: w.title,
    titleImage: w.titleImage,
    year: w.year ?? "",
    isNew: w.isNew,
    tags: w.tags,
    description: w.description,
    thumbnail: w.thumbnail,
  };
};

export const spines: Spine[] = [
  spineOf("wow-concept"),
  spineOf("the-roger-hub"),
  spineOf("avroko"),
  { title: "Cobo©", year: "2022" },
  { title: "Thinkers", year: "2022" },
  { title: "Argor–Harreus", year: "2022" },
  spineOf("the-books-of-ye"),
  spineOf("om-swami"),
  spineOf("prada"),
  { title: "Chiara Luzzana", year: "2020" },
  { title: "Loftgarten", year: "2020" },
  { title: "Déplacé Maison", year: "2019" },
];
