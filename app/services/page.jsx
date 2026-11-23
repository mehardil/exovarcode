import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MessageCircle } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { ServiceCard } from "../../components/ServiceCard";
import { ServiceIcon } from "../../components/ServiceIcon";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Hero3D } from "../../components/Hero3D";
import { HeroFlair } from "../../components/HeroFlair";
import { CTABand } from "../../components/Sections";
import { BookingSection } from "../../components/BookingSection";
import { JsonLd } from "../../components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "../../lib/seo";
import { services } from "../../lib/services";
import { processSteps, whatsappUrl } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Services | Web, SEO, Automation & Cloud | Sync-Oaks",
  description:
    "Six services built around one outcome: a fast, crawlable website and a lead system you can measure. Explore web development, SEO, automation, cloud, data and lead generation.",
  path: "/services/",
  image: "/og/services.png",
  imageAlt: "Sync-Oaks services",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Services" },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--services">
        <HeroFlair variant="services" label="Services" />
        <Hero3D variant="ambient" />
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1>Build the asset, then the system around it.</h1>
          <p className="lead">
            Most businesses do not need another vendor. They need a website that can be
            found, a clear path for leads, and the operational plumbing to handle them.
            Our services are designed to connect.
          </p>
          <div className="btn-row">
            <Link href="/book-meeting/" className="btn btn-primary btn-lg" data-track="cta_book" data-track-location="services_hero">
              Book a discovery call
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl("Hi Sync-Oaks, I'd like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              data-track="cta_whatsapp"
              data-track-location="services_hero"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <article className="card card-hover" style={{ height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                    <span className="card-icon" style={{ marginBottom: 0 }}>
                      <ServiceIcon name={service.icon} />
                    </span>
                    <span className="tag">{service.startingAt} · {service.timeline}</span>
                  </div>
                  <h2 style={{ fontSize: "1.35rem", marginTop: "0.7rem" }}>
                    <Link href={`/services/${service.slug}/`}>{service.name}</Link>
                  </h2>
                  <p style={{ color: "var(--gold-2)", fontSize: "0.86rem", fontWeight: 600, marginBottom: "0.7rem" }}>
                    {service.tagline}
                  </p>
                  <p>{service.intro}</p>
                  <ul className="feature-list">
                    {service.includes.slice(0, 4).map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={14} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}/`} className="arrow-link" style={{ marginTop: "1.2rem" }}>
                    Explore {service.shortName}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">How we work</p>
            <h2>The same four phases on every engagement.</h2>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal className="process-step" key={step.step} delay={index * 0.06}>
                <div className="step-num">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: "1.5rem", display: "flex", gap: 6, alignItems: "center" }}>
            <Clock3 size={13} aria-hidden="true" />
            Most marketing sites take 2–4 weeks. Custom products and automation usually run 6–12 weeks.
          </p>
        </div>
      </section>

      <BookingSection source="services" title="Not sure which service you need?" intro="Describe the problem in plain language. We will tell you what to fix first, even if that means a smaller project than you expected." />
      <CTABand source="services_final" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema(breadcrumbs),
            {
              "@type": "ItemList",
              name: "Sync-Oaks services",
              itemListElement: services.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: service.name,
                url: `${"https://syncoaks.com"}/services/${service.slug}/`,
              })),
            },
          ],
        }}
      />
    </>
  );
}
