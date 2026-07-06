# Portfolio Revamp — Space & Astronaut Theme
### Prompt Pack for AI Coding Agent (Claude Code / Cursor / etc.)

**Stack assumption:** Next.js + Tailwind CSS + Framer Motion (existing stack). Adjust paths if different.

**Theme constraint (applies to every prompt below):** Only **black and white** as core colors in both dark and light mode. No blue/purple space clichés as base colors — depth, mood, and "space" feel must come from **gradients of black↔white/gray**, glassmorphism blur, neumorphic shadows, star-field textures, and subtle glow/opacity tricks — not from added hues. Any accent (e.g. a single glowing dot for a "star" or CTA highlight) should stay grayscale or use extremely low-opacity white/black glow only.

---

## PART 1 — UI/UX Revamp (5 Prompts)

### Prompt 1 — Design System Foundation & Global Theme Engine
```
Act as a senior UI/UX engineer. I'm revamping my existing Next.js + Tailwind portfolio into a
"Space & Astronaut" themed site that fuses Neumorphism + Glassmorphism, using ONLY black and
white as the core palette for both dark and light modes (no blue/purple/accent hues — depth
comes from grayscale gradients, blur, and shadow work).

Do the following:

1. Create a centralized design token system (Tailwind config + CSS variables) with:
   - Dark mode: true black base (#000000 / #0a0a0a), off-white text (#f5f5f5), soft gray
     mid-tones (#1a1a1a, #2b2b2b, #3d3d3d) for neumorphic surfaces.
   - Light mode: true white base (#ffffff / #fafafa), near-black text (#0a0a0a), soft gray
     mid-tones (#e8e8e8, #d4d4d4, #ececec) for neumorphic surfaces.
   - Two shadow sets per mode: neumorphic (dual-tone soft raised/inset shadows using
     lighter+darker gray of the same hue family) and glassmorphic (backdrop-blur + low-opacity
     white/black border + subtle inner glow).
   - Reusable utility classes / Tailwind plugin functions: `.neu-raised`, `.neu-pressed`,
     `.neu-flat`, `.glass-panel`, `.glass-panel-strong`.

2. Build a global "Space Canvas" background system (a single reusable <SpaceBackground />
   component) that renders:
   - A CSS/Canvas starfield (small white dots on dark mode, small black/gray dots on light mode)
     with slow parallax drift on scroll and mouse-move parallax.
   - Occasional "shooting star" animation (grayscale streak, low opacity, randomized interval).
   - A subtle orbiting/floating astronaut silhouette (SVG or simple 3D-style illustration,
     grayscale/duotone only) that gently floats with a Framer Motion loop animation, visible
     behind hero/about sections with reduced opacity elsewhere.
   This component should sit behind all page content (z-index layered) and adapt automatically
   to dark/light mode.

3. Build a theme toggle component (sun/moon → replace with "day-side/night-side of a planet"
   icon or astronaut helmet visor toggle) that switches dark/light with a smooth 300–400ms
   crossfade transition (no jarring flash), persists preference in localStorage, and respects
   `prefers-color-scheme` on first load.

4. Set up typography: a clean modern sans (e.g. Space Grotesk, Sora, or similar geometric
   sans available via next/font) for headings, and a highly readable sans for body text.
   Define a type scale (h1–h6, body, caption) as Tailwind theme extensions.

5. Refactor the existing layout wrapper (`app/layout.tsx` or `_app.tsx`) to mount
   <ThemeProvider>, <SpaceBackground />, and the theme toggle globally, without breaking
   existing routing.

Deliver: updated tailwind.config, globals.css with CSS variables, the SpaceBackground
component, ThemeToggle component, and the font/type-scale setup. Do not touch section content
yet — this prompt is foundation only.
```

### Prompt 2 — Hero Section Revamp
```
Now rebuild the Hero section using the design system from Prompt 1.

Requirements:
1. Layout: asymmetric split layout (keep the existing asymmetric spirit but rework visuals) —
   left/right split with name, role, tagline, CTA buttons on one side, and a large
   glassmorphic "viewport/porthole" panel on the other side containing a floating astronaut
   illustration (SVG, grayscale) with slow idle float + slight rotation via Framer Motion,
   plus a scroll-linked parallax effect (astronaut and starfield move at different scroll
   speeds — reuse existing parallax logic if present, adapt to new visuals).

2. The "porthole" panel itself should be a glass-morphic circular/rounded frame with:
   - backdrop-blur, translucent white/black border depending on mode
   - inner neumorphic bezel ring (raised/inset shadow) to look like a spaceship window
   - subtle animated light sweep/reflection across the glass every few seconds

3. CTA buttons ("View Projects", "Download Resume", "Contact Me") styled as neumorphic
   pill buttons with press-state (neu-pressed on click/tap), hover lift animation
   (translateY + shadow deepen), and glass variant option for secondary CTA.

4. Name/title text: large heading with a subtle text-reveal animation on load
   (staggered letter or word fade+slide-up using Framer Motion), plus an optional
   typewriter-style rotating role subtitle (e.g. "AI/ML Engineer" → "Full-Stack Developer" →
   "Competitive Programmer") using a lightweight typewriter effect.

5. Scroll-down indicator: a minimal animated element (e.g. a subtle bouncing chevron or
   a small "satellite signal ping" dot) at hero's bottom center, grayscale only.

6. Fully responsive: stack vertically on mobile, astronaut panel shrinks and repositions
   above text, animations remain performant (respect prefers-reduced-motion).

Deliver: updated Hero component with all sub-components (Porthole, RotatingRole,
ScrollIndicator) using the token system — no new colors introduced outside the
black/white/gray palette.
```

### Prompt 3 — About, Education & Experience Sections
```
Rebuild the About, Education, and Experience sections with a cohesive "Mission Log" /
"Flight Log" narrative styling, using the neumorphism + glassmorphism system.

1. About section:
   - Glass panel card containing profile summary text, with a small neumorphic "ID badge"
     or "astronaut mission patch" style avatar frame around the profile photo (circular,
     raised neu border, subtle rotating dashed ring around it like an orbit path).
   - Key highlight stats (CGPA, years of experience, projects count, hackathons won) shown
     as small neumorphic stat chips/tiles with count-up animation on scroll-into-view.

2. Education section:
   - Present as a vertical "flight timeline" / orbital path: a central vertical line
     (dotted, representing a trajectory) with neumorphic circular "checkpoint" nodes at
     each milestone (Diploma, B.Tech), each node expanding into a glass-panel detail card
     on hover/tap showing institute, score, duration.
   - Timeline line and nodes strictly grayscale; use subtle glow (white glow in dark mode,
     soft shadow in light mode) to indicate the "current/active" milestone.

3. Experience section:
   - Similar timeline or a horizontal-scroll "mission cards" carousel (choose whichever
     fits better responsively) for internships/experience entries, each card styled as a
     glassmorphic panel with neumorphic icon badge (role icon), company, duration,
     and 2–3 bullet responsibilities.
   - Add scroll-triggered fade+slide-in animation for each entry (staggered).

4. Ensure all cards/panels use consistent glass-panel + neu-icon-badge combo established
   in Prompt 1, and all section headers use a consistent "section label" style (e.g. small
   uppercase kicker text like "// MISSION LOG" or "01. ABOUT" in monospace-style font for
   a HUD/cockpit feel — still black/white only).

Deliver: About, Education, Experience components, fully responsive, animated on scroll
using Framer Motion's `whileInView`.
```

### Prompt 4 — Projects & Achievements Sections
```
Rebuild the Projects and Achievements sections.

1. Projects section:
   - Present each project as a "Mission Card": a glassmorphic card with a neumorphic
     header strip showing a mission-style code name (e.g. "MISSION-01: SamayVidya"),
     tech-stack chips (small neu-pressed pill tags), a short description, and two action
     buttons (Live Demo / GitHub) styled as circular neumorphic icon buttons.
   - Grid layout on desktop (2–3 columns), single column stacked on mobile, with a
     hover effect: card lifts (translateY + shadow deepen), a subtle "scanline" or
     glass-glare sweep plays across the card, and the tech chips slightly stagger-animate in.
   - Add a filter/tag bar above the grid (e.g. "All / AI-ML / Full-Stack / DevOps") styled
     as a neumorphic segmented control, filtering projects with a smooth fade+reflow
     animation (use layout animations via Framer Motion's `layout` prop).

2. Achievements section:
   - Present achievements/hackathon wins as "medals/badges": circular or hexagonal
     neumorphic badge icons (trophy/medal iconography, grayscale line icons) arranged in
     a responsive grid or honeycomb layout, each with a tooltip/expandable glass panel
     showing achievement name, event, and result on hover/tap.
   - Add a subtle "shine sweep" animation on each badge on hover (like light catching a medal).

3. Both sections should reuse the section-label kicker style from Prompt 3 for consistency
   (e.g. "02. PROJECTS", "03. ACHIEVEMENTS").

Deliver: Projects component (with filter logic) and Achievements component, both fully
responsive and animated, strictly black/white/gray palette.
```

### Prompt 5 — Testimonials, Contact & Footer
```
Rebuild Testimonials, Contact, and Footer sections to complete Part 1 of the revamp.

1. Testimonials section:
   - Present as "Incoming Transmissions": a horizontal auto-scrolling or swipeable
     carousel of glassmorphic quote cards, each with a neumorphic circular avatar frame,
     name, role/relation, and quote text. Add a subtle "signal wave" or audio-waveform-style
     decorative line icon near each card to reinforce the "transmission" theme (grayscale only).
   - Carousel should support manual drag/swipe (mobile) and auto-advance with pause-on-hover
     (desktop), with neumorphic prev/next circular buttons and a dot-indicator styled as
     small satellite-orbit dots.

2. Contact section:
   - Style as "Mission Control" — a two-column layout: left side has contact info
     (email, phone, socials) as neumorphic icon-buttons in a vertical list; right side has
     a glassmorphic contact form (Name, Email, Message) with neumorphic input fields
     (inset/pressed style on focus), a floating label animation, and a submit button styled
     like a "Launch" button with a loading-state animation (e.g. small rocket/progress
     pulse) and success/error toast notification (glass panel toast, grayscale icons only).
   - Form validation with inline error states (subtle red is NOT allowed — use icon +
     text weight/underline change instead to stay within black/white palette, or a very
     desaturated gray-red only if absolutely necessary for error affordance — prefer icon-based
     indication).

3. Footer:
   - Minimal glass strip footer with quick nav links, social icons (neumorphic circular
     icon buttons), copyright text, and a small "Back to top" button styled as a rocket
     launch icon that triggers smooth scroll-to-top with a small launch animation.
   - Include a subtle starfield fade-out at the very bottom to visually close the "space"
     experience.

4. Final pass: audit all 8 sections (Hero, About, Education, Experience, Projects,
   Achievements, Testimonials, Contact, Footer) for consistent spacing scale, consistent
   glass/neu shadow depth, consistent animation timing (150–400ms micro-interactions,
   400–800ms scroll reveals), and consistent dark/light mode contrast/readability
   (WCAG AA minimum for text over glass panels — add a scrim/overlay if legibility suffers).

Deliver: Testimonials, Contact, Footer components + a short QA checklist confirming
cross-section consistency.
```

---

## PART 2 — Blogs Feature (5 Prompts)

### Prompt 1 — Hidden Admin Auth System
```
Build a hidden, secure-enough (for a personal portfolio, not enterprise-grade) admin
authentication system for managing blogs.

Requirements:
1. Create a route at `/admin-login` that is NOT linked anywhere in the site's visible
   navigation (no nav link, no footer link, no sitemap entry — accessible only by direct
   URL). Add `noindex, nofollow` meta robots tag on this route so search engines don't
   index it.

2. Store the admin password in a local JSON file, e.g. `config/admin-credentials.json`
   (or `.local/admin-credentials.json`), structured like:
   {
     "passwordHash": "<bcrypt-or-argon2-hash>",
     "updatedAt": "ISO-date"
   }
   - NEVER store the password in plaintext — hash it with bcrypt (or argon2) at setup time
     via a small local script (`scripts/set-admin-password.js`) I can run once locally to
     generate the hash and write the JSON file.
   - Add this JSON file's path to `.gitignore` explicitly (and add a
     `config/admin-credentials.example.json` placeholder with a fake hash so the repo
     structure is clear to me later, without ever committing the real file).
   - Also add a check on server start (or a comment/README note) reminding that this file
     must exist locally and must never be committed.

3. Build the `/admin-login` page UI in the same Space/Neumorphism/Glassmorphism theme:
   a centered glass-panel "Airlock Access" card with a neumorphic password input
   (masked, show/hide toggle), a "Authenticate" button (neu-pressed style), and subtle
   error shake-animation + message on wrong password (rate-limit after 5 failed attempts
   with a short cooldown timer shown to the user).

4. On successful login, set a secure, httpOnly session cookie (or JWT stored in httpOnly
   cookie) with reasonable expiry (e.g. 7 days), and redirect to `/admin/dashboard`
   (also hidden/unlinked, protected by middleware that checks the session cookie server-side
   and redirects unauthenticated requests back to `/admin-login`).

5. Add a logout action (clears the cookie) accessible from the admin dashboard.

Deliver: `/admin-login` page, password-hash setup script, `.gitignore` update, auth
middleware/session logic, and the protected `/admin/dashboard` route shell (empty
dashboard layout for now — content comes in the next prompt).
```

### Prompt 2 — Blog Data Model & Storage Layer
```
Set up the data layer for blogs.

1. Decide and implement a storage approach appropriate for a personal site (pick ONE,
   default to option A unless I say otherwise):
   A) File-based: each blog stored as a Markdown file with YAML frontmatter in
      `content/blogs/*.md` (frontmatter: title, slug, coverImage, tags, excerpt,
      publishedAt, updatedAt, status: draft|published), parsed at build/request time
      with gray-matter + a markdown renderer (e.g. remark/rehype or MDX).
   B) Lightweight DB: SQLite (via Prisma or better-sqlite3) or a hosted option
      (e.g. Supabase/Postgres) with a `blogs` table (id, title, slug, content,
      coverImageUrl, tags[], excerpt, status, publishedAt, updatedAt).

2. Implement CRUD utility functions/API routes:
   - `GET /api/blogs` — list published blogs (public), with optional `?admin=true`
     variant (protected) returning drafts too.
   - `GET /api/blogs/[slug]` — get single blog by slug.
   - `POST /api/blogs` — create (admin-protected, checks session cookie from Part 2
     Prompt 1's middleware).
   - `PUT /api/blogs/[id]` — update (admin-protected).
   - `DELETE /api/blogs/[id]` — delete (admin-protected).

3. Handle cover image uploads: store uploaded images in `public/uploads/blogs/` (or an
   external storage bucket if I already use one) with sanitized unique filenames, and
   return the public URL to save in the blog record.

4. Add slug auto-generation from title (kebab-case, with uniqueness check/suffix if
   duplicate), and basic input sanitization/validation (title required, min content
   length, tag format).

5. Seed 2–3 sample blog entries (dummy content) so the listing/detail pages have data
   to render immediately during development.

Deliver: chosen storage implementation, all CRUD API routes with admin-protection
applied correctly, image upload handler, and seed data.
```

### Prompt 3 — Admin Dashboard: Blog Editor & Management UI
```
Build the admin dashboard UI at `/admin/dashboard` (protected route) for managing blogs,
styled consistently with the Space/Neumorphism/Glassmorphism theme.

1. Dashboard home (`/admin/dashboard`):
   - A glass-panel table/card-list of all blogs (draft + published) showing title,
     status badge (neumorphic pill: "Draft" vs "Published", grayscale only —
     differentiate via icon + border style, not color), last updated date, and quick
     actions (Edit / Delete / Publish-Toggle) as small neumorphic icon buttons.
   - A prominent "+ New Blog" button (neu-raised, primary style) linking to the editor.
   - Delete action requires a confirm step (glass modal: "Confirm Deletion" with
     Cancel/Delete buttons).

2. Blog editor (`/admin/dashboard/new` and `/admin/dashboard/edit/[id]`):
   - Form fields: Title (neu input), Slug (auto-filled, editable), Cover Image
     (drag-and-drop upload zone styled as a glass panel with dashed neu border,
     preview thumbnail after upload), Tags (chip input — type + enter to add,
     neu-pressed chip style with remove ×), Excerpt (textarea, char-count indicator),
     Content (a markdown editor — use a lightweight editor like `@uiw/react-md-editor`
     or a simple textarea + live preview pane split-screen), Status toggle
     (Draft/Published — styled as a neumorphic switch).
   - Autosave draft to localStorage every ~10s as a safety net against accidental
     navigation away (separate from actual DB/file save), with a small "Draft saved
     locally at HH:MM" indicator.
   - Save/Publish button with loading state and success toast (reuse toast component
     from Part 1 Prompt 5).

3. Ensure all admin dashboard pages are wrapped by the auth middleware so direct URL
   access without a valid session redirects to `/admin-login`.

Deliver: Dashboard list page, blog editor (create + edit modes sharing one component),
confirm-delete modal, and toast integration — all theme-consistent.
```

### Prompt 4 — Public Blogs Listing Page
```
Build the public-facing `/blogs` page.

1. Page header: consistent with other section kickers (e.g. "// TRANSMISSIONS LOG" or
   "Blog") plus a short intro line.

2. Blog grid: each published blog shown as a glassmorphic "Transmission Card" —
   cover image (with a subtle grayscale duotone overlay filter for theme consistency
   even if uploaded images are in color — apply a CSS filter like grayscale(20%) +
   contrast boost, adjustable), title, excerpt (2–3 lines, truncated with ellipsis),
   tags (small neu-pressed chips), publish date, and estimated read time
   (auto-calculated from word count).

3. Add:
   - Search bar (neumorphic input) filtering by title/tags client-side (debounced).
   - Tag filter chips above the grid (multi-select, neu-pressed active state).
   - Sort control (Newest / Oldest).
   - Pagination or infinite scroll (pick infinite scroll with a neumorphic
     "Loading more transmissions..." spinner styled as a small rotating satellite/dot ring).

4. Empty state: if no blogs match filters, show a friendly glass-panel empty state
   ("No transmissions found in this sector" with a small illustration, grayscale).

5. Fully responsive grid (1 col mobile, 2 col tablet, 3 col desktop), with scroll-reveal
   entrance animation per card (staggered, respecting prefers-reduced-motion).

Deliver: `/blogs` listing page with search, filter, sort, infinite scroll/pagination,
and empty state, theme-consistent.
```

### Prompt 5 — Individual Blog Post Page & Final Integration
```
Build the individual blog post page and finish integrating the blog feature into the
overall site.

1. `/blogs/[slug]` page:
   - Hero area: full-width cover image (with the same grayscale-duotone filter treatment
     as the listing cards for consistency) with a glass-panel overlay containing title,
     publish date, read time, and tags.
   - Content area: rendered markdown/MDX content in a clean, highly readable typography
     column (max-width ~700px), styled blockquotes/code blocks/headings consistent with
     the neumorphism/glass theme (e.g. code blocks in a neu-inset dark/light panel
     regardless of site theme for readability, with a copy-button).
   - A reading-progress indicator: a thin bar at the top of the viewport that fills as
     the user scrolls through the post (grayscale gradient).
   - "Related Transmissions" section at the bottom: 2–3 other blogs (matched by shared
     tags) shown as mini glass cards.
   - Share buttons (copy-link, and optionally native Web Share API on mobile) styled as
     small neumorphic icon buttons.

2. SEO & metadata: dynamic `<title>`, meta description (from excerpt), Open Graph tags
   (using cover image), and JSON-LD BlogPosting structured data per post.

3. Navigation integration: add a "Blogs" link to the main site navigation (this is the
   ONLY new nav item — admin routes remain hidden/unlinked as established in Part 2
   Prompt 1).

4. 404 handling: if slug doesn't exist or blog is unpublished, show a themed 404
   ("Transmission lost in deep space") with a link back to `/blogs`.

5. Final integration pass:
   - Verify admin-created/edited blogs reflect correctly and immediately on the public
     `/blogs` and `/blogs/[slug]` pages (check caching/revalidation strategy — use ISR
     revalidation or on-demand revalidation via `revalidatePath` after admin save/publish
     actions if using Next.js App Router).
   - Full theme QA pass across all blog pages in both dark and light mode.
   - Confirm `/admin-login` and `/admin/dashboard` remain unlinked from any public nav,
     sitemap, or footer.

Deliver: Blog post page, nav update, SEO metadata, 404 handling, revalidation logic,
and a final QA checklist confirming the full blogs feature works end-to-end alongside
the Part 1 UI revamp.
```

---

## Usage Notes
- Run prompts **in order within each part** — later prompts assume components/tokens from earlier ones exist.
- Finish **all of Part 1** before starting Part 2 (blogs UI depends on the design system/components from Part 1).
- Feed one prompt at a time to your coding agent; review/test after each before moving to the next.
- Before Part 2 Prompt 1, decide where you'll deploy (Vercel/Render/VPS) since the admin password JSON approach assumes filesystem access — if deploying to a serverless/edge platform with ephemeral filesystem, flag this back to your agent so it can switch to an environment-variable-based hash instead of a JSON file.