import React from "react";

export function PricingSection({ plans, openOrder }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan, i) => {
        const isFeatured = plan.badge === "Best Value" || plan.badge === "Most Popular";
        return (
          <article key={plan.name} className={isFeatured ? "price-card featured" : "price-card"}>
            <div className="price-card-top">
              {plan.badge ? (
                <p className="plan-label plan-label--featured">{plan.badge}</p>
              ) : (
                <p className="plan-label">Package</p>
              )}
              <h3>{plan.name}</h3>
              <strong className="plan-price">{plan.price}</strong>
            </div>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button
              className={isFeatured ? "primary full" : "secondary full"}
              onClick={() => openOrder(plan.name, plan.price)}
            >
              Get Started
            </button>
          </article>
        );
      })}
    </div>
  );
}
