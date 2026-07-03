import React from "react";
import { SITE } from "../config/site";

export function Brand({ onClick, footer = false }) {
  return (
    <button className={footer ? "brand footer-brand" : "brand"} onClick={onClick} aria-label={`${SITE.name} home`}>
      <span className="brand-image-crop">
        <img className="brand-logo" src="/sync-oaks-logo-web-hq.svg" alt={SITE.name} />
      </span>
    </button>
  );
}
