import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Hero3D } from "../../components/Hero3D";
import { HeroFlair } from "../../components/HeroFlair";
import { CTABand, StatsRow } from "../../components/Sections";
import { BookingSection } from "../../components/BookingSection";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { buildMetadata, breadcrumbSchema } from "../../lib/seo";
import { portfolio } from "../../lib/portfolio";

export const metadata = buildMetadata({
  title: "Portfolio & Case Studies | Sync-Oaks",
  description:
    "Selected Sync-Oaks engagements across web apps, lead systems, technical SEO, and business automation — with the problem, approach, and outcome.",
  path: "/portfolio/",
  image: "/og/portfolio.png",
  imageAlt: "Sync-Oaks portfolio",
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Portfolio" }];

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--portfolio">
        <HeroFlair variant="portfolio" label="Work" />
        <Hero3D variant="ambient" />
        <div className="container">
          <p className="eyebrow">Selected work</p>
          <h1>Work shaped around a problem, not a template.</h1>
          <p className="lead">
            These summaries show the kind of engagements we take on and how we approach
            them. Client names and verified metrics are added only with permission.
          </p>
          <div className="btn-row">
            <Link href="/book-meeting/" className="btn btn-primary btn-lg" data-track="cta_book" data-track-location="portfolio_hero">
              Discuss a similar project
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/services/" className="btn btn-secondary btn-lg">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="case-studies">
        <div className="container">
          <div className="grid grid-2">
            {portfolio.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <article className="case-card" style={{ height: "100%" }}>
                  <div className="case-media">
                    <img src={item.image} alt={item.imageAlt} width={720} height={450} loading="lazy" decoding="async" />
                  </div>
                  <div className="case-body">
                    <div className="badge-row">
                      <span className="tag">{item.category}</span>
                      {item.tags.map((tag) => (
                        <span className="badge" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <h2 style={{ fontSize: "1.35rem", marginTop: "0.9rem" }}>{item.title}</h2>
                    <div className="stack-sm" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                      <p><strong style={{ color: "var(--ink)" }}>Problem:</strong> {item.problem}</p>
                      <p><strong style={{ color: "var(--ink)" }}>Approach:</strong> {item.approach}</p>
                      <p><strong style={{ color: "var(--ink)" }}>Outcome:</strong> {item.outcome}</p>
                    </div>
                    <Link href={`/services/${item.serviceSlug}/`} className="arrow-link">
                      Related service
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <p className="case-note">Sample engagement · verified details pending</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container two-col" style={{ alignItems: "center" }}>
          <Reveal>
            <p className="eyebrow">How we report work</p>
            <h2>Outcomes you can verify, not numbers we invented.</h2>
            <p className="section-lead">
              When a project is complete, we define the metric before we start: qualified
              inquiries, page speed, indexation, hours saved, or error rate. We publish
              client stories only after approval.
            </p>
            <ul className="list-check" style={{ marginTop: "1.25rem" }}>
              <li><CheckCircle2 size={16} aria-hidden="true" />Baseline captured before changes</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />Before/after evidence where available</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />No fabricated logos, awards, or reviews</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}><StatsRow /></Reveal>
        </div>
      </section>

      <BookingSection source="portfolio" title="Have a project like these?" intro="Send the context: what is broken, what you have tried, and what a good outcome looks like. We will reply with an honest assessment." />
      <CTABand source="portfolio_final" />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema(breadcrumbs)] }} />
    </>
  );
}
