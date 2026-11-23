import Link from "next/link";
import { preload } from "react-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Hero3D } from "../components/Hero3D";
import { HeroVisual } from "../components/HeroVisual";
import { Reveal } from "../components/Reveal";
import { ServiceCard } from "../components/ServiceCard";
import { CTABand } from "../components/Sections";
import { PostCard } from "../components/PostCard";
import { BookingSection } from "../components/BookingSection";
import { Faq } from "../components/Faq";
import { JsonLd } from "../components/JsonLd";
import { buildMetadata, faqSchema } from "../lib/seo";
import {
  differentiators,
  homeFaqs,
  processSteps,
} from "../lib/site";
import { services } from "../lib/services";
import { portfolio } from "../lib/portfolio";
import { getAllArticles } from "../lib/articles";

export const metadata = buildMetadata({
  title: "Sync-Oaks | Websites, Apps & Automation That Win Clients",
  description:
    "Sync-Oaks builds fast websites, web apps, automation and lead systems. Server-rendered SEO, fixed-scope pricing, and a simple WhatsApp or email start.",
  path: "/",
  image: "/og/home.png",
  imageAlt: "Sync-Oaks digital product studio",
});

const pricingSignals = [
  {
    name: "Launch site",
    price: "$1,500",
    text: "The pages you need to sell, built on a fast static stack. No filler pages, no page-builder bloat.",
    features: ["Up to 6 core pages", "Custom mobile-first design", "Lead form + WhatsApp", "SEO and analytics setup"],
    href: "/services/web-development/",
  },
  {
    name: "Growth system",
    price: "$3,000",
    text: "Website, content structure, lead capture, tracking, and technical SEO built as one system.",
    features: ["Multi-page site or landing system", "Technical SEO foundation", "Conversion tracking + UTMs", "CRM or email routing"],
    href: "/services/lead-generation-systems/",
    featured: true,
  },
  {
    name: "Custom product",
    price: "$5,000",
    text: "Apps, automation, data products, and cloud setup scoped around an operating problem.",
    features: ["Discovery and architecture", "Custom UI and integrations", "Deployment and monitoring", "Documentation and handover"],
    href: "/services/",
  },
];

const marqueeItems = [
  "Next.js",
  "Technical SEO",
  "Core Web Vitals",
  "Business automation",
  "Cloud infrastructure",
  "Lead systems",
  "Data pipelines",
  "Conversion design",
];

export default function HomePage() {
  preload("/images/hero-services.webp", { as: "image", fetchPriority: "high" });
  const articles = getAllArticles().slice(0, 3);
  const marquee = [...marqueeItems, ...marqueeItems];

  return (
    <>
      <section className="hero hero-enterprise">
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-blur hero-blur-a" />
          <span className="hero-blur hero-blur-b" />
          <span className="hero-blur hero-blur-c" />
        </div>
        <Hero3D />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              Independent studio · Websites, apps, automation
            </p>
            <h1 className="hero-title">
              <span className="line">Less brochure.</span>
              <span className="line">
                More <span className="text-gold">pipeline.</span>
              </span>
            </h1>
            <p className="hero-sub">
              We are a small studio that designs the page, engineers the speed, and wires the
              follow-up &mdash; so your site stops sitting there and starts producing
              <strong> conversations</strong>.
            </p>
            <div className="btn-row">
              <Link
                href="/book-meeting/"
                className="btn btn-primary btn-lg"
                data-track="cta_book"
                data-track-location="hero"
              >
                Book a 20-minute call
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio/"
                className="btn btn-secondary btn-lg"
                data-track="cta_work"
                data-track-location="hero"
              >
                See the work
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-badges">
              <span className="hero-badge"><CheckCircle2 size={14} aria-hidden="true" />Fixed scope, fixed price</span>
              <span className="hero-badge"><ShieldCheck size={14} aria-hidden="true" />You own the code</span>
              <span className="hero-badge"><Zap size={14} aria-hidden="true" />Search + speed built in</span>
            </div>
            <div className="hero-trust">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span>
                <strong>Since 2021</strong> · 150+ projects · working worldwide
              </span>
            </div>
          </div>

          <HeroVisual />
        </div>
        <a href="#pitch" className="hero-scroll-cue" aria-label="Scroll to content">
          <span aria-hidden="true" />
        </a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marquee.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="section" id="pitch">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The honest pitch</p>
            <h2>A good website is not a design project. It is a sales asset.</h2>
            <p className="section-lead">
              Most sites are judged on how they look in a portfolio. Yours should be
              judged on whether it loads before someone leaves, shows up when they search,
              and makes the next step obvious.
            </p>
          </div>

          <div className="bento">
            <Reveal className="bento-card bento-media">
              <img
                src="/images/case-saas.webp"
                alt="Custom operations dashboard interface built by Sync-Oaks"
                width={940}
                height={627}
                loading="lazy" decoding="async"
              />
              <div className="bento-overlay">
                <span className="tag">Selected build</span>
                <h3>Software that replaces the spreadsheet</h3>
                <p>
                  Role-based dashboards, real data, fewer manual handoffs. The kind of
                  build that pays for itself in saved hours, not applause.
                </p>
                <Link href="/portfolio/" className="arrow-link" style={{ marginTop: "0.9rem" }}>
                  See the work
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal className="bento-card bento-stat" delay={0.05}>
              <div className="big">150+</div>
              <p style={{ marginTop: "0.5rem" }}>
                projects delivered by a small senior team since 2021. No junior handoff,
                no account-manager relay race.
              </p>
              <div className="badge-row" style={{ marginTop: "0.9rem" }}>
                <span className="badge"><ShieldCheck size={13} aria-hidden="true" />Fixed scope</span>
                <span className="badge"><Clock3 size={13} aria-hidden="true" />Weekly updates</span>
              </div>
            </Reveal>

            <Reveal className="bento-card bento-quote" delay={0.1}>
              <blockquote>
                “If it does not help someone decide, it does not belong on the page.”
              </blockquote>
              <cite>Studio rule 01</cite>
            </Reveal>

            <Reveal className="bento-card bento-cta" delay={0.12}>
              <div>
                <h3>Want a second opinion first?</h3>
                <p>A short written audit of your site, with three fixes ranked by impact.</p>
              </div>
              <Link href="/contact/?service=free-audit#lead" className="btn btn-secondary">
                Request the free audit
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-border" id="services">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2>Six ways to make the website do its job.</h2>
            <p className="section-lead">
              Start with the problem you have. We will tell you whether the answer is a new
              site, a fix to the one you own, or the system behind it.
            </p>
          </div>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-row">
            <Reveal className="split-media">
              <span className="tag">Search foundations</span>
              <img
                src="/images/service-seo.webp"
                alt="Search analytics visual representing technical SEO work"
                width={940}
                height={627}
                loading="lazy" decoding="async"
              />
            </Reveal>
            <Reveal className="split-copy" delay={0.08}>
              <p className="eyebrow">Built to be found</p>
              <h2>Search is structural. It cannot be bolted on at the end.</h2>
              <p>
                A client-rendered page can look perfect in a browser and still show
                crawlers an empty shell. We fix that in the architecture: real HTML for
                every route, one clear H1, unique metadata, canonical URLs, structured data,
                and an internal link graph that makes sense.
              </p>
              <ul className="list-check" style={{ marginTop: "1rem" }}>
                <li><CheckCircle2 size={16} aria-hidden="true" />Crawlable HTML on every public route</li>
                <li><CheckCircle2 size={16} aria-hidden="true" />Metadata and schema written per page</li>
                <li><CheckCircle2 size={16} aria-hidden="true" />Content clusters, not keyword soup</li>
              </ul>
              <Link href="/services/seo/" className="arrow-link" style={{ marginTop: "1.2rem" }}>
                See technical SEO
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="split-row reverse">
            <Reveal className="split-media">
              <span className="tag">Conversion</span>
              <img
                src="/images/case-marketing.webp"
                alt="Analytics dashboard visual representing lead tracking"
                width={940}
                height={627}
                loading="lazy" decoding="async"
              />
            </Reveal>
            <Reveal className="split-copy" delay={0.08}>
              <p className="eyebrow">Built to convert</p>
              <h2>One clear next step beats five competing buttons.</h2>
              <p>
                Some buyers want to chat now. Others want to write a brief. That is why
                every page gives them exactly two paths: WhatsApp or a short email form.
                Both reach the owner inbox, both are tracked, and neither requires a
                twelve-field questionnaire.
              </p>
              <ul className="list-check" style={{ marginTop: "1rem" }}>
                <li><CheckCircle2 size={16} aria-hidden="true" />Two CTAs, both measured</li>
                <li><CheckCircle2 size={16} aria-hidden="true" />UTM capture on every lead</li>
                <li><CheckCircle2 size={16} aria-hidden="true" />Stored leads if email delivery fails</li>
              </ul>
              <Link href="/services/lead-generation-systems/" className="arrow-link" style={{ marginTop: "1.2rem" }}>
                See lead systems
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>A short, visible process. No black boxes.</h2>
            <p className="section-lead">
              We agree on scope, price, and milestones before work starts. You see real
              pages and working software early, not a surprise at the end.
            </p>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal className="process-step" key={step.step} delay={index * 0.07}>
                <div className="step-num">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="image-band">
        <img
          src="/images/service-cloud.webp"
          alt=""
          width={1402}
          height={1122}
          loading="lazy" decoding="async"
          aria-hidden="true"
        />
        <div className="container image-band-inner">
          <p className="eyebrow">The second year matters more</p>
          <h2>We build the thing your team can still run when we are gone.</h2>
          <p>
            Documentation, a content workflow, and code you own. A launch is not the
            finish line; it is the point where the asset starts working.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2>Engagements with a job to do.</h2>
            <p className="section-lead">
              These are illustrative summaries. Client names and verified metrics are added
              only with permission.
            </p>
          </div>
          <div className="grid grid-2">
            {portfolio.slice(0, 3).map((item, index) => (
              <Reveal
                key={item.slug}
                className={index === 0 ? "case-featured" : ""}
                delay={index * 0.06}
              >
                <article className="case-card">
                  <div className="case-media">
                    <img src={item.image} alt={item.imageAlt} width={940} height={627} loading="lazy" decoding="async" />
                  </div>
                  <div className="case-body">
                    <span className="tag">{item.category}</span>
                    <h3 style={{ marginTop: "0.8rem" }}>{item.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{item.problem}</p>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                      <strong style={{ color: "var(--ink)" }}>Outcome:</strong> {item.outcome}
                    </p>
                    <Link href="/portfolio/" className="arrow-link">
                      Read the summary
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
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why Sync-Oaks</p>
            <h2>What is actually different here.</h2>
          </div>
          <div className="grid grid-2">
            {differentiators.map((item, index) => (
              <Reveal className="card" key={item.title} delay={index * 0.05}>
                <span className="card-icon">
                  <Sparkles size={19} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Starting points</p>
            <h2>Clear ranges. A fixed price after discovery.</h2>
            <p className="section-lead">
              Every project is scoped individually. These starting points help you judge
              fit before a call. No hourly surprises, no hidden platform fees.
            </p>
          </div>
          <div className="grid grid-3">
            {pricingSignals.map((tier, index) => (
              <Reveal
                key={tier.name}
                className="card"
                delay={index * 0.06}
                style={tier.featured ? { borderColor: "var(--gold)" } : undefined}
              >
                {tier.featured ? <span className="tag" style={{ marginBottom: "0.8rem" }}>Most requested</span> : null}
                <h3>{tier.name}</h3>
                <p style={{ marginBottom: "0.2rem" }}>
                  <span className="stat-value" style={{ fontSize: "2rem" }}>{tier.price}</span>
                  <span className="muted" style={{ fontSize: "0.8rem" }}> starting from</span>
                </p>
                <p>{tier.text}</p>
                <ul className="feature-list">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className="arrow-link" style={{ marginTop: "1.2rem" }}>
                  See what is included
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="callout" delay={0.1}>
            <strong>Not ready to buy?</strong>{" "}
            <Link href="/contact/?service=free-audit#lead" className="text-link">
              Request a free website and SEO audit
            </Link>{" "}
            — a short written review with three prioritized fixes. No obligation.
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="eyebrow">Questions</p>
              <h2>Answers before you get on a call.</h2>
              <p className="section-lead">
                Still unsure about scope, stack, or timeline? Send a message. We answer
                plainly, even when the answer is that we are not the right fit.
              </p>
              <div className="btn-row" style={{ marginTop: "1.25rem" }}>
                <Link href="/contact/" className="btn btn-secondary">
                  Ask a question
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <span className="badge"><Clock3 size={13} aria-hidden="true" />Replies within one business day</span>
              </div>
            </div>
            <Faq faqs={homeFaqs} />
          </div>
        </div>
      </section>

      {articles.length > 0 ? (
      <section className="section" id="pitch">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Notes from the build</p>
              <h2>Practical guides, not recycled listicles.</h2>
              <p className="section-lead">
                The frameworks we actually use on projects: pricing, stack choices,
                technical SEO, Core Web Vitals, and conversion.
              </p>
            </div>
            <div className="grid grid-3">
              {articles.map((article, index) => (
                <Reveal key={article.slug} delay={index * 0.06}>
                  <PostCard article={article} />
                </Reveal>
              ))}
            </div>
            <div className="btn-row" style={{ marginTop: "2rem" }}>
              <Link href="/blog/" className="btn btn-secondary">
                Browse all articles
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <BookingSection source="home" />

      <CTABand source="home_final" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [faqSchema(homeFaqs)],
        }}
      />
    </>
  );
}
