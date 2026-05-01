import React, { useState } from "react";
import { SITE, mailto } from "../config/site";

const SERVICES = [
  "Web Development",
  "SEO Optimization",
  "Digital Marketing",
  "Cloud & Automation",
  "Data Engineering",
  "AI Automation",
  "Multiple Services",
  "Not Sure — Need Guidance",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Need guidance",
];

export function ConversionForm({ onSubmitted }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [budget, setBudget] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (s) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    data.append("_subject", "New XoCODE Lead — Multi-step Form");
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("Services", selected.join(", ") || "Not specified");
    data.append("Budget", budget || "Not specified");
    data.append("Name", form.name);
    data.append("Email", form.email);
    data.append("Phone / WhatsApp", form.phone);
    data.append("Message", form.message);
    data.append("Submitted At", new Date().toLocaleString());
    data.append("Form Name", "Multi-Step Lead Capture");

    fetch(SITE.formEndpoint, { method: "POST", body: data })
      .then(() => { setSubmitting(false); onSubmitted && onSubmitted(); })
      .catch(() => { setSubmitting(false); onSubmitted && onSubmitted(); });
  };

  const canNext1 = selected.length > 0;
  const canNext2 = budget !== "";

  return (
    <div className="conv-form">
      <div className="conv-steps">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`conv-step-dot${step >= n ? " active" : ""}${step > n ? " done" : ""}`}>
            {step > n ? "✓" : n}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="conv-panel">
          <h3>Which service do you need?</h3>
          <p className="conv-sub">Select all that apply.</p>
          <div className="conv-service-grid">
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                className={`conv-service-btn${selected.includes(s) ? " active" : ""}`}
                onClick={() => toggleService(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <button className="primary" style={{ marginTop: 24 }} disabled={!canNext1} onClick={() => setStep(2)}>
            Next: Budget →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="conv-panel">
          <h3>What is your budget range?</h3>
          <p className="conv-sub">This helps us recommend the right plan.</p>
          <div className="conv-budget-grid">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                className={`conv-budget-btn${budget === b ? " active" : ""}`}
                onClick={() => setBudget(b)}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="conv-nav">
            <button className="secondary" onClick={() => setStep(1)}>← Back</button>
            <button className="primary" disabled={!canNext2} onClick={() => setStep(3)}>
              Next: Contact Info →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="conv-panel" onSubmit={handleSubmit}>
          <h3>Almost there — how do we reach you?</h3>
          <p className="conv-sub">We reply within 4 hours during business hours.</p>
          <div className="form-row">
            <label>
              Your Name
              <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              Email Address
              <input required type="email" placeholder="name@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
          </div>
          <label>
            Phone / WhatsApp
            <input placeholder="+92 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label>
            Project Brief
            <textarea
              required
              placeholder="What do you want to achieve? More leads, a new app, faster SEO, cloud setup, etc."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <div className="conv-summary">
            <span>Services: {selected.join(", ")}</span>
            <span>Budget: {budget}</span>
          </div>
          <div className="conv-nav">
            <button type="button" className="secondary" onClick={() => setStep(2)}>← Back</button>
            <button type="submit" className="primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send My Brief →"}
            </button>
          </div>
          <a
            className="email-fallback"
            href={mailto("New XoCODE Lead Inquiry", `Services: ${selected.join(", ")}\nBudget: ${budget}\nName: ${form.name}\nEmail: ${form.email}`)}
          >
            Email fallback
          </a>
        </form>
      )}
    </div>
  );
}
