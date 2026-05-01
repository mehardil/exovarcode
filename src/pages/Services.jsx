import React from "react";
import { SectionIntro } from "../components/SectionIntro";

export function Services({ activeService, setActiveService, selectedPlans, openOrder }) {
  const tabs = [
    ["seo", "SEO"],
    ["fullstack", "Full-Stack"],
    ["marketing", "Marketing"],
    ["cloud", "Cloud"],
  ];

  return (
    <>
      <SectionIntro
        label="Services"
        title="Simple plans, clean delivery, and clear next steps."
        text="Pick a service to see packages. For custom projects, book a meeting and we will shape the scope with you."
      />
      <section className="wrap">
        <div className="tabs">
          {tabs.map(([id, label]) => (
            <button key={id} className={activeService === id ? "active" : ""} onClick={() => setActiveService(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="pricing-grid">
          {selectedPlans.map(([name, price, ...features], index) => (
            <article className={index === 1 ? "price-card featured" : "price-card"} key={name}>
              <p className="plan-label">{index === 1 ? "Recommended" : "Package"}</p>
              <h3>{name}</h3>
              <strong>{price}</strong>
              <ul>
                {features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <button className={index === 1 ? "primary" : "secondary"} onClick={() => openOrder(name, price)}>
                Confirm Order
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
