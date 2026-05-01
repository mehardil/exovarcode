import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { SITE } from "../config/site";
import { services } from "../data/content";

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const techLogos = [
  { name: "React", label: "React" },
  { name: "AWS", label: "Amazon Web Services" },
  { name: "Google Cloud", label: "Google Cloud" },
  { name: "Stripe", label: "Stripe" },
  { name: "Next.js", label: "Next.js" },
  { name: "MongoDB", label: "MongoDB" },
  { name: "PostgreSQL", label: "PostgreSQL" },
  { name: "Docker", label: "Docker" },
];

const advantages = [
  {
    icon: "⚡",
    title: "Automation-First Delivery",
    text: "We deploy with automated CI/CD pipelines and reusable component libraries — not by hand. This cuts delivery time and passes the savings directly to you.",
  },
  {
    icon: "🎯",
    title: "Zero Overhead Pricing",
    text: "No big-agency offices, no account managers, no bloat. A lean team of specialists who build, ship, and move — meaning enterprise-quality at startup pricing.",
  },
  {
    icon: "📈",
    title: "ROI-Focused Scope",
    text: "Every deliverable is tied to a business outcome — more leads, lower bounce rate, faster deploys. We measure success in revenue, not deliverables.",
  },
  {
    icon: "🔒",
    title: "Production-Grade Quality",
    text: "Our low prices don't mean cutting corners. Every project ships with performance optimization, security hardening, and scalable infrastructure from day one.",
  },
];

export function Home({ openBooking }) {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Digital Product Studio — Market Disruptor Pricing</p>
          <h1>Build Revenue-Generating Digital Assets with XoCODE.</h1>
          <p>
            We engineer full-stack products, SEO systems, cloud infrastructure, and lead generation
            machines — at prices that make billion-dollar results accessible to every business.
          </p>
          <div className="actions">
            <button className="primary" onClick={() => go("/services")}>See Pricing & Services</button>
            <button className="secondary" onClick={openBooking}>Book Free Strategy Call</button>
          </div>
          <div className="metrics">
            <span><strong>$499</strong> web packages</span>
            <span><strong>150+</strong> projects shipped</span>
            <span><strong>48hr</strong> delivery</span>
          </div>
          <div className="hero-proof">
            <div>
              <span>01</span>
              <strong>Discovery</strong>
              <p>Scope, stack, ROI targets, and launch timeline defined in one call.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Build</strong>
              <p>React interfaces, scalable APIs, and cloud infrastructure.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Grow</strong>
              <p>SEO, automation, analytics, and ongoing revenue engineering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID SERVICES */}
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">Our Digital Pillars</p>
          <h2>Five specialisms. One studio. Unbeatable value.</h2>
          <p>Click any pillar to explore pricing, case studies, and how we deliver results.</p>
        </FadeUp>
      </section>

      <section className="bento-grid wrap">
        {services.map((service, i) => (
          <FadeUp key={service.id} delay={i * 0.07}>
            <button
              className={`bento-card bento-card--${service.id}`}
              onClick={() => service.slug ? go(service.slug) : go("/services")}
            >
              <div className="bento-card-inner">
                <img src={service.image} alt="" loading="lazy" />
                <div className="bento-card-body">
                  <span className="bento-icon">{service.icon}</span>
                  <p className="eyebrow">{service.tagline}</p>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  {service.slug && <span className="bento-cta">Explore →</span>}
                </div>
              </div>
            </button>
          </FadeUp>
        ))}
      </section>

      {/* EFFICIENCY ADVANTAGE */}
      <section className="efficiency-section wrap">
        <FadeUp>
          <div className="efficiency-head">
            <p className="eyebrow">The Efficiency Advantage</p>
            <h2>Why our prices are low — and our quality is not.</h2>
            <p>
              XoCODE delivers enterprise-grade digital infrastructure at market-disruptor prices. Here is exactly how.
            </p>
          </div>
        </FadeUp>
        <div className="efficiency-grid">
          {advantages.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.08}>
              <div className="efficiency-card">
                <span className="efficiency-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <div className="efficiency-cta">
            <div>
              <strong>Standard Web Package from $499. SEO from $299/mo.</strong>
              <p>Prices that beat the market. Quality that beats the agency.</p>
            </div>
            <div className="actions">
              <button className="primary" onClick={() => go("/services")}>View All Pricing</button>
              <button className="secondary" onClick={openBooking}>Talk to a Specialist</button>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* TECH TRUST BAR */}
      <section className="tech-trust wrap">
        <FadeUp>
          <p className="tech-trust-label">Technologies & platforms we build with</p>
          <div className="tech-logos">
            {techLogos.map((t) => (
              <div key={t.name} className="tech-logo-badge" aria-label={t.label}>
                {t.name}
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA BAND */}
      <section className="band">
        <div>
          <p className="eyebrow">Ready to Start?</p>
          <h2>WhatsApp us now or schedule a free strategy call with our team.</h2>
          <p>Direct line to the people who will actually build your project. No sales intermediaries.</p>
        </div>
        <div className="meeting-links">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp Sales</a>
          <button onClick={openBooking}>Book Strategy Call</button>
          <a href={`mailto:${SITE.email}?subject=Project%20inquiry%20for%20XoCODE`}>Email Us</a>
        </div>
      </section>
    </>
  );
}
