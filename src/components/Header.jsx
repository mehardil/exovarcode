import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Brand } from "./Brand";

const links = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function Header({ openBooking }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="nav">
        <Brand onClick={() => go("/")} />
        <div className="nav-links">
          {links.map(([path, label]) => (
            <button key={path} className={isActive(path) ? "active" : ""} onClick={() => go(path)}>
              {label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="primary small" onClick={openBooking}>Get a Quote</button>
        </div>
      </nav>
    </header>
  );
}
