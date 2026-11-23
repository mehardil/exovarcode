import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/site";
import { Counter } from "./Counter";
import { stats } from "../lib/site";

export function StatsRow() {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <div className="stat-value">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export function CTABand({
  title = "Tell us what you want to build.",
  text = "Send a short brief or start a WhatsApp conversation. We will reply with the next step, a realistic timeline, and a fixed price range.",
  primaryHref = "/book-meeting/",
  primaryLabel = "Book a discovery call",
  source = "cta_band",
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <p className="eyebrow" style={{ justifyContent: "center" }}>No pressure, no hard sell</p>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="btn-row">
            <Link
              href={primaryHref}
              className="btn btn-primary btn-lg"
              data-track="cta_book"
              data-track-location={source}
            >
              {primaryLabel}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl("Hi Sync-Oaks, I'd like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              data-track="cta_whatsapp"
              data-track-location={source}
            >
              <MessageCircle size={17} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
