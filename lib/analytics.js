"use client";

export function track(name, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

export function captureUtms() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
  const utm = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  utm.landing_page = window.location.pathname;
  utm.referrer = document.referrer || "";
  try {
    const existing = JSON.parse(sessionStorage.getItem("so_attribution") || "{}");
    const merged = { ...existing, ...utm };
    sessionStorage.setItem("so_attribution", JSON.stringify(merged));
    return merged;
  } catch {
    return utm;
  }
}

export function getStoredUtms() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("so_attribution") || "{}");
  } catch {
    return {};
  }
}
