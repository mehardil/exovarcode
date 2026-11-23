import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, Globe2, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { HeroFlair } from "../../../components/HeroFlair";
import { Faq } from "../../../components/Faq";
import { JsonLd } from "../../../components/JsonLd";
import { Reveal } from "../../../components/Reveal";
import { ServiceIcon } from "../../../components/ServiceIcon";
import { CTABand } from "../../../components/Sections";
import { articleHref, getArticle } from "../../../lib/articles";
import { getLocation, locations } from "../../../lib/locations";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  locationServiceSchema,
  webPageSchema,
} from "../../../lib/seo";
import { getService } from "../../../lib/services";
import { whatsappUrl } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}/`,
    image: location.image,
    imageAlt: `Sync-Oaks services for businesses in the ${location.name}`,
    keywords: location.keywords,
    locale: location.locale,
    languages: {
      [location.hreflang]: absoluteUrl(`/locations/${location.slug}/`),
      "x-default": absoluteUrl("/"),
    },
  });
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Service areas", href: "/locations/" },
    { name: location.name },
  ];
  const relatedServices = location.serviceSlugs.map((serviceSlug) => getService(serviceSlug)).filter(Boolean);
  const relatedArticles = location.relatedArticles
    .map((articleSlug) => getArticle(articleSlug))
    .filter(Boolean);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--locations">
        <HeroFlair variant="locations" label={location.shortName} />
        <div className="container">
          <p className="eyebrow">
            <MapPin size={13} aria-hidden="true" /> {location.region} · {location.name}
          </p>
          <h1>{location.h1}</h1>
          <p className="lead">{location.intro}</p>
          <div className="btn-row">
            <Link href="/book-meeting/" className="btn btn-primary btn-lg" data-track="cta_book" data-track-location={`location_${location.slug}`}>
              Book a discovery call
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl(`Hi Sync-Oaks, I'm looking for a website project in the ${location.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              data-track="cta_whatsapp"
              data-track-location={`location_${location.slug}`}
            >
              <MessageCircle size={17} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
          <div className="hero-proof">
            <span><CheckCircle2 size={14} aria-hidden="true" />Quotes in {location.currency}</span>
            <span><Clock3 size={14} aria-hidden="true" />{location.timezone} overlap</span>
            <span><ShieldCheck size={14} aria-hidden="true" />Accessibility &amp; privacy-aware</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why {location.shortName} teams hire us</p>
            <h2>Built around how buyers in {location.name} actually decide.</h2>
            <p className="section-lead">{location.introNote}</p>
          </div>
          <div className="grid grid-2">
            {location.focusPoints.map((point, index) => (
              <Reveal className="card" key={point.title} delay={index * 0.05}>
                <span className="card-icon"><Globe2 size={19} aria-hidden="true" /></span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2>What we build for {location.name} businesses.</h2>
            <p className="section-lead">
              Start with the problem you have. We will tell you whether the answer is a new
              site, a fix to the one you own, or the system behind it.
            </p>
          </div>
          <div className="grid grid-2">
            {relatedServices.map((service, index) => (
              <Reveal className="card card-hover" key={service.slug} delay={index * 0.05}>
                <span className="card-icon"><ServiceIcon name={service.icon} size={20} /></span>
                <h3>{service.name}</h3>
                <p>{service.intro}</p>
                <Link href={`/services/${service.slug}/`} className="arrow-link" style={{ marginTop: "1rem" }}>
                  Explore {service.shortName}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Starting points</p>
            <h2>Indicative {location.currency} ranges.</h2>
            <p className="section-lead">
              Every project is scoped individually. These starting points help you judge
              fit before a call. No hourly surprises and no hidden platform fees.
            </p>
          </div>
          <div className="grid grid-3">
            {location.pricing.map((tier, index) => (
              <Reveal className="card" key={tier.name} delay={index * 0.05}>
                <h3>{tier.name}</h3>
                <p style={{ marginBottom: "0.2rem" }}>
                  <span className="stat-value" style={{ fontSize: "2rem" }}>{tier.price}</span>
                  <span className="muted" style={{ fontSize: "0.8rem" }}> starting from</span>
                </p>
                <p>{tier.note}</p>
                <Link href="/contact/" className="arrow-link" style={{ marginTop: "1.1rem" }}>
                  Request a quote
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
            <p className="eyebrow">Working together</p>
            <h2>How we run projects for {location.name} teams.</h2>
            <p>{location.workingHours}</p>
            <p>{location.compliance}</p>
            <p className="badge-row" style={{ marginTop: "1rem" }}>
              {location.cities.map((city) => (
                <span className="badge" key={city}>
                  <MapPin size={12} aria-hidden="true" />{city}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className="eyebrow">Related reading</p>
            <h3>Guides for {location.shortName} buyers.</h3>
            <ul className="feature-list">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <ArrowRight size={14} aria-hidden="true" />
                  <Link href={articleHref(article)}>{article.title}</Link>
                </li>
              ))}
            </ul>
            <Link href="/blog/" className="arrow-link" style={{ marginTop: "1rem" }}>
              Browse all guides
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Questions</p>
            <h2>{location.name} questions, answered plainly.</h2>
            <p className="section-lead">
              Still unsure about fit, timezone, or pricing? Send a short message and we
              will answer directly, even if the answer is that we are not the right studio.
            </p>
            <div className="btn-row" style={{ marginTop: "1.2rem" }}>
              <Link href="/contact/" className="btn btn-secondary">
                Ask a question
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Faq faqs={location.faqs} />
        </div>
      </section>

      <CTABand
        title={`Ready to talk about a ${location.shortName} project?`}
        text={`Tell us what you are building. We will reply with the next step, a realistic timeline, and a fixed ${location.currency} range.`}
        source={`location_${location.slug}_final`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema(breadcrumbs),
            webPageSchema({
              name: location.metaTitle,
              description: location.metaDescription,
              path: `/locations/${location.slug}/`,
              primaryImage: location.image,
              about: `Web development and SEO for businesses in the ${location.name}`,
            }),
            locationServiceSchema(location),
            faqSchema(location.faqs),
          ],
        }}
      />
    </>
  );
}
