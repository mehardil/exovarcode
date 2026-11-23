import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HeroFlair } from "../components/HeroFlair";
import { whatsappUrl } from "../lib/site";

export const metadata = {
  title: "Page not found | Sync-Oaks",
  description: "That page does not exist. Find services, insights, or start a project with Sync-Oaks.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="hero-page hero-page--notfound" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <HeroFlair variant="notfound" label="404" />
      <div className="container-narrow">
        <p className="eyebrow">404 · Wrong turn</p>
        <h1>This page is not here.</h1>
        <p className="lead">
          The link may be old, or the page may have moved. The useful stuff is one click away.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn-primary btn-lg">
            Back to home
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/services/" className="btn btn-secondary btn-lg">Browse services</Link>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
            <MessageCircle size={16} aria-hidden="true" />
            Ask us
          </a>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Looking for something specific? Try the <Link href="/blog/" className="text-link">insights archive</Link> or{" "}
          <Link href="/contact/" className="text-link">send a message</Link>.
        </p>
      </div>
    </section>
  );
}
