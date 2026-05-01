import React from "react";
import { SITE } from "../config/site";
import { services } from "../data/content";
import { SectionIntro } from "../components/SectionIntro";

export function Home({ go, openBooking, chooseService }) {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Digital product studio for modern businesses</p>
          <h1>Build a sharper digital business with XoCODE.</h1>
          <p>
            We design and develop full-stack products, SEO foundations, cloud setups, lead systems,
            and business automation with a practical, launch-ready process.
          </p>
          <div className="actions">
            <button className="primary" onClick={() => go("services")}>Explore Services</button>
            <button className="secondary" onClick={openBooking}>Book Free Consultation</button>
          </div>
          <div className="metrics">
            <span><strong>150+</strong> projects</span>
            <span><strong>98%</strong> satisfaction</span>
            <span><strong>24/7</strong> support</span>
          </div>
          <div className="hero-proof">
            <div>
              <span>01</span>
              <strong>Plan</strong>
              <p>Scope, stack, timeline, and launch path.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Build</strong>
              <p>Clean React interfaces and scalable systems.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Grow</strong>
              <p>SEO, automation, analytics, and support.</p>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro label="What We Build" title="Every section has the right image, message, and action." />
      <section className="service-grid wrap">
        {services.map((service) => (
          <button className="service-card" key={service.id} onClick={() => chooseService(service.id)}>
            <img src={service.image} alt="" />
            <span>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </button>
        ))}
      </section>

      <section className="band">
        <div>
          <p className="eyebrow">Meeting Options</p>
          <h2>Contact us on WhatsApp or schedule a meeting with our sales team.</h2>
          <p>Send a quick WhatsApp message, or book a consultation and we will email the meeting invite to the sales team at {SITE.email}.</p>
        </div>
        <div className="meeting-links">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp Sales</a>
          <button onClick={openBooking}>Schedule Meeting</button>
          <a href={`mailto:${SITE.email}?subject=Sales%20meeting%20request%20for%20XoCODE`}>Invite Sales Team</a>
        </div>
      </section>
    </>
  );
}
