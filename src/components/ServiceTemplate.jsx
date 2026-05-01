import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { PricingSection } from "./PricingSection";

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.46, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function ServiceTemplate({ service, plans, steps, faqs, openOrder, openBooking }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* SERVICE HERO */}
      <section className="service-hero">
        <div className="service-hero-media" style={{ backgroundImage: `url(${service.image})` }} aria-hidden="true" />
        <div className="service-hero-content wrap">
          <FadeUp>
            <p className="eyebrow">{service.tagline}</p>
            <h1>{service.title}</h1>
            <p className="service-hero-desc">{service.heroText}</p>
            <div className="actions">
              <button className="primary" onClick={openBooking}>Get a Free Quote</button>
              <button className="secondary" onClick={() => navigate("/work")}>See Case Studies</button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">The Process</p>
          <h2>How it works — from brief to live.</h2>
        </FadeUp>
      </section>
      <section className="timeline wrap">
        {steps.map((step, i) => (
          <FadeUp key={step.title} delay={i * 0.1}>
            <div className="timeline-step">
              <div className="timeline-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="timeline-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* PRICING */}
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">Transparent Pricing</p>
          <h2>Pick a plan that fits your goals and budget.</h2>
          <p>All plans include onboarding, delivery, and post-launch support. No hidden fees.</p>
        </FadeUp>
      </section>
      <section className="wrap" style={{ paddingBottom: "90px" }}>
        <FadeUp>
          <PricingSection plans={plans} openOrder={openOrder} />
        </FadeUp>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <>
          <section className="section-head wrap">
            <FadeUp>
              <p className="eyebrow">Common Questions</p>
              <h2>Everything you need to know.</h2>
            </FadeUp>
          </section>
          <section className="faq-list wrap">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.06}>
                <div className={`faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="faq-toggle">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <p className="faq-answer">{faq.a}</p>}
                </div>
              </FadeUp>
            ))}
          </section>
        </>
      )}

      {/* CTA BAND */}
      <section className="band">
        <div>
          <p className="eyebrow">Let's Build</p>
          <h2>Ready to turn {service.title.toLowerCase()} into a revenue asset?</h2>
          <p>Book a free 30-minute strategy call and get a scoped proposal within 24 hours.</p>
        </div>
        <div className="meeting-links">
          <button onClick={openBooking} style={{ background: "var(--teal)", borderColor: "var(--teal)", color: "#fff" }}>
            Book Free Call
          </button>
          <button onClick={() => navigate("/contact")} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", borderRadius: "8px", padding: "0 16px", minHeight: "44px", fontWeight: 800 }}>
            Send Inquiry
          </button>
        </div>
      </section>
    </>
  );
}
