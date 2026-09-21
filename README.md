# Portfolio

A paper-textured portfolio site built with Next.js (App Router), React, Tailwind CSS v4 and GSAP.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: draggable work strip, intro rows, testimonials |
| `/work` | Sideways-scrolling list of projects (click one to open its panel) |
| `/about` | About, awards, work experience, clients, "All Work!" strip |
| `/legal` | Legal placeholder |
| `/work/[slug]` | Case-study page (not linked from the site for now) |

## Where things live

- `src/app/globals.css` – design tokens (colours, fonts, type scale) and all section styles
- `src/components/sections/<page>/` – page sections; `src/components/ui/` – shared pieces (scroll reveal, menu curtain, contact modal)
- `src/data/` – content: projects, awards, experience, clients, social links
- `src/lib/contact.ts` – contact email and the modal's open event

Contact form submissions open the visitor's mail app (there is no backend).
The github / linkedin URLs in `src/data/social.ts` are placeholders.
