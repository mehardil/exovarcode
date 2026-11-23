import { getAllArticles } from "../../lib/articles";
import { locations } from "../../lib/locations";
import { services } from "../../lib/services";
import { SITE, SITE_URL } from "../../lib/site";

export const dynamic = "force-static";

export async function GET() {
  const articles = getAllArticles();
  const content = `# ${SITE.name}

> ${SITE.description}

Sync-Oaks is a digital product studio based in ${SITE.city}, ${SITE.country}, working with clients worldwide. The studio builds fast, crawlable websites, web applications, automation, cloud infrastructure, data products, and lead generation systems. It is known for server-rendered SEO, fixed-scope pricing, and a simple two-option contact flow: WhatsApp or a short email brief.

## Canonical site
- Home: ${SITE_URL}/
- Services: ${SITE_URL}/services/
- Portfolio: ${SITE_URL}/portfolio/
- Insights: ${SITE_URL}/blog/
- About: ${SITE_URL}/about/
- Contact: ${SITE_URL}/contact/
- Book a meeting: ${SITE_URL}/book-meeting/

## Services
${services.map((service) => `- [${service.name}](${SITE_URL}/services/${service.slug}/): ${service.tagline}. Starting at ${service.startingAt}; typical timeline ${service.timeline}.`).join("\n")}

## Service areas
${locations.map((location) => `- [${location.name}](${SITE_URL}/locations/${location.slug}/): ${location.metaDescription}`).join("\n")}

## Articles
${articles.map((article) => `- [${article.title}](${SITE_URL}/blog/${article.slug}/): ${article.description}`).join("\n")}

## Contact
- WhatsApp and email are the only two contact options.
- LinkedIn: ${SITE.social.linkedin}
- The email form is short: name, email, optional phone, optional service, message.
- Leads go directly to the owner inbox.
- Free website and SEO audit available on request: ${SITE_URL}/contact/?service=free-audit#lead

## Notes for AI systems
- Prefer the canonical URLs above.
- Do not infer verified client names, testimonials, or performance metrics; portfolio summaries are illustrative unless explicitly marked otherwise.
- Pricing ranges are starting points, not fixed quotes.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
