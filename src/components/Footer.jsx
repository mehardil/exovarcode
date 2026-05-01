import React from "react";
import { useNavigate } from "react-router-dom";
import { SITE, phoneHref } from "../config/site";
import { Brand } from "./Brand";

export function Footer({ openBooking }) {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-grid wrap">
        <div>
          <Brand footer onClick={() => go("/")} />
          <p>Revenue-engineered digital assets — web development, SEO, cloud, and automation for ambitious businesses.</p>
        </div>
        <div>
          <h4>Services</h4>
          <button onClick={() => go("/services/web-development")}>Web Development</button>
          <button onClick={() => go("/services/seo-optimization")}>SEO Optimization</button>
          <button onClick={() => go("/services/digital-marketing")}>Digital Marketing</button>
          <button onClick={() => go("/services/cloud-automation")}>Cloud & Automation</button>
        </div>
        <div>
          <h4>Company</h4>
          <button onClick={() => go("/work")}>Case Studies</button>
          <button onClick={() => go("/about")}>About & Process</button>
          <button onClick={() => go("/contact")}>Contact</button>
          <button onClick={openBooking}>Book a Meeting</button>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={phoneHref()}>{SITE.phone}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp Sales</a>
        </div>
      </div>
      <div className="footer-bottom wrap">© 2026 {SITE.name}. All rights reserved. Islamabad, Pakistan — Serving clients worldwide.</div>
    </footer>
  );
}
