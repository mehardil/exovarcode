import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { services, webPlans } from "../data/content";
import { PricingSection } from "../components/PricingSection";

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

export function Services({ openOrder, openBooking }) {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">Services Hub</p>
          <h2>Five digital pillars. One studio. Market-disruptor pricing.</h2>
          <p>
            Explore each service below or dive into a specialist page for detailed pricing, process, and case studies.
          </p>
        </FadeUp>
      </section>

      {/* SERVICE PILLAR CARDS */}
      <section className="services-hub wrap">
        {services.map((svc, i) => (
          <FadeUp key={svc.id} delay={i * 0.07}>
            <div className="hub-card">
              <img src={svc.image} alt="" loading="lazy" />
              <div className="hub-card-body">
                <p className="eyebrow">{svc.tagline}</p>
                <h3>{svc.title}</h3>
                <p>{svc.text}</p>
                {svc.slug ? (
                  <button className="secondary" onClick={() => go(svc.slug)}>
                    See Pricing & Details →
                  </button>
                ) : (
                  <button className="secondary" onClick={openBooking}>Get a Custom Quote</button>
                )}
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* ANCHOR PRICING — WEB DEVELOPMENT */}
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">Most Popular — Web Development</p>
          <h2>Premium React builds at market-disruptor pricing.</h2>
          <p>Our most-requested service. Pick a plan or book a call for a custom scope.</p>
        </FadeUp>
      </section>
      <section className="wrap" style={{ paddingBottom: "90px" }}>
        <FadeUp>
          <PricingSection plans={webPlans} openOrder={openOrder} />
        </FadeUp>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button className="secondary" onClick={() => go("/services/web-development")}>
            View Full Web Dev Details →
          </button>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="band">
        <div>
          <p className="eyebrow">Custom Project?</p>
          <h2>Not sure which service fits? Let's figure it out together.</h2>
          <p>Book a free 30-minute strategy call and walk away with a clear plan and fixed-price quote.</p>
        </div>
        <div className="meeting-links">
          <button
            onClick={openBooking}
            style={{ background: "var(--teal)", borderColor: "var(--teal)", color: "#fff" }}
          >
            Book Free Call
          </button>
          <button
            onClick={() => go("/contact")}
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", borderRadius: "8px", padding: "0 16px", minHeight: "44px", fontWeight: 800 }}
          >
            Send Inquiry
          </button>
        </div>
      </section>
    </>
  );
}
