/**
 * Awards shown on /about. The AWWWARDS entries are the source's own; the other
 * groups were collapsed in the reference and their contents weren't captured,
 * so those (and every thumbnail) are placeholders built from local images.
 */
export type AwardItem = {
  year: string;
  name: string;
  detail: string;
  image: string;
};

export type AwardGroup = {
  id: string;
  title: string;
  items: AwardItem[];
};

export const awardGroups: AwardGroup[] = [
  {
    id: "awwwards",
    title: "Awwwards",
    items: [
      {
        year: "2020",
        name: "Chiara Luzzana",
        detail: "Site of the Day, Dev Award, Mobile Excellence",
        image: "/images/avatar-3.jpeg",
      },
      {
        year: "2020",
        name: "Loftgarten",
        detail: "Site of the Day, Dev Awards, Mobile Excellence",
        image: "/images/avatar-hat.jpeg",
      },
      {
        year: "2019",
        name: "Déplacé Maison",
        detail: "SOTM Nominee, SOTD, Dev Award, Mobile Excellence",
        image: "/images/avatar-2.jpeg",
      },
      {
        year: "2020",
        name: "Edoardo Smerilli",
        detail: "Site of the Day, Dev Award, Mobile of the Week",
        image: "/images/avatar-star.jpeg",
      },
      {
        year: "2021",
        name: "Sal Parasuco",
        detail: "Site of the Day, Dev Award, Mobile Excellence",
        image: "/images/avatar-1.jpeg",
      },
    ],
  },
  {
    id: "fwa",
    title: "The FWA",
    items: [
      {
        year: "2023",
        name: "WOW Concept",
        detail: "FWA of the Day",
        image: "/images/work/wow-concept.webp",
      },
      {
        year: "2023",
        name: "The Roger Hub",
        detail: "FWA of the Day, Mobile Excellence",
        image: "/images/work/roger-hub.webp",
      },
      {
        year: "2021",
        name: "Prada",
        detail: "FWA of the Day",
        image: "/images/work/prada.jpeg",
      },
    ],
  },
  {
    id: "cannes",
    title: "Cannes Lions",
    items: [
      {
        year: "2022",
        name: "The Books of Ye",
        detail: "Shortlist, Digital Craft",
        image: "/images/work/books-of-ye.jpeg",
      },
      {
        year: "2021",
        name: "AvroKO",
        detail: "Shortlist, Digital Craft",
        image: "/images/work/avroko.jpeg",
      },
    ],
  },
  {
    id: "dda",
    title: "DDA",
    items: [
      {
        year: "2022",
        name: "Om Swami",
        detail: "Winner, Digital Design",
        image: "/images/work/om-swami.jpeg",
      },
      {
        year: "2023",
        name: "Unexpected Time",
        detail: "Nominee, Interactive",
        image: "/images/work/unexpected-time.webp",
      },
    ],
  },
];
