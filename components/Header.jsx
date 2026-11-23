"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { primaryNav, SITE, whatsappUrl } from "../lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    window.__soHydrated = true;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusables = drawer
      ? [...drawer.querySelectorAll("a[href], button:not([disabled])")]
      : [];
    focusables[0]?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Sync-Oaks home" onClick={() => setOpen(false)}>
          <img
            src="/sync-oaks-logo-web-hq.svg"
            alt="Sync-Oaks"
            width={180}
            height={31}
            fetchPriority="high"
          />
        </Link>

        <nav className="nav-desktop" aria-label="Main navigation">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link${isActive(item.href) ? " active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            href="/book-meeting/"
            className="btn btn-primary btn-sm header-cta"
            data-track="cta_book_header"
            data-track-location="header"
          >
            Book Discovery Call
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        className={`mobile-drawer${open ? " is-open" : ""}`}
        id="mobile-menu"
        ref={drawerRef}
        aria-hidden={!open}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span className="eyebrow" style={{ margin: 0 }}>Menu</span>
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            aria-label="Close menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {primaryNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
        <Link href="/book-meeting/" className="btn btn-primary" onClick={() => setOpen(false)}>
          Book Discovery Call
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
          onClick={() => setOpen(false)}
        >
          Chat on WhatsApp
        </a>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: "0.75rem" }}>
          Or email <a href={`mailto:${SITE.email}`} style={{ color: "var(--gold-2)" }}>{SITE.email}</a>
        </p>
      </div>
    </header>
  );
}
