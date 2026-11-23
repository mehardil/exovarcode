import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, MessageCircle, Sparkles } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { BookingSection } from "../../../components/BookingSection";
import { Faq } from "../../../components/Faq";
import { JsonLd } from "../../../components/JsonLd";
import { Reveal } from "../../../components/Reveal";
import { ServiceIcon } from "../../../components/ServiceIcon";
import { CTABand } from "../../../components/Sections";
import { getArticle, articleHref } from "../../../lib/articles";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
} from "../../../lib/seo";
import { getService, services } from "../../../lib/services";
import { processSteps, whatsappUrl } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
    image: `/og/service-${service.slug}.png`,
    imageAlt: `${service.name} services by Sync-Oaks`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services/" },
    { name: service.name },
  ];
  const relatedArticles = (service.related || []).map((articleSlug) => getArticle(articleSlug)).filter(Boolean);
  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page">
        <div className="container">
          <div className="two-col">
            <div>
              <span className="card-icon" style={{ marginBottom: "1rem" }}>
                <ServiceIcon name={service.icon} size={22} />
              </span>
              <h1>{service.name}</h1>
              <p className="lead">{service.intro}</p>
              <div className="callout" style={{ marginBlock: "1.25rem" }}>
                <strong>Outcome:</strong> {service.outcome}
              </div>
              <div className="btn-row">
                <Link href="#lead" className="btn btn-primary btn-lg" data-track="cta_book" data-track-location={`service_${service.slug}`}>
                  Get a fixed quote
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a
                  href={whatsappUrl(`Hi Sync-Oaks, I'm interested in ${service.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  data-track="cta_whatsapp"
                  data-track-location={`service_${service.slug}`}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Ask on WhatsApp
                </a>
              </div>
              <div className="hero-proof">
                <span><CheckCircle2 size={14} aria-hidden="true" />Starting at {service.startingAt}</span>
                <span><Clock3 size={14} aria-hidden="true" />{service.timeline}</span>
                <span><Sparkles size={14} aria-hidden="true" />Fixed scope</span>
              </div>
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <img
                src={service.image}
                alt={service.imageAlt}
                width={720}
                height={480}
                loading="lazy" decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Who it is for</p>
            <h2>Built for the stage you are actually in.</h2>
            <p className="section-lead">{service.idealFor}</p>
            <div className="callout">
              <strong>Typical timeline:</strong> {service.timeline}. We confirm milestones
              and a fixed price after discovery.
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">What is included</p>
            <ul className="list-check">
              {service.includes.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Why it matters</p>
            <h2>What you get beyond the deliverable.</h2>
          </Reveal>
          <div className="grid grid-3">
            {service.benefits.map((benefit, index) => (
              <Reveal className="card" key={benefit.title} delay={index * 0.06}>
                <span className="card-icon">
                  <CheckCircle2 size={19} aria-hidden="true" />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Process</p>
            <h2>How this engagement runs.</h2>
          </Reveal>
          <div className="process-grid">
            {service.process.map((step, index) => (
              <Reveal className="process-step" key={step} delay={index * 0.06}>
                <div className="step-num">{String(index + 1).padStart(2, "0")}</div>
                <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", margin: 0 }}>{step}</p>
              </Reveal>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: "1.5rem" }}>
            The studio-wide process — Discover, Design, Build, Launch & Grow — applies here too.
            {" "}<Link href="/about/" className="text-link">Read how we work</Link>.
          </p>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="section section-border">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Further reading</p>
              <h2>Guides connected to this service.</h2>
            </Reveal>
            <div className="grid grid-3">
              {relatedArticles.map((article, index) => (
                <Reveal className="card card-hover" key={article.slug} delay={index * 0.05}>
                  <span className="tag">{article.category}</span>
                  <h3 style={{ marginTop: "0.8rem", fontSize: "1.05rem" }}>
                    <Link href={articleHref(article)}>{article.title}</Link>
                  </h3>
                  <p>{article.description}</p>
                  <Link href={articleHref(article)} className="arrow-link" style={{ marginTop: "1rem" }}>
                    Read guide
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>{service.name} questions, answered.</h2>
          </Reveal>
          <Faq faqs={service.faqs} />
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Related services</p>
            <h2>Often paired with.</h2>
          </Reveal>
          <div className="grid grid-3">
            {otherServices.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}/`} className="card card-hover service-card">
                <span className="card-icon"><ServiceIcon name={item.icon} /></span>
                <h3>{item.name}</h3>
                <p>{item.tagline}</p>
                <span className="arrow-link">Explore <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingSection
        source={`service_${service.slug}`}
        defaultService={service.slug}
        eyebrow="Start this service"
        title={`Tell us about your ${service.shortName.toLowerCase()} project.`}
        intro="Use WhatsApp for a quick conversation or send a short brief. We reply with scope options, a timeline, and a fixed price range."
      />

      <CTABand source={`service_${service.slug}_final`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            serviceSchema(service),
            breadcrumbSchema(breadcrumbs),
            faqSchema(service.faqs),
          ],
        }}
      />
    </>
  );
}
