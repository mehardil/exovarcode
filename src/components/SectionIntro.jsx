import React from "react";

export function SectionIntro({ label, title, text }) {
  return (
    <section className="section-head wrap">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </section>
  );
}
