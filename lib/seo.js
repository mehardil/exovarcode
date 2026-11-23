import { MARKETS, SITE, SITE_URL } from "./site";

export function absoluteUrl(pathname = "/") {
  if (!pathname) return SITE_URL + "/";
  if (pathname.startsWith("http")) return pathname;
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(withSlash, SITE_URL + "/").href;
}

export function areaServedSchema() {
  return MARKETS.map((market) => ({
    "@type": "Country",
    name: market.name,
  }));
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og/default.png",
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  canonical,
  noindex = false,
  locale = "en_US",
  languages,
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonical || url,
      ...(languages ? { languages } : {}),
    },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt || title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function readingSchemaTypes() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  };
}

export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/sync-oaks-logo-web-hq.png"),
    image: absoluteUrl("/og/default.png"),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.countryCode,
    },
    areaServed: areaServedSchema(),
    sameAs: [SITE.social.linkedin],
    knowsAbout: [
      "Web development",
      "Next.js",
      "Technical SEO",
      "Business process automation",
      "Cloud infrastructure",
      "Data analytics",
      "Lead generation",
    ],
    knowsLanguage: ["en", "ur"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: ["English", "Urdu"],
      areaServed: areaServedSchema(),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}/`),
    image: absoluteUrl(`/og/service-${service.slug}.png`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: areaServedSchema(),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: `Projects start at ${service.startingAt}. Final pricing is scoped after discovery.`,
    },
  };
}

export function faqSchema(faqs = []) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function articleSchema(article) {
  return {
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${article.slug}/#article`),
    headline: article.title,
    description: article.description,
    url: absoluteUrl(`/blog/${article.slug}/`),
    image: absoluteUrl(article.ogImage || `/og/article-${article.slug}.png`),
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      "@type": "Person",
      name: article.author || "Sync-Oaks",
      url: absoluteUrl("/about/"),
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${article.slug}/`) },
    keywords: [article.focusKeyword, ...(article.tags || [])].filter(Boolean).join(", "),
    articleSection: article.category,
    wordCount: article.wordCount,
    inLanguage: "en",
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    name: "Sync-Oaks",
    url: absoluteUrl("/about/"),
    worksFor: { "@id": `${SITE_URL}/#organization` },
    description: "The Sync-Oaks digital product studio team.",
  };
}

export function locationServiceSchema(location) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/locations/${location.slug}/#service`),
    name: `Web development, SEO and automation for businesses in the ${location.name}`,
    serviceType: "Web development, technical SEO and business automation",
    description: location.metaDescription,
    url: absoluteUrl(`/locations/${location.slug}/`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: location.name },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small and mid-sized businesses",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: location.currency,
      description: `Projects are quoted in ${location.currency} with a fixed scope after discovery.`,
    },
  };
}

export function webPageSchema({ name, description, path, primaryImage, about }) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: primaryImage ? { "@type": "ImageObject", url: absoluteUrl(primaryImage) } : undefined,
    about: about ? { "@type": "Thing", name: about } : undefined,
    inLanguage: "en",
  };
}
