"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "so_exit_audit_seen";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const prompted = useRef(false);

  useEffect(() => {
    if (window.innerWidth < 900) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    let timer;
    const show = () => {
      if (prompted.current) return;
      prompted.current = true;
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    timer = window.setTimeout(show, 28000);

    const onLeave = (event) => {
      if (event.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="exit-backdrop" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="exit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="exit-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>Free, no-obligation review</p>
        <h2 id="exit-title" style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
          Want a second opinion on your website?
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
          Send us your URL and we will reply with a short audit covering speed,
          mobile usability, search visibility, and the three highest-impact fixes.
        </p>
        <div className="btn-row">
          <Link
            href="/contact/?service=lead-generation-systems&utm_source=exit_intent&utm_medium=site#lead"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
            data-track="cta_free_audit"
            data-track-location="exit_intent"
          >
            Request the free audit
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
            Not now
          </button>
        </div>
        <p className="form-note" style={{ marginTop: "0.8rem" }}>
          Replying usually takes one business day.
        </p>
      </div>
    </div>
  );
}
