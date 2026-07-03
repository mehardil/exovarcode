import React from "react";
import { useNavigate } from "react-router-dom";
import { SITE, phoneHref } from "../config/site";
import { Brand } from "./Brand";
import { Globe, Shield, Star } from "lucide-react";

export function Footer({ openBooking }) {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-grid wrap">
        {/* Brand + description */}
        <div>
          <Brand footer onClick={() => go("/")} />
          <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
            Enterprise-grade digital infrastructure — cloud architecture, web platforms,
            AI automation, and performance marketing for ambitious organisations.
          </p>

          {/* Trust badges */}
          <div className="footer-badges" style={{ marginTop: 20 }}>
            <span className="footer-badge">
              <Star size={11} style={{ color: "#CBD5E1" }} />
              <span className="badge-star" style={{ marginLeft: 2 }}>Clutch 5.0 Rated</span>
            </span>
            <span className="footer-badge">
              <Shield size={11} style={{ color: "#60A5FA" }} />
              <span className="badge-check" style={{ marginLeft: 2 }}>SOC 2 Aligned</span>
            </span>
          </div>

          {/* Presence */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            marginTop: 16, fontSize: 12, color: "var(--muted)",
          }}>
            <Globe size={12} style={{ color: "#E0BF7A" }} />
            Serving Clients Worldwide
          </div>
        </div>

        {/* Services */}
        <div>
          <h4>Services</h4>
          <button onClick={() => go("/services/web-development")}>Web Development</button>
          <button onClick={() => go("/services/seo-optimization")}>SEO Optimisation</button>
          <button onClick={() => go("/services/digital-marketing")}>Digital Marketing</button>
          <button onClick={() => go("/services/cloud-automation")}>Cloud &amp; Automation</button>
          <button onClick={() => go("/services")}>Data Engineering</button>
          <button onClick={() => go("/services")}>Private AI Models</button>
        </div>

        {/* Company */}
        <div>
          <h4>Company</h4>
          <button onClick={() => go("/portfolio")}>Portfolio</button>
          <button onClick={() => go("/work")}>Case Studies</button>
          <button onClick={() => go("/about")}>About &amp; Process</button>
          <button onClick={() => go("/contact")}>Contact</button>
          <button onClick={openBooking}>Book Discovery Call</button>
        </div>

        {/* Contact */}
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={phoneHref()}>{SITE.phone}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp Sales</a>
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Response time</p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, color: "#E0BF7A",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.20)",
              borderRadius: 100, padding: "4px 12px",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 6px #22C55E",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              &lt; 2 hours (business hours)
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom wrap">
        © 2026 {SITE.name}. All rights reserved.
        {" "}·{" "}
        <span style={{ color: "var(--muted)", fontSize: 13 }}>
          Enterprise Digital Agency · Global Delivery
        </span>
      </div>
    </footer>
  );
}
