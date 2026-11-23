"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "../lib/analytics";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const cfToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

  useEffect(() => {
    const onClick = (event) => {
      const target = event.target.closest("[data-track]");
      if (!target) return;
      const name = target.getAttribute("data-track");
      const location = target.getAttribute("data-track-location") || "unknown";
      track(name, {
        cta_location: location,
        link_url: target.getAttribute("href") || "",
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
      {cfToken ? (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfToken}"}`}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
