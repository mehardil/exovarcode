import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE, phoneHref } from "../config/site";
import { ConversionForm } from "../components/ConversionForm";
import { EmailForm } from "../components/EmailForm";

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

export function Contact({ openBooking, setSuccess }) {
  return (
    <>
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">Contact</p>
          <h2>Tell us what you want to build.</h2>
          <p>Use the smart form below or reach us directly. We reply within 4 business hours.</p>
        </FadeUp>
      </section>

      <section className="contact-grid wrap">
        {/* LEFT PANEL */}
        <FadeUp>
          <div className="contact-panel">
            <h3>Direct Contact</h3>
            <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p>Phone / WhatsApp: <a href={phoneHref()}>{SITE.phone}</a></p>
            <p>Location: Islamabad, Pakistan. Serving clients worldwide.</p>
            <div className="contact-actions">
              <button className="primary" onClick={openBooking}>Book Strategy Call</button>
              <a className="secondary link-button" href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
            <div className="meeting-card">
              <span>Google Meet</span>
              <a href={SITE.googleMeet} target="_blank" rel="noreferrer">Open Meet</a>
            </div>
            <div className="meeting-card">
              <span>Zoom Meeting</span>
              <a href={SITE.zoom} target="_blank" rel="noreferrer">Open Zoom</a>
            </div>
            <div style={{ marginTop: "28px", padding: "20px", background: "var(--paper-strong)", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <p className="eyebrow" style={{ margin: "0 0 8px" }}>Response Times</p>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: "14px", lineHeight: 1.7 }}>
                WhatsApp: within 2 hours<br />
                Email: within 4 business hours<br />
                Proposals: within 24 hours of call
              </p>
            </div>
          </div>
        </FadeUp>

        {/* RIGHT: MULTI-STEP FORM */}
        <FadeUp delay={0.1}>
          <div className="form-card">
            <div style={{ marginBottom: "20px" }}>
              <h3>Smart Lead Form</h3>
              <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: "14px" }}>
                3 quick steps — takes under 90 seconds.
              </p>
            </div>
            <ConversionForm
              onSubmitted={() => setSuccess(`Your inquiry was sent to ${SITE.email}. We'll reply within 4 hours.`)}
            />
          </div>
        </FadeUp>
      </section>

      {/* DETAILED FORM (optional expanded) */}
      <section className="section-head wrap" style={{ paddingTop: "60px" }}>
        <FadeUp>
          <p className="eyebrow">Prefer a Detailed Brief?</p>
          <h2>Send us the full project specification.</h2>
          <p>Use this form for complex projects where you want to include all requirements upfront.</p>
        </FadeUp>
      </section>
      <section className="wrap" style={{ paddingBottom: "90px" }}>
        <FadeUp>
          <EmailForm
            className="form-card"
            subject="New XoCODE Detailed Inquiry"
            formName="Detailed Contact Form"
            message="New detailed project inquiry for XoCODE"
            onSubmitted={() => setSuccess(`Your detailed inquiry was submitted to ${SITE.email}.`)}
          >
            <input type="hidden" name="Inquiry Source" value="XoCODE Detailed Contact Form" />
            <div className="form-row">
              <label>Business Name<input required name="01 - Business Name" placeholder="Company or brand name" /></label>
              <label>Your Name<input required name="02 - Contact Person Name" placeholder="Full name" /></label>
            </div>
            <div className="form-row">
              <label>Email<input required type="email" name="03 - Email Address" placeholder="name@example.com" /></label>
              <label>Phone / WhatsApp<input name="04 - Phone or WhatsApp" placeholder="+92 ..." /></label>
            </div>
            <div className="form-row">
              <label>Location<input name="05 - Location" placeholder="City, Country" /></label>
              <label>Preferred Contact
                <select name="06 - Preferred Contact Method">
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Phone Call</option>
                  <option>Google Meet</option>
                  <option>Zoom Meeting</option>
                </select>
              </label>
            </div>
            <label>Service Needed
              <select name="07 - Service Needed">
                <option>Web Development</option>
                <option>SEO Optimization</option>
                <option>Digital Marketing</option>
                <option>Cloud & Automation</option>
                <option>Data Engineering</option>
                <option>AI Automation</option>
                <option>Multiple Services</option>
                <option>Not Sure / Need Guidance</option>
              </select>
            </label>
            <div className="form-row">
              <label>Budget
                <select name="08 - Budget Range">
                  <option>Under $500</option>
                  <option>$500 – $1,500</option>
                  <option>$1,500 – $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>$15,000+</option>
                  <option>Need guidance</option>
                </select>
              </label>
              <label>Timeline
                <select name="09 - Project Timeline">
                  <option>ASAP</option>
                  <option>1 – 2 weeks</option>
                  <option>1 month</option>
                  <option>2 – 3 months</option>
                  <option>Flexible</option>
                </select>
              </label>
            </div>
            <label>Existing Website<input name="10 - Existing Website" placeholder="https://..." /></label>
            <label>Project Goals<textarea required name="11 - Project Goals" placeholder="What do you want to achieve?" /></label>
            <label>Detailed Requirements<textarea name="12 - Detailed Requirements" placeholder="Pages, features, integrations, design ideas, competitors, deadline notes..." /></label>
            <button className="primary full" type="submit">Send Full Brief</button>
          </EmailForm>
        </FadeUp>
      </section>
    </>
  );
}
