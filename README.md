# Premium Developer Portfolio

A cinematic, minimal, performance-focused developer portfolio for **Apurv Saktepar** built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis smooth scrolling
- Lucide React icons

## Features

- Floating glass navbar with dark/light toggle
- Cinematic hero with animated gradient typography
- Scroll reveal and hover animations
- Tilt-interactive project cards
- Skills, testimonials, and contact sections
- Multi-page routing (`/`, `/about`, `/work`, `/blog`, `/resume`, `/contact`)
- SEO metadata with Open Graph and Twitter cards
- Accessible semantic HTML and focus states

## Project Structure

```text
portfolio/
├ app/
│  ├ layout.tsx
│  ├ page.tsx
│  ├ about/page.tsx
│  ├ work/page.tsx
│  ├ blog/page.tsx
│  ├ resume/page.tsx
│  └ contact/page.tsx
├ components/
│  ├ Header.tsx
│  ├ Hero.tsx
│  ├ AboutSection.tsx
│  ├ Skills.tsx
│  ├ ProjectCard.tsx
│  ├ ProjectGrid.tsx
│  ├ Testimonials.tsx
│  ├ ContactForm.tsx
│  ├ Footer.tsx
│  └ SmoothScroll.tsx
├ data/
│  ├ projects.ts
│  └ skills.ts
├ lib/
│  └ utils.ts
├ public/
│  └ images/
├ styles/
│  └ globals.css
├ next.config.js
├ postcss.config.js
├ tailwind.config.ts
├ tsconfig.json
└ package.json
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Start production server:

```bash
npm run start
```

## Deploy To Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Keep default build settings (Next.js detected automatically).
4. Deploy.

## Personalization

Update these files to customize:

- `data/projects.ts` for real project links and screenshots
- `components/ContactForm.tsx` for real social/email links
- `app/layout.tsx` metadata for final domain and social preview details

## Admin Blog Setup

- Generate the local admin password hash with `npm run admin:set-password`.
- The generated `config/admin-credentials.json` file is required locally and must never be committed.
- Blog content is file-based under `content/blogs/*.md`.

## Performance Notes

- Optimized image rendering via Next.js Image component
- Route-level code splitting via App Router
- Lightweight motion and smooth scrolling tuned for subtle UX

## License

Personal portfolio template for Apurv Saktepar.
