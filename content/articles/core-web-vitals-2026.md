---
title: "Core Web Vitals in 2026: How to Pass LCP, CLS, and INP"
slug: "core-web-vitals-2026"
description: "A practical guide to Core Web Vitals in 2026: what LCP, CLS, and INP measure, the current thresholds, how to diagnose them, and the fixes that actually move the needle."
date: "2026-01-26"
updated: "2026-01-26"
author: "Sync-Oaks"
category: "SEO"
tags: ["Core Web Vitals", "LCP", "CLS", "INP", "performance"]
focusKeyword: "Core Web Vitals"
coverImage: "/images/service-data.webp"
coverAlt: "Performance analytics dashboard representing Core Web Vitals"
related: ["technical-seo-checklist", "react-vite-not-ranking", "cloud-hosting-devops-startups"]
faq:
  - q: "What are the Core Web Vitals thresholds in 2026?"
    a: "LCP is good at 2.5 seconds or less, CLS is good at 0.1 or less, and INP is good at 200 milliseconds or less. These are measured at the 75th percentile of real user experiences, not on a single desktop test."
  - q: "What replaced First Input Delay?"
    a: "Interaction to Next Paint (INP) replaced First Input Delay as a Core Web Vital in March 2024. INP measures the latency of all interactions on a page, not just the first input."
  - q: "Why does my Lighthouse score look good but Search Console says poor?"
    a: "Lighthouse is a lab test on one device and network. Search Console uses field data from real users across devices, locations, and conditions. Optimize for field data; use lab tools to diagnose specific causes."
  - q: "How do I improve LCP?"
    a: "Identify the LCP element first. Usually it is a hero image or a large heading. Optimize and preload the image, reduce server response time, avoid render-blocking resources, and remove client-side work that delays the first paint."
  - q: "How do I improve INP?"
    a: "Reduce long JavaScript tasks, break work into smaller chunks, defer non-critical scripts, and avoid heavy work in event handlers. Measure interactions in the field and use the Performance panel to find the slow task."
---

Core Web Vitals are not a score to chase. They are a description of how your page feels to real people: whether it loads, whether it stays still, and whether it responds when tapped.

Google uses them as a ranking signal, but the better reason to care is conversion. A page that shifts while someone is tapping "Buy" loses the sale. A page that takes five seconds to show the hero loses the visitor.

Here is the current model and the fixes that matter.

## The three metrics

| Metric | Measures | Good | Needs improvement | Poor |
| --- | --- | --- | --- | --- |
| LCP | Loading: when the main content appears | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| INP | Responsiveness: delay after interactions | ≤ 200ms | 200–500ms | > 500ms |
| CLS | Visual stability: unexpected layout shift | ≤ 0.1 | 0.1–0.25 | > 0.25 |

The thresholds are evaluated at the 75th percentile of page loads. That means 75% of real experiences should meet the "good" threshold. One fast desktop test does not prove anything.

The official definitions and updates live on [web.dev](https://web.dev/articles/vitals).

## Field data versus lab data

There are two ways to measure:

- **Field data** comes from real users: Chrome UX Report, Search Console's Core Web Vitals report, and your own RUM tooling.
- **Lab data** comes from a controlled test: Lighthouse, PageSpeed Insights lab section, or WebPageTest.

Use field data to decide whether there is a problem. Use lab data to reproduce and diagnose it. They often disagree because your users are not your laptop.

Start with Search Console. If a template is "poor" for LCP on mobile, you have a specific page group to fix. Do not optimize the whole site blindly.

## LCP: make the main content arrive

LCP is usually the hero image, a large heading, or a video poster. The browser records when that element is rendered.

Four sub-parts determine LCP:

1. **Time to first byte (TTFB):** how long the server takes to respond.
2. **Resource load delay:** how long before the LCP resource starts loading.
3. **Resource load time:** how long the resource takes to download.
4. **Render delay:** how long until the browser paints it.

### Fixes that usually work

- **Preload the LCP image** and make sure it is discoverable in the initial HTML. Do not load it through JavaScript after hydration.
- **Serve an appropriately sized image.** A 2000px image in a 400px slot wastes bandwidth. Use `srcset` and `sizes` or a framework image component.
- **Use a modern format** such as AVIF or WebP where supported, with a fallback.
- **Use a CDN** so the image and HTML arrive quickly.
- **Avoid lazy-loading the hero.** `loading="lazy"` on the LCP image delays it. Use eager loading and `fetchpriority="high"`.
- **Reduce render-blocking CSS and fonts.**
- **Remove client-side rendering for the hero copy.** If the heading only appears after a large JS bundle executes, LCP suffers.

Example:

```html
<img
  src="/images/hero-960.avif"
  srcset="/images/hero-480.avif 480w, /images/hero-960.avif 960w, /images/hero-1440.avif 1440w"
  sizes="(max-width: 760px) 100vw, 50vw"
  width="960"
  height="640"
  alt="Operations dashboard"
  fetchpriority="high"
/>
```

The explicit width and height also help CLS.

## CLS: stop the page from moving

CLS measures unexpected layout shifts. A late-loading ad, a font swap that changes text size, or an image without dimensions can push content around while someone is reading or tapping.

### Fixes

- Set explicit `width` and `height` on images and video, or reserve space with `aspect-ratio`.
- Reserve space for ads, embeds, cookie banners, and dynamic content.
- Use `font-display: swap` carefully; choose a fallback with similar metrics or use `size-adjust`.
- Avoid inserting banners above existing content after load.
- Do not animate layout properties such as `top`, `left`, `width`, or `height`. Use transforms and opacity for motion.
- Be careful with late-injected "promo" bars that push the page down.

CLS is cumulative: small shifts add up. A 0.05 shift from a cookie banner and a 0.06 shift from a font swap can push a page over the threshold.

## INP: respond when people interact

INP replaced First Input Delay in March 2024. It measures the latency of interactions across the page, not just the first click. A slow search filter or a heavy menu can hurt INP even if the page loads quickly.

### Fixes

- **Break up long tasks.** If a single JavaScript task blocks the main thread for hundreds of milliseconds, interactions wait.
- **Defer non-critical scripts.** Analytics, chat widgets, and A/B testing tools should not block interaction.
- **Avoid heavy work in event handlers.** Debounce search inputs, virtualize long lists, and move expensive calculations to a worker.
- **Hydrate less.** Server-render static content; hydrate only interactive islands.
- **Audit third-party tags.** One chat widget can dominate INP.
- **Use the Performance panel** to find long tasks and the Interactions track to see what users experience.

Our [React/Vite SEO guide](/blog/react-vite-not-ranking/) explains why rendering choices affect both LCP and INP.

## A practical optimization order

1. **Measure field data** in Search Console for mobile and desktop.
2. **Identify the templates** with the worst 75th-percentile values.
3. **Reproduce** one URL in PageSpeed Insights and Chrome DevTools.
4. **Fix the largest sub-part** first: TTFB, resource delay, load time, or render delay for LCP; long tasks for INP; unsized media for CLS.
5. **Verify** in the lab, then wait for field data to update.
6. **Add a performance budget** to CI so regressions are caught before launch.

A budget might be: JavaScript under 170KB gzipped on first load, LCP image under 200KB, no more than two font files, and no third-party script above 50KB without review.

## Performance budgets and 3D

Heavy visual effects are the usual suspect in "we want it to look premium" projects. You can have 3D and speed, but not by loading it on the critical path.

- Lazy-load the 3D bundle after first paint.
- Cap device pixel ratio at 1.5–2.
- Pause rendering when the canvas is off-screen or the tab is hidden.
- Disable or simplify on small screens and low-end devices.
- Respect `prefers-reduced-motion` and show a static fallback.
- Keep the total 3D JavaScript budget under about 150KB gzipped.
- Never block LCP on the canvas.

This site does exactly that: the hero renders without the 3D scene, the scene loads on idle on capable devices, and the page remains fully usable if WebGL is unavailable.

## Tools we use

- Search Console Core Web Vitals report for field data.
- PageSpeed Insights for lab and field data side by side.
- Chrome DevTools Performance and Lighthouse panels.
- WebPageTest for network-level testing.
- Real user monitoring for custom interaction metrics.
- `web-vitals` library if you want to send field data to your own analytics.

## Key takeaways

- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at the 75th percentile.
- Field data decides; lab data diagnoses.
- Preload and optimize the LCP image; do not lazy-load it.
- Reserve space for images, fonts, ads, and banners.
- Reduce long JavaScript tasks and third-party tags for INP.
- Add a performance budget so speed does not decay after launch.

## FAQ

### Is a Lighthouse score of 100 enough?

No. Lighthouse is a lab test. Field data from real users is what Search Console reports and what people actually experience. Use Lighthouse to find causes, not as the final grade.

### Do Core Web Vitals affect rankings directly?

They are a confirmed ranking signal, but content relevance and quality matter more. A fast page with no useful content will not rank for competitive queries.

### How long does it take to see improvement?

Lab scores change immediately. Field data usually updates over 28 days as the 75th percentile rolls forward. Search Console may take longer to reflect the change.

### Should I remove all animations to improve INP?

No. Use transform and opacity, keep animations off the main thread where possible, and respect reduced motion. The problem is usually JavaScript work, not CSS transitions.

### What is a good TTFB?

Under 0.8 seconds is a common target, and under 0.5 seconds is better for static pages served from a CDN. TTFB is one part of LCP, not a Core Web Vital by itself.

---

**Want a performance review with field data?** [Request a free audit](/contact/?service=free-audit#lead) or [book a call](/book-meeting/). We will identify the slow template and the fixes with the highest impact.
