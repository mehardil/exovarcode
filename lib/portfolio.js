export const portfolio = [
  {
    slug: "saas-operations-dashboard",
    title: "Operations dashboard for a service business",
    category: "Product & web app",
    serviceSlug: "web-development",
    image: "/images/case-saas.webp",
    imageAlt: "Dark dashboard interface representing a custom operations web app",
    problem:
      "A growing service team tracked clients, jobs, and reporting across disconnected spreadsheets. Handoffs were slow and nobody trusted the numbers.",
    approach:
      "We designed a role-based React dashboard with a real data model, scoped access, and automated reporting. The first release replaced the three spreadsheets used daily.",
    outcome:
      "One source of truth for the operating team, faster handoffs, and a foundation for adding client-facing features.",
    tags: ["React", "Dashboard", "Data model"],
    sample: true,
  },
  {
    slug: "b2b-lead-system",
    title: "A lead system for a B2B service brand",
    category: "Lead generation",
    serviceSlug: "lead-generation-systems",
    image: "/images/case-marketing.webp",
    imageAlt: "Analytics and funnel visual representing a B2B lead generation system",
    problem:
      "Traffic existed, but the site offered one generic contact page. Inquiries arrived without context and there was no reliable source attribution.",
    approach:
      "We rebuilt the conversion path around two clear options, added UTM capture, routed leads to the owner inbox, and instrumented every CTA and submit.",
    outcome:
      "A shorter path from visit to conversation and clear reporting on which pages and campaigns produced inquiries.",
    tags: ["Landing pages", "Tracking", "CRM routing"],
    sample: true,
  },
  {
    slug: "technical-seo-recovery",
    title: "Technical SEO recovery for a client-rendered site",
    category: "Technical SEO",
    serviceSlug: "seo",
    image: "/images/case-ecommerce.webp",
    imageAlt: "Search analytics visual representing a technical SEO recovery project",
    problem:
      "The site was a client-rendered single-page app. Search engines received an almost empty HTML shell, and important service pages had no unique metadata.",
    approach:
      "We moved public pages to static generation, added one H1 per route, unique titles and descriptions, structured data, canonical URLs, and an internal linking plan.",
    outcome:
      "Crawlable HTML for every public route, cleaner indexation signals, and a measurable baseline for content and authority work.",
    tags: ["SSG", "Structured data", "Core Web Vitals"],
    sample: true,
  },
  {
    slug: "logistics-automation",
    title: "Order workflow automation for a small operations team",
    category: "Automation",
    serviceSlug: "automation",
    image: "/images/case-logistics.webp",
    imageAlt: "Logistics workflow visual representing a business automation project",
    problem:
      "Orders from multiple channels were copied by hand into a warehouse system. Rework and missed updates increased as volume grew.",
    approach:
      "We mapped the workflow, connected the order sources to the warehouse API, added validation and retries, and routed exceptions to a human queue with alerts.",
    outcome:
      "Less copy-paste work, fewer manual errors, and a documented process that does not depend on one person remembering the steps.",
    tags: ["Integrations", "Alerts", "Runbook"],
    sample: true,
  },
];

export const getPortfolioItem = (slug) => portfolio.find((item) => item.slug === slug);
