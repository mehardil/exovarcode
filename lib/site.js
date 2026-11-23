export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://syncoaks.com";

export const SITE = {
  name: "Sync-Oaks",
  legalName: "Sync-Oaks Digital Product Studio",
  tagline: "Digital product studio for websites, apps, automation, and growth systems.",
  description:
    "Sync-Oaks is a digital product studio building fast websites, web apps, automation, cloud infrastructure, data products, and lead systems for growing businesses.",
  email: "syncoaks@gmail.com",
  phone: "+92 331 905 1913",
  phoneHref: "tel:+923319051913",
  city: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
  areaServed: "Worldwide",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") || "923319051913",
  whatsappMessage:
    "Hi Sync-Oaks, I'd like to discuss a project. I found you through syncoaks.com.",
  locale: "en",
  founded: "2021",
  social: {
    linkedin: "https://www.linkedin.com/in/syncoaks/",
  },
};

// Primary export markets. Used for metadata, structured data, and location pages.
export const MARKETS = [
  {
    name: "United States",
    shortName: "USA",
    code: "US",
    slug: "united-states",
    region: "North America",
    locale: "en_US",
    hreflang: "en-US",
    currency: "USD",
    currencySymbol: "$",
    timezone: "US Eastern and Pacific",
  },
  {
    name: "United Kingdom",
    shortName: "UK",
    code: "GB",
    slug: "united-kingdom",
    region: "Europe",
    locale: "en_GB",
    hreflang: "en-GB",
    currency: "GBP",
    currencySymbol: "£",
    timezone: "GMT / BST",
  },
  {
    name: "United Arab Emirates",
    shortName: "UAE",
    code: "AE",
    slug: "united-arab-emirates",
    region: "Middle East",
    locale: "en_AE",
    hreflang: "en-AE",
    currency: "AED",
    currencySymbol: "AED ",
    timezone: "GST (UTC+4)",
  },
];

export const MARKET_NAMES = MARKETS.map((market) => market.name);

export const whatsappUrl = (message = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (subject = "New Sync-Oaks project", body = "") => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${SITE.email}${query ? `?${query}` : ""}`;
};

export const primaryNav = [
  { href: "/services/", label: "Services" },
  { href: "/portfolio/", label: "Work" },
  { href: "/blog/", label: "Insights" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const stats = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 24, suffix: "/7", label: "Support coverage" },
];

export const trustBadges = [
  "Full-stack design + engineering",
  "Fixed-scope, transparent pricing",
  "SEO-first builds, not retrofits",
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    text: "We map your goals, buyers, current funnel, and technical constraints in a short discovery call. You get a clear scope and a fixed price before work starts.",
  },
  {
    step: "02",
    title: "Design",
    text: "We design the structure, copy direction, and interface around one job: turning visitors into qualified conversations. You review real pages, not abstract moodboards.",
  },
  {
    step: "03",
    title: "Build",
    text: "We engineer a fast, accessible, server-rendered product with analytics, lead capture, and search foundations built in from the first commit.",
  },
  {
    step: "04",
    title: "Launch & grow",
    text: "We deploy, verify Core Web Vitals and indexing, then iterate with content, technical SEO, and conversion experiments based on real data.",
  },
];

export const differentiators = [
  {
    title: "SEO is structural, not a plugin",
    text: "Every page ships real HTML, unique metadata, structured data, and a crawlable internal link graph. No client-only pages hiding from search engines.",
  },
  {
    title: "Leads are the success metric",
    text: "One clear WhatsApp path and one short email form. Every CTA, form submit, and UTM is tracked so you can see what actually produces conversations.",
  },
  {
    title: "Fast by default",
    text: "Static HTML on a global edge, lazy 3D, optimized images, and a strict JavaScript budget. Speed is a feature, not a cleanup task.",
  },
  {
    title: "You own everything",
    text: "Your code, content, domain, and analytics live in accounts you control. No proprietary lock-in and no mystery hosting bill.",
  },
];

export const homeFaqs = [
  {
    q: "How much does a website cost?",
    a: "Most Sync-Oaks website engagements start in the $1,500–$5,000 range for a focused marketing site, and $5,000+ for custom web applications. The exact price depends on pages, integrations, content, and timeline. We give you a fixed scope and price after a short discovery call, and we publish starting ranges on our services pages.",
  },
  {
    q: "How long does a project take?",
    a: "A focused marketing website typically takes 2–4 weeks. Larger web apps, automation systems, and data products usually run 6–12 weeks. We agree on milestones before starting and share a weekly progress update.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes. We work remotely with clients across the US, UK, UAE, Europe, and Australia. Communication happens over WhatsApp, email, and scheduled video calls, with overlap hours agreed at kickoff.",
  },
  {
    q: "Can you fix the SEO of my existing site?",
    a: "Yes. We start with a technical audit covering rendering, indexation, Core Web Vitals, metadata, structured data, and internal linking. We then fix the highest-impact issues first and report before/after evidence instead of vanity metrics.",
  },
  {
    q: "What is included in the free audit?",
    a: "A short written review of your homepage and one key landing page: rendering and indexability, page speed, mobile usability, metadata, lead capture, and three prioritized fixes. It is free and there is no obligation to hire us.",
  },
  {
    q: "Do you build with Next.js, WordPress, or something else?",
    a: "We choose the stack based on the job. Next.js is our default for marketing sites and product front ends that need speed and SEO. WordPress can be the right choice when a team needs a familiar editorial workflow. We explain the tradeoffs before you commit.",
  },
  {
    q: "Who owns the website and content after launch?",
    a: "You do. Code, content, domain, hosting, and analytics are set up in accounts you own. We hand over documentation and, if you want, train your team to publish articles through the admin panel.",
  },
  {
    q: "What happens after launch?",
    a: "We verify analytics, indexing, forms, and Core Web Vitals. Optional growth retainers cover technical SEO, content production, conversion experiments, and monitoring. There is no required long-term contract.",
  },
  {
    q: "How do I start a project?",
    a: "Use the WhatsApp button for the fastest reply, or send the short email form on the contact page. We reply with a few clarifying questions and a proposed call time, usually within one business day.",
  },
];

export const ownerTodos = [
  "Confirm the WhatsApp business number (currently configured from the existing site config).",
  "Replace illustrative portfolio write-ups with approved client stories and verified metrics.",
  "Add real testimonials before enabling Review structured data.",
  "Add real client logos and team details, or keep them out of the site.",
  "Confirm the business address and service areas before publishing LocalBusiness schema.",
  "Set up Resend (or another transactional email provider) and add API keys in Cloudflare.",
  "Connect Decap CMS to the GitHub repository and configure the OAuth proxy.",
  "Verify syncoaks.com in Google Search Console and submit the sitemap.",
  "Add GA4 and Cloudflare Web Analytics IDs in Cloudflare Pages environment variables.",
];
