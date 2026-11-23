import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, ExternalLink, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Hero3D } from "../../components/Hero3D";
import { HeroFlair } from "../../components/HeroFlair";
import { LeadForm } from "../../components/LeadForm";
import { JsonLd } from "../../components/JsonLd";
import { Faq } from "../../components/Faq";
import { Reveal } from "../../components/Reveal";
import { CTABand } from "../../components/Sections";
import { buildMetadata, breadcrumbSchema, faqSchema } from "../../lib/seo";
import { SITE, whatsappUrl } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Contact Sync-Oaks | WhatsApp or Email",
  description:
    "Start a project with Sync-Oaks. Message on WhatsApp or send a short brief through the secure form. Replies come directly from the owner inbox.",
  path: "/contact/",
  image: "/og/contact.png",
  imageAlt: "Contact Sync-Oaks",
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Contact" }];

const contactFaqs = [
  {
    q: "How quickly will I hear back?",
    a: "WhatsApp messages are usually answered within a few business hours. Email briefs are answered within one business day. If your message arrives outside working hours, expect a reply the next business day.",
  },
  {
    q: "Do I need a full specification before contacting you?",
    a: "No. A sentence or two about the problem, your current site, and your timeline is enough to start. We will ask clarifying questions before quoting.",
  },
  {
    q: "Will my email address be shared?",
    a: "No. Your details are used only to reply to your inquiry. We do not add you to a newsletter or sell contact data.",
  },
  {
    q: "Can we sign an NDA?",
    a: "Yes. If you need an NDA before sharing details, say so in your first message and we will send a simple mutual NDA.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--contact">
        <HeroFlair variant="contact" label="Contact" />
        <Hero3D variant="ambient" />
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Two ways to reach the studio.</h1>
          <p className="lead">
            WhatsApp is fastest for a quick conversation. The short form below goes
            directly to the owner inbox with your reply-to address. No ticketing system,
            no sales sequence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-panel">
              <span className="tag">Option A</span>
              <h2 style={{ fontSize: "1.5rem", marginTop: "0.7rem" }}>Chat on WhatsApp</h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
                Best for a quick question or a same-day conversation. The link opens
                with a prefilled message.
              </p>
              <a
                href={whatsappUrl("Hi Sync-Oaks, I'd like to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-block btn-lg"
                data-track="cta_whatsapp"
                data-track-location="contact_page"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Open WhatsApp
              </a>

              <div style={{ borderTop: "1px solid var(--line)", margin: "1.5rem 0" }} />

              <span className="tag">Option B</span>
              <h2 style={{ fontSize: "1.5rem", marginTop: "0.7rem" }}>Send an email brief</h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
                Use the form on the right. It requires your name, email, and a short
                message; phone and service are optional.
              </p>

              <ul className="contact-list">
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span><small>Studio</small>{SITE.city}, {SITE.country} · serving clients worldwide</span>
                </li>
                <li>
                  <Clock3 size={16} aria-hidden="true" />
                  <span><small>Response time</small>Email: one business day · WhatsApp: a few business hours</span>
                </li>
                <li>
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>
                    <small>LinkedIn</small>
                    <a
                      href={SITE.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--gold-2)" }}
                    >
                      Connect on LinkedIn
                    </a>
                  </span>
                </li>
                <li>
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span><small>Privacy</small>Your details are used only to reply to your inquiry</span>
                </li>
              </ul>

              <div className="callout" style={{ marginTop: "1rem" }}>
                <strong>Prefer to book a call?</strong>{" "}
                <Link href="/book-meeting/" className="text-link">Use the booking page</Link>{" "}
                to pick the WhatsApp or email path and see what happens next.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <LeadForm
              source="contact_page"
              heading="Send a project brief"
              intro="Four short fields. The message goes directly to the owner inbox and is stored if email delivery fails."
            />
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="two-col">
            <Reveal>
              <p className="eyebrow">What happens next</p>
              <h2>No pressure, no automated sales sequence.</h2>
              <ul className="list-check" style={{ marginTop: "1rem" }}>
                <li><CheckCircle2 size={16} aria-hidden="true" />We read your message and reply with clarifying questions.</li>
                <li><CheckCircle2 size={16} aria-hidden="true" />If it is a fit, we propose a short call and a fixed scope.</li>
                <li><CheckCircle2 size={16} aria-hidden="true" />If it is not a fit, we tell you and suggest a better direction.</li>
              </ul>
              <div className="btn-row" style={{ marginTop: "1.4rem" }}>
                <Link href="/about/" className="btn btn-secondary">
                  About the studio
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/services/" className="btn btn-ghost">Explore services</Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow">Common questions</p>
              <Faq faqs={contactFaqs} />
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        source="contact_final"
        title="Not ready to write a brief?"
        text="Send a one-line WhatsApp message instead. We will ask the questions that matter and tell you whether a project makes sense."
        primaryHref="/book-meeting/"
        primaryLabel="See booking options"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema(breadcrumbs),
            faqSchema(contactFaqs),
            {
              "@type": "ContactPage",
              name: "Contact Sync-Oaks",
              url: "https://syncoaks.com/contact/",
              description: "Contact Sync-Oaks by WhatsApp or the project brief form.",
            },
          ],
        }}
      />
    </>
  );
}
