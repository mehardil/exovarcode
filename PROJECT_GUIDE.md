# Sync-Oaks Project Guide

Read this file first before making changes. It is the quick source of truth for the
project structure, behavior, design, and update rules. When a future change alters
routes, components, email behavior, design rules, dependencies, or commands, update
this file in the same change.

## Project Summary

Sync-Oaks is a Next.js 16 (App Router) statically exported marketing website for a
digital product studio. It covers home, services, portfolio, blog, about, contact,
book-meeting, legal pages, RSS, sitemap, robots, and `llms.txt`.

The site is deployed as static files (`out/`) to Cloudflare Pages, with a single
Cloudflare Pages Function (`functions/api/lead.js`) for lead email delivery.

## Commands

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Production build (static export to `out/`): `npm run build`
- Preview the exported build: `npm run preview`
- Regenerate Open Graph images: `npm run og:generate`
- Regenerate optimized WebP images: `npm run images:optimize`
- Submit URLs for indexing: `npm run index:submit` (dry run: `npm run index:dry`)

`prebuild` runs `scripts/generate-og.mjs` automatically. The image optimizer is a
manual step: run it after adding or replacing files in `public/images`.

## Stack

- Next.js App Router with `output: "export"` (fully static HTML).
- React 19 and `react-dom` (`preload` is used for the hero image).
- `framer-motion` for scroll reveal motion.
- `three` for the lazily mounted hero network scene.
- `lucide-react` icons, `gray-matter` + `marked` for Markdown articles, `zod` for
  lead validation, `sharp` for image/OG generation.

## Key Files

- `app/layout.jsx`: fonts, global metadata, header/footer, analytics, JSON-LD.
- `app/page.jsx`: home page (hero, bento, services, process, pricing, FAQ, articles).
- `app/globals.css`: the full design system and responsive layout.
- `app/services/[slug]/page.jsx`: service detail routes generated from `lib/services.js`.
- `app/blog/[slug]/page.jsx`: article routes generated from `content/articles/*.md`.
- `app/sitemap.js`, `app/robots.js`, `app/rss.xml/route.js`, `app/llms.txt/route.js`.
- `lib/site.js`: brand/contact config, nav, WhatsApp helpers, copy.
- `lib/services.js`: service content, images, pricing, FAQs.
- `lib/portfolio.js`: portfolio summaries and images.
- `lib/articles.js`: Markdown loading, categories, pagination.
- `lib/seo.js`: metadata and structured-data helpers.
- `functions/api/lead.js`: Cloudflare Pages Function for lead email (Resend + KV rate limit).

## Pages

- `/` Home: hero, services, process, pricing, FAQ, latest articles.
- `/services/` and `/services/[slug]/`: service overview and detail pages.
- `/portfolio/`: selected work summaries.
- `/blog/`, `/blog/page/[page]/`, `/blog/category/[category]/`, `/blog/[slug]/`.
- `/about/`, `/contact/`, `/book-meeting/`.
- `/locations/`, `/locations/[slug]/`: service-area pages for the USA, UK and UAE.
- `/privacy/`, `/terms/`, `/404`, `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/llms.txt`.

## Page Hero Identities

Every inner page has its own hero identity via a `hero-page--*` class plus
`components/HeroFlair.jsx`:

- `services` (teal constellation, narrow copy), `portfolio` (warm editorial index),
  `blog` (cool journal, blue accent), `about` (centered manifesto),
  `contact` (green conversation), `booking` (scheduler grid), `locations` (map grid),
  `legal` (quiet), `notfound` (red wrong-turn).
- Each variant changes `--page-accent`, the `::before` gradient/pattern, the blurred tile
  tint via `::after`, the watermark word/rings, and sometimes layout/width.
- To add a page: add the `hero-page--<name>` class to its hero `<section>`, render
  `<HeroFlair variant="<name>" label="..." />`, and add the matching CSS block in
  `app/globals.css`.

## Locations And Market Targeting

- `lib/locations.js` holds the USA, UK and UAE page content (currency, timezone,
  compliance, pricing, FAQs, keywords).
- `app/locations/[slug]/page.jsx` renders each market with `Service`, `FAQPage`,
  `WebPage` and `BreadcrumbList` schema plus `hreflang` alternates.
- `lib/site.js` exports `MARKETS`; `lib/seo.js` uses it for `Organization.areaServed`.
- Edit copy in `lib/locations.js`, never hardcode it in the page.

## Weekly Content Workflow

1. Open `scripts/prompts/weekly-articles.md` and give it to the agent.
2. The agent creates 5–10 articles in `content/articles/` using `_template.md`.
3. Run `npm run content:validate` (checks slugs, keywords, images, links, length).
4. Run `npm run images:optimize` if images changed, then `npm run build`.
5. Commit, push, and let Cloudflare Pages deploy.
6. Run `npm run index:submit` after deploy. `.github/workflows/indexing.yml` also runs
   the same indexing weekly on a schedule.

## Mobile Behavior

- On `<=760px`, `.reveal` elements are forced visible (desktop keeps the scroll animation),
  so a slow or failed hydration can never leave blank sections.
- The mobile drawer is always in the DOM and toggled by the `.is-open` class. A native
  inline fallback in `app/layout.jsx` (`#menu-fallback`) keeps the hamburger working even
  if React has not hydrated. The toggle has a 44px tap target and `touch-action: manipulation`.
- `#reveal-fallback` in `app/layout.jsx` reveals any still-hidden `.reveal` blocks if the
  IntersectionObserver never reports, protecting desktop as well.
- Mobile spacing is tightened (`--section-y: 2.75rem`, smaller hero/section padding) and
  lazy image containers have gradient placeholders so they never look empty while loading.
- `app/loading.jsx` + `.page-loader` provide a branded route-loading indicator.

## Deployment (Cloudflare Pages)

- `next build` with `output: "export"` writes the static site to `out/`.
- `postbuild` runs `scripts/prepare-dist.mjs`, which mirrors `out/` to `dist/`. This keeps
  existing Cloudflare projects that expect `dist/` working.
- Recommended Cloudflare Pages settings:
  - Framework preset: **None** (not Vite)
  - Build command: `npm run build`
  - Build output directory: `out` (or leave `dist`, which the postbuild mirrors)
- `dist/` and `out/` are git-ignored; they are generated during the build.

## Forms And Email

- `components/LeadForm.jsx` posts JSON to `/api/lead` (Cloudflare Pages Function).
- `functions/api/lead.js` validates with Zod, optionally verifies Cloudflare Turnstile,
  rate-limits with KV when configured, and sends email through Resend.
- If the API is unavailable, the UI keeps a WhatsApp path and an email fallback.
- Env vars are documented in `.env.example` (`RESEND_API_KEY`, `LEAD_TO_EMAIL`,
  `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).
- Keep the `_headers` content-security-policy in sync if you add third-party scripts.

## Performance Rules

- Images under `public/images` must ship as optimized `.webp`. `scripts/optimize-images.mjs`
  converts the card `.jpg` sources and the hero PNG into WebP (hero is ~68KB vs 1.6MB).
- The hero uses `/images/hero-services.webp` and is preloaded with
  `react-dom`'s `preload()` and `fetchPriority="high"`.
- The hero atmosphere uses `/images/hero-blur.webp` (64px blurred source) as CSS
  background layers, so the blur costs almost no bytes. It is hidden under 640px and
  disabled under `prefers-reduced-motion`.
- Every inner-page hero (`.hero-page`) and article header (`.article-header`) gets a
  blurred backdrop from the tiny `blur-*.webp` tiles via CSS `::after`. There is no extra
  markup or JavaScript for it.
- `components/ScrollSpider.jsx` draws the gold scroll-linked brand spider. It updates only
  while scrolling, is hidden below 1200px, and is disabled under reduced motion.
- `components/Hero3D.jsx` + `components/NetworkScene.jsx` render the three.js hero scene.
  `variant="ambient"` is used on the Services, Portfolio, Insights, About and Contact
  heroes. `NetworkScene` imports only the three.js classes it needs, so the lazy chunk is
  ~131KB gzipped (under the 150KB budget).
- The 3D scene boots only after idle time and when its hero is in view, caps DPR at 1.5
  (ambient) / 1.7 (full), pauses off-screen and on hidden tabs, and is skipped for
  reduced motion, small screens, 2G/save-data, low-core/low-memory devices, and missing
  WebGL. The fallback is the CSS gradient `.hero-fallback`.
- Motion uses lightweight IntersectionObserver + rAF (Reveal, Counter, TiltCard,
  HeroVisual parallax) rather than a heavy animation library, to protect INP and TBT.
- The Three.js scene is dynamically imported without SSR and only starts on desktop,
  WebGL-capable, motion-friendly devices during idle time.
- All below-the-fold images use `loading="lazy" decoding="async"` with explicit
  `width`/`height`.
- `/_next/static/*` is immutable; `/images/*` and `/og/*` are cached for 30 days.

## Design Rules

- Dark-first obsidian + antique gold palette with a light theme via `data-theme`.
- Colors are CSS variables in `app/globals.css`.
- Cards use the existing radius tokens; keep the site clean and service-focused.
- Do not add a track-order page or order-tracking UI unless explicitly requested.
- Keep mobile layouts responsive through the existing media queries.

## Adding Or Editing Content

- Services and pricing: `lib/services.js`.
- Portfolio/work: `lib/portfolio.js`.
- Blog posts: add a Markdown file in `content/articles/` with front matter
  (`title`, `description`, `date`, `category`, `coverImage`, etc.).
- Brand, email, phone, WhatsApp, social: `lib/site.js`.
- Navigation: `components/Header.jsx` + `primaryNav` in `lib/site.js`.

## Known Pitfalls

- This is a static export: there is no server runtime. Anything dynamic must be a
  Cloudflare Pages Function (`functions/`) or client-side.
- Reference images by their `.webp` path. Adding a `.jpg`/PNG reference will bypass
  the optimized assets and slow the site down.
- After changing routes or assets, run `npm run build` and check the `out/` route list.
- `.next/` and `out/` are build artifacts and must stay git-ignored.

## Update Checklist

1. Read this file first.
2. Make the change in the correct file.
3. Run `npm run images:optimize` if images changed.
4. Run `npm run build`.
5. Update this file if the change affects structure, behavior, commands, email flow,
   design rules, performance, or known pitfalls.
