import Link from "next/link";
import { ArrowRight, Globe2, MapPin, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { HeroFlair } from "../../components/HeroFlair";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { CTABand } from "../../components/Sections";
import { buildMetadata, breadcrumbSchema, webPageSchema } from "../../lib/seo";
import { locations } from "../../lib/locations";
import { SITE_URL, whatsappUrl } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Service Areas | USA, UK & UAE | Sync-Oaks",
  description:
    "Sync-Oaks builds fast websites, technical SEO and lead systems for businesses in the United States, United Kingdom and United Arab Emirates. Fixed-scope pricing in USD, GBP and AED.",
  path: "/locations/",
  image: "/og/default.png",
  imageAlt: "Sync-Oaks service areas: USA, UK and UAE",
  keywords: [
    "web development agency USA",
    "web development agency UK",
    "web development company UAE",
    "international web design agency",
  ],
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Service areas" }];

export default function LocationsPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--locations">
        <HeroFlair variant="locations" label="Regions" />
        <div className="container">
          <p className="eyebrow">Service areas</p>
          <h1>One senior studio. Three core markets.</h1>
          <p className="lead">
            We work remotely with businesses in the United States, United Kingdom and
            United Arab Emirates. Same craft, same fixed-scope process, with pricing and
            communication tuned to each market.
          </p>
          <div className="btn-row">
            <Link href="/book-meeting/" className="btn btn-primary btn-lg">
              Book a discovery call
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {locations.map((location, index) => (
              <Reveal key={location.slug} className="card" delay={index * 0.06}>
                <span className="card-icon"><Globe2 size={19} aria-hidden="true" /></span>
                <h3>{location.name}</h3>
                <p>{location.metaDescription}</p>
                <p className="badge-row" style={{ marginTop: "0.75rem" }}>
                  <span className="badge"><MapPin size={12} aria-hidden="true" />{location.region}</span>
                  <span className="badge">{location.currency}</span>
                </p>
                <Link href={`/locations/${location.slug}/`} className="arrow-link" style={{ marginTop: "1.1rem" }}>
                  See {location.shortName} services
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Remote-first, timezone-aware</p>
            <h2>A local feeling without a fake local office.</h2>
          </div>
          <div>
            <p>
              We do not claim addresses we do not have. What we do offer is senior work,
              an agreed overlap window, written weekly updates, and pricing in your
              currency. That is usually what actually matters once a project starts.
            </p>
            <p>
              If you are outside these three markets, we still work worldwide. The
              location pages simply collect the search and buying expectations that are
              specific to the US, UK and UAE.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which market page fits?"
        text="Tell us where your customers are. We will point you to the right services and a realistic starting range."
        source="locations_index"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema(breadcrumbs),
            webPageSchema({
              name: "Sync-Oaks service areas",
              description:
                "Web development, SEO and automation for businesses in the USA, UK and UAE.",
              path: "/locations/",
              primaryImage: "/og/default.png",
              about: "International web development and SEO",
            }),
            {
              "@type": "ItemList",
              name: "Sync-Oaks service areas",
              itemListElement: locations.map((location, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: location.name,
                url: `${SITE_URL}/locations/${location.slug}/`,
              })),
            },
          ],
        }}
      />
    </>
  );
}
