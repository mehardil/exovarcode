import React from "react";
import { SITE, phoneHref } from "../config/site";
import { Brand } from "./Brand";

export function Footer({ go, openBooking }) {
  return (
    <footer>
      <div className="footer-grid wrap">
        <div>
          <Brand footer onClick={() => go("home")} />
          <p>Clean web design, full-stack development, SEO, automation, and cloud delivery.</p>
        </div>
        <div>
          <h4>Company</h4>
          <button onClick={() => go("services")}>Services</button>
          <button onClick={() => go("work")}>Work</button>
          <button onClick={() => go("contact")}>Contact</button>
          <button onClick={openBooking}>Book Meeting</button>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={phoneHref()}>{SITE.phone}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom wrap">© 2026 {SITE.name}. All rights reserved.</div>
    </footer>
  );
}
