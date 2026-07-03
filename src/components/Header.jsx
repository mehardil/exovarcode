import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Brand } from "./Brand";

const links = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/portfolio", "Portfolio"],
  ["/work", "Case Studies"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function Header({ openBooking }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="nav" style={{ position: "relative" }}>
        <Brand onClick={() => go("/")} />

        {/* Desktop nav links */}
        <div className="nav-links">
          {links.map(([path, label]) => (
            <button
              key={path}
              className={isActive(path) ? "active" : ""}
              onClick={() => go(path)}
              style={{ fontSize: 13.5, fontWeight: 600 }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-actions">
          <motion.button
            className="primary small"
            onClick={openBooking}
            whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(201,168,76,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}
          >
            Book Discovery Call
            <ArrowRight size={14} />
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              display: "none",
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 8,
              padding: "6px 8px",
              color: "var(--ink)",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(10,10,8,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(201,168,76,0.12)",
              padding: "16px 20px 20px",
              zIndex: 40,
            }}
          >
            {links.map(([path, label]) => (
              <button
                key={path}
                onClick={() => go(path)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: isActive(path) ? "rgba(201,168,76,0.10)" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 14px",
                  color: isActive(path) ? "#E0BF7A" : "var(--muted)",
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 2,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
            <button
              className="primary"
              onClick={openBooking}
              style={{ width: "100%", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              Book Discovery Call <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .nav-actions .primary:not(.mobile-menu-btn) { display: none; }
        }
      `}</style>
    </header>
  );
}
