import React from "react";
import { Brand } from "./Brand";

export function Header({ page, go, openBooking }) {
  const links = [
    ["home", "Home"],
    ["services", "Services"],
    ["work", "Work"],
    ["contact", "Contact"],
  ];

  return (
    <header className="site-header">
      <nav className="nav">
        <Brand onClick={() => go("home")} />
        <div className="nav-links">
          {links.map(([id, label]) => (
            <button key={id} className={page === id ? "active" : ""} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="primary small" onClick={openBooking}>Book Meet</button>
        </div>
      </nav>
    </header>
  );
}
