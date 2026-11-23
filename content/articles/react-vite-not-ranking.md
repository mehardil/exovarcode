---
title: "Why Your React or Vite Website Isn't Ranking (and How to Fix It)"
slug: "react-vite-not-ranking"
description: "The real reasons React and Vite single-page apps struggle in search, how to diagnose the problem in 60 seconds, and the practical fixes."
date: "2026-01-23"
updated: "2026-01-23"
author: "Sync-Oaks"
category: "SEO"
tags: ["React", "Vite", "SEO", "rendering", "single-page app"]
focusKeyword: "React website not ranking"
coverImage: "/images/service-seo.webp"
coverAlt: "Developer inspecting a React site's HTML output and search visibility"
related: ["technical-seo-checklist", "nextjs-vs-wordpress-vs-react", "core-web-vitals-2026"]
faq:
  - q: "Can Google index a React single-page app?"
    a: "Google can render JavaScript, but rendering is a second step, not a guarantee. The initial HTML may be empty, rendering can be delayed, and other crawlers or AI systems may not execute JavaScript at all. Server-rendered or statically generated HTML is the reliable fix."
  - q: "Does Vite cause SEO problems?"
    a: "No. Vite is a build tool. The SEO problem comes from the rendering strategy, usually a client-side React router that ships an empty HTML shell. You can keep Vite and add prerendering, or move to a framework with rendering built in."
  - q: "How can I check if my React site is crawlable?"
    a: "Run curl on a key page and look for the H1, body copy, and internal links. If they are missing, crawlers that do not run JavaScript see almost nothing. Also compare View Source with the rendered DOM in your browser."
  - q: "Is prerendering enough for SEO?"
    a: "Prerendering solves the empty-HTML problem, but you still need unique metadata, canonical URLs, a sitemap, internal links, and useful content. Rendering is the foundation, not the whole strategy."
  - q: "Should I rewrite my whole site in Next.js?"
    a: "Not always. If the site is small, a prerender step may be enough. If you need per-page metadata, dynamic routes, and ongoing growth, a framework such as Next.js or Astro usually reduces maintenance."
---

If your React or Vite site is not ranking, the first thing to check is not your keywords. It is what the server sends before JavaScript runs.

Most React single-page apps send an HTML shell like this:

```html
<div id="root"></div>
<script type="module" src="/assets/index-abc123.js"></script>
```

The browser downloads the JavaScript, builds the page, and everything looks fine. A crawler that does not execute JavaScript sees an empty container. That is the whole problem in one line.

Google can render JavaScript, but it is a second wave of processing. It can be delayed, it consumes crawl resources, and it is not guaranteed for every URL. Other crawlers — including some AI and social systems — often do not execute JavaScript at all. Relying on rendering is relying on someone else's queue.

Google explains the mechanics in its [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). The practical takeaway: if search matters, ship the content in the HTML response.

## Diagnose it in 60 seconds

Run this in a terminal:

```bash
curl -s https://yourdomain.com/ | grep -i "<h1"
curl -s https://yourdomain.com/services/ | grep -i "<h1"
```

Then compare with what you see in the browser.

- If the terminal shows your heading and body copy, the page is probably renderable by crawlers.
- If it shows only `<div id="root">`, you have a client-rendering problem.
- If it shows a generic "Loading…" message, that text may be what search engines index.

You can also open **View Page Source** (not Inspect Element) and search for your main heading. Inspect Element shows the DOM after JavaScript; View Source shows the original response.

## Why this happens with Vite and React

Vite is a build tool. It bundles and serves your app. It does not decide how the page is rendered.

A typical Vite + React setup uses `BrowserRouter` and mounts the app into `#root`. On the server, there is no app. The HTML file is a static shell. All routing and content happen in the browser.

This is a reasonable architecture for an authenticated dashboard. It is a poor default for public marketing pages, because:

- The first response has no unique content per URL.
- Title and meta tags are often set client-side or not at all.
- Internal links may be JavaScript click handlers instead of real anchors.
- Each route shares the same initial HTML, so crawlers see duplicates.
- Social previews and AI crawlers may see nothing.

The site can still be fast in a browser. It can still look good. It just does not communicate with machines that do not run your bundle.

## The four fixes, from smallest to largest

### Fix 1: Pre-render the public routes

If you want to keep Vite, add a build step that renders each public route to static HTML. Tools such as `vite-react-ssg` or a custom prerender script can do this. The output is a folder of HTML files with real content, hydrated by React in the browser.

This is the smallest change and works well for a small marketing site. You still need to solve per-page metadata and routing conventions.

### Fix 2: Move public pages to a framework with rendering

Next.js or Astro can generate static HTML for public pages and still support React components. This is usually the lower-maintenance option once the site grows, because routing, metadata, and data loading are part of the framework.

Our comparison of [Next.js, WordPress, and React](/blog/nextjs-vs-wordpress-vs-react/) covers the tradeoffs. For a marketing site that also needs a content workflow, Next.js is our default.

### Fix 3: Keep the app, but split public and private surfaces

Sometimes the app must stay a SPA. In that case, put the marketing pages on a rendered stack and keep the authenticated app separate. Link between them with real URLs. Do not try to make one client-rendered bundle do both jobs badly.

### Fix 4: Add the SEO layer you skipped

Rendering is necessary but not sufficient. After the HTML is real, add:

- One unique `<title>` and meta description per page.
- One descriptive `<h1>`.
- Canonical URLs.
- Open Graph and Twitter metadata.
- A sitemap and `robots.txt`.
- JSON-LD for the organization, services, articles, and breadcrumbs.
- Internal links using real `<a href>` elements.
- A 404 page and redirects for old URLs.

If you only do step one, you have fixed the biggest leak. You have not finished the job.

## What about Vite itself?

Nothing is wrong with Vite. It is an excellent build tool, and many frameworks use it under the hood. The issue is the rendering mode, not the bundler.

If someone tells you "Vite is bad for SEO," they are using shorthand for "a client-rendered Vite SPA is bad for SEO by default." The fix is to render the public pages, not to abandon the tool.

## A minimal Next.js example

In the App Router, a page can export metadata and return server-rendered JSX:

```jsx
export const metadata = {
  title: "Web Development Services | Sync-Oaks",
  description: "Custom websites and web apps built for speed and search.",
  alternates: { canonical: "https://syncoaks.com/services/web-development/" },
};

export default function Page() {
  return (
    <main>
      <h1>Web development that ships real HTML</h1>
      <p>Every route is generated at build time...</p>
    </main>
  );
}
```

At build time, Next writes an HTML file with the heading and copy. The browser hydrates it. A crawler that never runs JavaScript still sees the content.

## The rewrite decision

Do not rewrite for its own sake. Ask:

1. How many public routes are there?
2. Do they need unique metadata and content?
3. Will the site grow with articles, services, or locations?
4. Does the team need a CMS?
5. Is the current app also used behind a login?

If the public surface is small and stable, prerendering may be enough. If it is growing and content-driven, a framework will save time. If the app is large and private, split it.

## Common mistakes after the fix

- Forgetting canonical URLs, so both `/services` and `/services/` index.
- Setting the same title on every page.
- Using `onClick` navigation instead of real links.
- Blocking CSS or JS in `robots.txt` in a way that breaks rendering.
- Leaving `noindex` on from staging.
- Publishing thin service pages with no unique content.
- Adding a sitemap but never linking new pages internally.
- Ignoring Core Web Vitals after the migration.

Rendering fixes visibility. Content and links earn rankings.

## Key takeaways

- A React/Vite SPA usually ships an empty HTML shell; that is the root SEO problem.
- Google can render JavaScript, but it is slower and less reliable than server HTML.
- Pre-rendering is the minimum fix; a rendering framework is often the durable one.
- Rendering is not enough: add metadata, canonicals, schema, sitemaps, and internal links.
- Diagnose with `curl` and View Source before changing anything.

## FAQ

### Will adding a sitemap fix my React site's rankings?

No. A sitemap helps discovery. If every URL returns the same empty shell, a sitemap just tells search engines where the empty pages are.

### Can I use React Helmet for SEO?

Client-side tag injection can work for browsers, but it depends on JavaScript execution. Server-rendered metadata is more reliable. Use the framework's metadata API where possible.

### Does server-side rendering hurt performance?

It can add server cost, but static generation avoids per-request rendering. For marketing sites, static HTML plus selective hydration is usually the fastest option.

### Is Astro better than Next.js for a marketing site?

Astro is excellent for content-heavy sites with minimal interactivity. Next.js is stronger when you need app-like routes, shared React state, or a large component ecosystem. Both can produce fast, crawlable HTML.

### How long until rankings recover after fixing rendering?

Indexation can update in days to weeks. Ranking recovery depends on content quality, competition, and how long the site was invisible. Treat the fix as the start of the SEO work, not the end.

---

**Want us to check what crawlers see on your site?** [Request a free audit](/contact/?service=free-audit#lead) or [book a call](/book-meeting/). We will show you the raw HTML and the fastest path to a crawlable site.
