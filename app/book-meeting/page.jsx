import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MessageCircle, PhoneCall } from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { HeroFlair } from "../../components/HeroFlair";
import { BookingSection } from "../../components/BookingSection";
import { Faq } from "../../components/Faq";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { buildMetadata, breadcrumbSchema, faqSchema } from "../../lib/seo";
import { SITE, whatsappUrl } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Book a Meeting | Sync-Oaks",
  description:
    "Book a discovery call with Sync-Oaks. Choose WhatsApp or send a short email brief. No long booking form, no calendar maze.",
  path: "/book-meeting/",
  image: "/og/book-meeting.png",
  imageAlt: "Book a call with Sync-Oaks",
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Book a meeting" }];

const bookingFaqs = [
  {
    q: "How do I actually book a time?",
    a: "Choose WhatsApp or send the email brief. We reply with a few available slots in your time zone and send a calendar invite for the agreed time. We do not use an embedded calendar widget that collects extra data.",
  },
  {
    q: "What should I prepare for the call?",
    a: "Bring the problem you want solved, your current website if you have one, a rough budget range, and any hard deadlines. You do not need a finished specification.",
  },
  {
    q: "How long is the call?",
    a: "Most discovery calls run 20–30 minutes. If the project is complex, we may suggest a second working session after we have reviewed your current site.",
  },
  {
    q: "Is the call free?",
    a: "Yes. The initial discovery call is free and does not commit you to a project. If we are not a fit, we will say so and point you in a better direction.",
  },
  {
    q: "Can we meet on Zoom or Google Meet?",
    a: "Yes. Once we agree on a time, we send a meeting link on your preferred platform. The booking step here is intentionally simple: choose a contact path and we handle the calendar details by reply.",
  },
];

export default function BookMeetingPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--booking">
        <HeroFlair variant="booking" label="Book" />
        <div className="container">
          <p className="eyebrow">Book a meeting</p>
          <h1>One conversation. Two simple ways to start it.</h1>
          <p className="lead">
            We removed the long scheduling form. Choose WhatsApp for a quick reply or
            send a short email brief. We will propose times and send the calendar invite.
          </p>
          <div className="btn-row">
            <a
              href={whatsappUrl("Hi Sync-Oaks, I'd like to book a discovery call.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              data-track="cta_whatsapp"
              data-track-location="book_hero"
            >
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp the studio
            </a>
            <Link href="#lead" className="btn btn-primary btn-lg">
              Send an email brief
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-proof">
            <span><Clock3 size={14} aria-hidden="true" />Replies within one business day</span>
            <span><PhoneCall size={14} aria-hidden="true" />20–30 minute call</span>
            <span><CheckCircle2 size={14} aria-hidden="true" />Free, no obligation</span>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="grid grid-3">
            {[
              ["01", "Send your context", "Use WhatsApp or the short form. Tell us what is broken, what you have tried, and your rough timeline."],
              ["02", "We reply with options", "We ask a few clarifying questions, then propose call times and a scope direction."],
              ["03", "You get a fixed proposal", "After the call, we send a written scope, price, and milestone plan. No obligation to proceed."],
            ].map(([n, title, text], index) => (
              <Reveal className="card" key={n} delay={index * 0.06}>
                <div className="step-num" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--gold-2)", fontWeight: 700 }}>{n}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingSection
        source="book_meeting"
        eyebrow="Choose a path"
        title="WhatsApp or email. That is the whole form."
        intro="Both paths reach the owner inbox. We reply with available times in your time zone and a short agenda before the call."
      />

      <section className="section section-border">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Before the call</p>
            <h2>A little context makes the call much more useful.</h2>
            <ul className="list-check" style={{ marginTop: "1rem" }}>
              <li><CheckCircle2 size={16} aria-hidden="true" />The main problem you want solved</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />Your current website or product, if any</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />A budget range, even if it is wide</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />Any fixed deadline or launch event</li>
              <li><CheckCircle2 size={16} aria-hidden="true" />Who needs to approve the final decision</li>
            </ul>
            <p className="form-note" style={{ marginTop: "1rem" }}>
              You do not need a deck, a specification, or a finished brief. Plain language is fine.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Booking questions</p>
            <Faq faqs={bookingFaqs} />
          </Reveal>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="callout">
            <strong>Need to reach us another way?</strong> The studio is based in {SITE.city},{" "}
            {SITE.country}. Use the <Link href="/contact/" className="text-link">contact page</Link>{" "}
            for the full options and response-time details.
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema(breadcrumbs),
            faqSchema(bookingFaqs),
            {
              "@type": "ContactPage",
              name: "Book a meeting with Sync-Oaks",
              url: "https://syncoaks.com/book-meeting/",
            },
          ],
        }}
      />
    </>
  );
}
