import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { PricingSection } from "./PricingSection";
import CountUp from "./CountUp";

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const INDUSTRIES = [
  "E-Commerce", "SaaS", "Healthcare", "Finance", "Logistics",
  "EdTech", "Real Estate", "Hospitality", "Manufacturing", "Retail",
];

const COMPARISON_ROWS = [
  ["Dedicated specialist team", true, false],
  ["Transparent pricing — no surprises", true, false],
  ["48-hour delivery turnaround", true, false],
  ["Revenue-focused KPIs", true, false],
  ["Post-launch support included", true, false],
  ["Direct communication with builders", true, false],
  ["CI/CD automated delivery", true, false],
  ["Monthly performance reporting", true, true],
  ["Custom scope & flexibility", true, false],
];

export function ServiceTemplate({ service, plans, steps, faqs, openOrder, openBooking, miniCase }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* ── SERVICE HERO ── */}
      <section className="service-hero">
        <div className="service-hero-media" style={{ backgroundImage: `url(${service.image})` }} aria-hidden="true" />
        <div className="service-hero-content wrap">
          <FadeUp>
            <p className="eyebrow">{service.tagline}</p>
            <h1>{service.title}</h1>
            <p className="service-hero-desc">{service.heroText}</p>

            {/* Animated metrics */}
            {service.metrics && (
              <div style={{ display: "flex", gap: 32, margin: "28px 0", flexWrap: "wrap" }}>
                {service.metrics.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: "var(--teal)", lineHeight: 1 }}>
                      <CountUp target={m.value} suffix={m.suffix} />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="actions">
              <button className="primary" onClick={openBooking}>Get a Free Quote</button>
              <button className="secondary" onClick={() => navigate("/portfolio")}>See Our Work</button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <div className="industries-section wrap">
        <FadeUp>
          <h3>Industries We Serve</h3>
          <div className="industry-pills">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="industry-pill">{ind}</span>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── HOW IT WORKS ── */}
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

      {/* ── MINI CASE STUDY ── */}
      {miniCase && (
        <div className="wrap" style={{ paddingBottom: 16 }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <p className="eyebrow">Proof It Works</p>
              <h2 style={{ marginBottom: 8 }}>A Recent Success Story</h2>
            </div>
            <div className="mini-case-card">
              <div className="mini-case-content">
                <h4>{miniCase.title}</h4>
                <p>{miniCase.desc}</p>
                <p className="mini-case-quote">"{miniCase.quote}"<br /><strong>— {miniCase.author}</strong></p>
              </div>
              <div className="mini-case-metric">
                <div className="mini-case-metric-val">{miniCase.metricVal}</div>
                <div className="mini-case-metric-label">{miniCase.metricLabel}</div>
              </div>
            </div>
          </FadeUp>
        </div>
      )}

      {/* ── COMPARISON TABLE ── */}
      <div className="comparison-table-wrap wrap">
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p className="eyebrow">Why Sync-Oaks</p>
            <h2>Us vs. a Generic Agency</h2>
          </div>
          <div className="comparison-table">
            <div className="comparison-table-head">
              <div className="comparison-table-head-cell">Feature</div>
              <div className="comparison-table-head-cell us">Sync-Oaks</div>
              <div className="comparison-table-head-cell">Typical Agency</div>
            </div>
            {COMPARISON_ROWS.map(([feature, us, them]) => (
              <div className="comparison-row" key={feature}>
                <div className="comparison-cell feature">{feature}</div>
                <div className="comparison-cell us">
                  {us
                    ? <span className="check-yes">✓</span>
                    : <span className="check-no">✗</span>}
                </div>
                <div className="comparison-cell">
                  {them
                    ? <span className="check-yes">✓</span>
                    : <span className="check-no">✗</span>}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── PRICING ── */}
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

      {/* ── FAQ ── */}
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

      {/* ── CTA BAND ── */}
      <section className="band" style={{ position: "relative", overflow: "hidden" }}>
        <div className="aurora-bg" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="eyebrow">Let's Build</p>
          <h2>Ready to turn {service.title.toLowerCase()} into a revenue asset?</h2>
          <p>Book a free 30-minute strategy call and get a scoped proposal within 24 hours.</p>
        </div>
        <div className="meeting-links" style={{ position: "relative", zIndex: 1 }}>
          <button
            className="primary shimmer-wrap"
            onClick={openBooking}
          >
            Book Free Call
          </button>
          <button
            onClick={() => navigate("/contact")}
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", borderRadius: "8px", padding: "0 16px", minHeight: "44px", fontWeight: 800 }}
          >
            Send Inquiry
          </button>
        </div>
      </section>
    </>
  );
}
