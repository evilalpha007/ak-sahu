/**
 * Work-experience cards shown on /about. The first card is the call to action
 * (it carries `body` + a mail link instead of skill tags).
 */
export type ExperienceCard = {
  id: string;
  title: string[];
  period: string;
  /** Short paragraph; the word "here" is rendered as the contact link. */
  body?: string;
  tags?: string[];
};

export const experienceCards: ExperienceCard[] = [
  {
    id: "available",
    title: ["Looking for", "new opportunties!"],
    period: "Available from December 2021",
    body: "Whether you're looking for an expert for a cool digital project – or have a full-time job opportunity, you can easily reach me by clicking",
  },
  {
    id: "freelance",
    title: ["Independent /", "Freelance"],
    period: "from 2017–2021",
    tags: [
      "UI/UX Design",
      "Front-end",
      "Branding",
      "Interaction",
      "Illustration",
      "3D Design",
    ],
  },
  {
    id: "awwwards",
    title: ["Awwwards", "Panel"],
    period: "from 2018–2021",
    tags: ["Judge", "Teacher"],
  },
];
