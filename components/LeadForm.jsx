"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Lock, Send } from "lucide-react";
import { SITE, mailtoUrl, whatsappUrl } from "../lib/site";
import { serviceOptions } from "../lib/services";
import { captureUtms, getStoredUtms, track } from "../lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.email || !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Please tell us a little about the project (10+ characters).";
  }
  if (values.phone && values.phone.length > 50) errors.phone = "Phone number is too long.";
  return errors;
}

export function LeadForm({
  source = "website",
  defaultService = "",
  heading = "Send a project brief",
  intro = "Tell us what you want to build. We reply from the owner inbox within one business day.",
  compact = false,
}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
    company_website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [utm, setUtm] = useState({});
  const turnstileRef = useRef(null);
  const startedRef = useRef(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    setUtm(captureUtms());
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service && serviceOptions.some((option) => option.value === service)) {
      setValues((current) => ({ ...current, service }));
    }
  }, []);

  useEffect(() => {
    if (!siteKey || !turnstileRef.current) return;
    let cancelled = false;

    function renderWidget() {
      if (cancelled || !window.turnstile || !turnstileRef.current) return;
      window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        theme: "auto",
        size: "flexible",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      const existing = document.querySelector('script[data-so-turnstile="true"]');
      if (existing) {
        existing.addEventListener("load", renderWidget, { once: true });
      } else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.soTurnstile = "true";
        script.addEventListener("load", renderWidget, { once: true });
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setServerError("");
    }
    if (!startedRef.current) {
      startedRef.current = true;
      track("lead_form_start", { form_source: source });
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (values.company_website) {
      setStatus("success");
      return;
    }
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    setServerError("");

    const attribution = { ...getStoredUtms(), ...utm };
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      service: values.service,
      message: values.message.trim(),
      company_website: values.company_website,
      turnstileToken,
      source,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      utm: attribution,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || "The message could not be sent right now.");
      }
      setStatus("success");
      track("lead_submit", {
        form_source: source,
        service: values.service || "unspecified",
        utm_source: attribution.utm_source || "direct",
      });
      setValues({ name: "", email: "", phone: "", service: defaultService, message: "", company_website: "" });
      setTurnstileToken("");
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
      }
    } catch (error) {
      setStatus("error");
      setServerError(error.message || "The message could not be sent right now.");
      track("lead_submit_error", { form_source: source });
    }
  }

  const fallbackHref = mailtoUrl(
    `New project inquiry from ${values.name || "website visitor"}`,
    `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nService: ${values.service}\n\n${values.message}`,
  );

  if (status === "success") {
    return (
      <div className="form-card" id="lead">
        <div className="form-status success" role="status" aria-live="polite">
          <strong>Message received.</strong> Thank you, {values.name || "there"}. We will reply from
          the owner inbox within one business day. If it is urgent, message us on WhatsApp.
        </div>
        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <a
            href={whatsappUrl()}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            data-track="cta_whatsapp"
            data-track-location="lead_success"
          >
            Continue on WhatsApp
          </a>
          <button type="button" className="btn btn-secondary" onClick={() => setStatus("idle")}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card" id="lead">
      <h2 style={{ fontSize: compact ? "1.35rem" : "1.6rem" }}>{heading}</h2>
      <p className="form-intro">{intro}</p>

      {status === "error" ? (
        <div className="form-status error" role="alert">
          {serverError} You can{" "}
          <a href={fallbackHref}>email us directly</a> or{" "}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">message on WhatsApp</a>.
        </div>
      ) : null}

      <form onSubmit={onSubmit} noValidate>
        <div className="field-row">
          <div className="field">
            <label htmlFor="lead-name">Name <span className="req" aria-hidden="true">*</span></label>
            <input
              id="lead-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              placeholder="Your name"
              required
            />
            {errors.name ? <span className="field-error" id="lead-name-error">{errors.name}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="lead-email">Email <span className="req" aria-hidden="true">*</span></label>
            <input
              id="lead-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
              placeholder="you@company.com"
              required
            />
            {errors.email ? <span className="field-error" id="lead-email-error">{errors.email}</span> : null}
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="lead-phone">Phone / WhatsApp <span className="muted">(optional)</span></label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => update("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              placeholder="+92 ..."
            />
            {errors.phone ? <span className="field-error" id="lead-phone-error">{errors.phone}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="lead-service">Service <span className="muted">(optional)</span></label>
            <select
              id="lead-service"
              name="service"
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
            >
              <option value="">Not sure yet</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
              <option value="free-audit">Free website / SEO audit</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="lead-message">What do you need? <span className="req" aria-hidden="true">*</span></label>
          <textarea
            id="lead-message"
            name="message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "lead-message-error" : undefined}
            placeholder="A sentence or two about the project, current site, and timeline."
            required
          />
          {errors.message ? <span className="field-error" id="lead-message-error">{errors.message}</span> : null}
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="lead-company-website">Leave this field empty</label>
          <input
            id="lead-company-website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={values.company_website}
            onChange={(event) => update("company_website", event.target.value)}
          />
        </div>

        {siteKey ? <div ref={turnstileRef} style={{ marginBottom: "0.9rem" }} /> : null}

        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 size={17} className="spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              <Send size={17} aria-hidden="true" />
              Send message
            </>
          )}
        </button>

        <p className="form-note" style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <Lock size={12} aria-hidden="true" />
          Your details are sent to {SITE.name} only. No newsletter, no resale. See the{" "}
          <a href="/privacy/" style={{ textDecoration: "underline" }}>privacy policy</a>.
        </p>
      </form>
      <span className="sr-only" aria-live="polite">
        {status === "loading" ? "Sending your message" : ""}
      </span>
    </div>
  );
}
