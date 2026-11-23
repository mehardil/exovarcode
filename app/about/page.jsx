import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Handshake, Layers, Ruler } from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Hero3D } from "../../components/Hero3D";
import { HeroFlair } from "../../components/HeroFlair";
import { CTABand, StatsRow } from "../../components/Sections";
import { BookingSection } from "../../components/BookingSection";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { buildMetadata, breadcrumbSchema } from "../../lib/seo";
import { processSteps, SITE } from "../../lib/site";

export const metadata = buildMetadata({
  title: "About Sync-Oaks | A Small Senior Digital Product Studio",
  description:
    "Sync-Oaks is a digital product studio building fast websites, web apps, automation, and growth systems. Meet the principles and process behind the work.",
  path: "/about/",
  image: "/og/about.png",
  imageAlt: "About Sync-Oaks",
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "About" }];

const principles = [
  {
    icon: Compass,
    title: "Start with the decision",
    text: "A website exists to produce a next step: a call, a message, a signup, a purchase. We design backward from that decision instead of starting with decoration.",
  },
  {
    icon: Ruler,
    title: "Measure the boring things",
    text: "Load speed, indexability, form deliverability, and error rates are not glamorous. They are also what determines whether the visible work succeeds.",
  },
  {
    icon: Layers,
    title: "Build for the second year",
    text: "A launch is the beginning. We choose stacks and content workflows your team can maintain, and we document the parts that are easy to break.",
  },
  {
    icon: Handshake,
    title: "Say the uncomfortable thing",
    text: "If a cheaper fix will do, we say so. If a project is not a fit, we say that too. Trust is more valuable than one invoice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--about">
        <HeroFlair variant="about" label="Studio" />
        <Hero3D variant="ambient" />
        <div className="container">
          <p className="eyebrow">About Sync-Oaks</p>
          <h1>A small senior studio for businesses that need the whole system to work.</h1>
          <p className="lead">
            Sync-Oaks is a digital product studio based in {SITE.city}, {SITE.country},
            working with clients worldwide. We combine design, engineering, technical SEO,
            automation, and measurement in one team so the pieces do not fight each other.
          </p>
          <div className="btn-row">
            <Link href="/book-meeting/" className="btn btn-primary btn-lg" data-track="cta_book" data-track-location="about_hero">
              Talk to the studio
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/portfolio/" className="btn btn-secondary btn-lg">See selected work</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Why we exist</p>
            <h2>Most websites are built in pieces, then blamed as a whole.</h2>
            <div className="stack" style={{ color: "var(--muted)" }}>
              <p>
                A designer hands off to a developer. The developer hands off to an SEO
                consultant. The SEO consultant finds that the site is rendered entirely in
                the browser and cannot be crawled. The marketing team runs ads to a page
                nobody optimized. The owner is left wondering why the whole thing does not
                produce clients.
              </p>
              <p>
                Sync-Oaks exists to close those gaps. The people who scope the project also
                design, build, and verify it. Search, speed, lead capture, and analytics are
                part of the build, not an afterthought.
              </p>
              <p>
                We are deliberately small. That means fewer projects at once, direct access
                to the people doing the work, and a realistic answer when you ask what
                something will cost or how long it will take.
              </p>
            </div>
            <div className="callout" style={{ marginTop: "1.5rem" }}>
              We do not claim awards we have not won, logos we have not worked with, or
              statistics we cannot verify. If you need those, we are probably not the right
              studio.
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card">
              <p className="eyebrow">At a glance</p>
              <StatsRow />
              <div style={{ marginTop: "1.5rem" }}>
                <p className="muted" style={{ fontSize: "0.86rem" }}>
                  <strong style={{ color: "var(--ink)" }}>Focus:</strong> websites, web apps,
                  technical SEO, business automation, cloud, data, and lead systems.
                </p>
                <p className="muted" style={{ fontSize: "0.86rem" }}>
                  <strong style={{ color: "var(--ink)" }}>Working style:</strong> remote-first,
                  async updates, scheduled calls, fixed scope.
                </p>
                <p className="muted" style={{ fontSize: "0.86rem", marginBottom: 0 }}>
                  <strong style={{ color: "var(--ink)" }}>Clients:</strong> founders, service
                  businesses, and small product teams in the US, UK, UAE, Europe, Australia,
                  and Pakistan.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>Four rules we keep coming back to.</h2>
          </Reveal>
          <div className="grid grid-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Reveal className="card" key={principle.title} delay={index * 0.06}>
                  <span className="card-icon"><Icon size={19} aria-hidden="true" /></span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Process</p>
            <h2>Discover, design, build, launch and grow.</h2>
            <p className="section-lead">
              You always know what phase we are in, what is expected from you, and what
              happens next.
            </p>
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
        </div>
      </section>

      <section className="section section-border">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">The team</p>
            <h2>Direct access to the people doing the work.</h2>
            <p className="section-lead">
              We keep the core team small and bring in trusted specialists for specific
              needs, such as copywriting or a particular cloud platform. You always know
              who is working on your project.
            </p>
            <ul className="list-check">
              <li><CheckCircle2 size={16} aria-hidden="true" />No account manager relay race</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />Weekly written progress updates</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />Documentation and handover included</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card">
              <h3>Owner-supplied details</h3>
              <p>
                Team biographies, photos, and company registration details are intentionally
                not published until the owner confirms them. This avoids fabricated
                credentials and keeps the page honest.
              </p>
              <p className="form-note" style={{ marginBottom: 0 }}>
                TODO for owner: add approved team names, roles, and photos here.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingSection source="about" title="Want to see if we are a fit?" intro="A short conversation is usually enough to tell. Bring the problem, the constraints, and the budget range you have in mind." />
      <CTABand source="about_final" />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema(breadcrumbs)] }} />
    </>
  );
}
