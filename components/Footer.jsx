import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { SITE, whatsappUrl } from "../lib/site";
import { locations } from "../lib/locations";
import { services } from "../lib/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Sync-Oaks home">
            <img src="/sync-oaks-logo-web-hq.svg" alt="" width={150} height={38} loading="lazy" decoding="async" />
          </Link>
          <p>
            A digital product studio building fast websites, web apps, automation,
            cloud infrastructure, data products, and lead systems for growing businesses.
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16 }}>
            <MapPin size={13} style={{ color: "var(--gold-2)", flex: "none" }} aria-hidden="true" />
            {SITE.city}, {SITE.country} · Serving clients worldwide
          </p>
          <div className="btn-row" style={{ marginTop: 18 }}>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              data-track="cta_whatsapp"
              data-track-location="footer"
            >
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp
            </a>
            <Link href="/contact/" className="btn btn-secondary btn-sm">
              Contact
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about/">About &amp; process</Link></li>
            <li><Link href="/portfolio/">Work</Link></li>
            <li><Link href="/blog/">Insights</Link></li>
            <li><Link href="/locations/">Service areas</Link></li>
            <li><Link href="/book-meeting/">Book a call</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link href="/blog/how-much-does-a-custom-website-cost/">Website cost guide</Link></li>
            <li><Link href="/blog/technical-seo-checklist/">Technical SEO checklist</Link></li>
            <li><Link href="/blog/core-web-vitals-2026/">Core Web Vitals guide</Link></li>
            <li><Link href="/services/lead-generation-systems/">Free website audit</Link></li>
            {locations.map((location) => (
              <li key={location.slug}>
                <Link href={`/locations/${location.slug}/`}>
                  Web &amp; SEO in the {location.shortName}
                </Link>
              </li>
            ))}
            <li><Link href="/privacy/">Privacy</Link></li>
            <li><Link href="/terms/">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {SITE.name}. All rights reserved.</span>
        <nav aria-label="Legal and social">
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
          <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </div>
    </footer>
  );
}
