import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { SITE } from "../config/site";

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

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    color: "var(--teal)",
    items: [
      "30-minute strategy call to understand your business goals",
      "Competitor analysis and market positioning review",
      "Scoped proposal with timeline and fixed pricing — no surprises",
      "Technology recommendation based on your scale requirements",
    ],
  },
  {
    number: "02",
    title: "Build",
    color: "var(--coral)",
    items: [
      "Sprint-based delivery with checkpoints every 3–5 days",
      "Live staging environment so you see progress in real time",
      "Built on production-grade stack: React, Node, AWS/GCP",
      "Code reviews, automated testing, and performance benchmarks",
    ],
  },
  {
    number: "03",
    title: "Launch",
    color: "var(--gold)",
    items: [
      "Zero-downtime deployment with rollback capability",
      "Post-launch monitoring and error tracking active from day one",
      "Handover documentation and team training where applicable",
      "30-day post-launch support included in every plan",
    ],
  },
];

const values = [
  { icon: "🎯", title: "Revenue-First Thinking", text: "Every decision — from architecture to copywriting — is made against one question: does this increase your revenue? If it doesn't, we don't build it." },
  { icon: "🔍", title: "Radical Transparency", text: "Fixed-price quotes. Written scopes. Real-time project updates. You always know exactly what is being built, when it ships, and what it costs." },
  { icon: "⚡", title: "Speed Without Compromise", text: "Standard web packages deliver in 48 hours. Complex projects ship in weeks, not months. Automation in our workflow means faster delivery at higher quality." },
  { icon: "🌍", title: "Global Standards, Accessible Pricing", text: "Headquartered in Islamabad with clients worldwide. Our lean structure means London-quality work at a price that actually makes sense for your business." },
];

export function About({ openBooking }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div
          className="hero-media"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85')" }}
          aria-hidden="true"
        />
        <div className="hero-content">
          <p className="eyebrow">About XoCODE</p>
          <h1>The Digital Studio Built for ROI, Not Retainers.</h1>
          <p>
            We are a lean team of engineers, SEO specialists, and growth strategists who believe
            premium digital infrastructure should be accessible to every business — not just the ones
            that can afford a big-agency retainer.
          </p>
          <div className="actions">
            <button className="primary" onClick={openBooking}>Book a Discovery Call</button>
            <button className="secondary" onClick={() => navigate("/work")}>See Our Work</button>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">What We Stand For</p>
          <h2>Built on four non-negotiable principles.</h2>
        </FadeUp>
      </section>
      <section className="efficiency-grid wrap" style={{ paddingBottom: "90px" }}>
        {values.map((v, i) => (
          <FadeUp key={v.title} delay={i * 0.08}>
            <div className="efficiency-card">
              <span className="efficiency-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* PROCESS */}
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">The XoCODE Way</p>
          <h2>Discovery → Build → Launch.</h2>
          <p>
            A repeatable, three-phase process that eliminates ambiguity, keeps projects on schedule,
            and delivers results your business can measure.
          </p>
        </FadeUp>
      </section>

      <section className="process-grid wrap">
        {processSteps.map((step, i) => (
          <FadeUp key={step.number} delay={i * 0.12}>
            <div className="process-card" style={{ borderTopColor: step.color }}>
              <div className="process-number" style={{ color: step.color }}>{step.number}</div>
              <h3>{step.title}</h3>
              <ul className="process-list">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* STATS */}
      <section className="about-stats wrap">
        <FadeUp>
          <div className="about-stats-grid">
            <div className="about-stat">
              <strong>150+</strong>
              <span>Projects Shipped</span>
            </div>
            <div className="about-stat">
              <strong>98%</strong>
              <span>Client Satisfaction</span>
            </div>
            <div className="about-stat">
              <strong>48hrs</strong>
              <span>Standard Delivery</span>
            </div>
            <div className="about-stat">
              <strong>$499</strong>
              <span>Starting Price</span>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CTA BAND */}
      <section className="band">
        <div>
          <p className="eyebrow">Start Today</p>
          <h2>A 30-minute call is all it takes to get a scoped proposal and fixed price.</h2>
          <p>No commitment required. No sales pressure. Just a conversation about your goals.</p>
        </div>
        <div className="meeting-links">
          <button onClick={openBooking} style={{ background: "var(--teal)", borderColor: "var(--teal)", color: "#fff" }}>
            Book Discovery Call
          </button>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp Us</a>
          <a href={`mailto:${SITE.email}?subject=Discovery%20call%20request`}>Email Us</a>
        </div>
      </section>
    </>
  );
}
