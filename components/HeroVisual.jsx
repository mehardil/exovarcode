"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";

export function HeroVisual() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(event) {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--mx", `${(x * 14).toFixed(1)}px`);
      node.style.setProperty("--my", `${(y * 12).toFixed(1)}px`);
      node.style.setProperty("--mx-inv", `${(x * -10).toFixed(1)}px`);
      node.style.setProperty("--my-inv", `${(y * -8).toFixed(1)}px`);
      node.style.setProperty("--rx", `${(y * -2).toFixed(2)}deg`);
      node.style.setProperty("--ry", `${(x * 2.5).toFixed(2)}deg`);
    }
    function onLeave() {
      node.style.setProperty("--mx", "0px");
      node.style.setProperty("--my", "0px");
      node.style.setProperty("--mx-inv", "0px");
      node.style.setProperty("--my-inv", "0px");
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
    }
    function onScroll() {
      const rect = node.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / rect.height;
      const shift = Math.max(-1, Math.min(1, progress)) * 20;
      node.style.setProperty("--sy", `${shift.toFixed(1)}px`);
    }
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hero-visual hero-visual-enterprise" ref={ref}>
      <div className="visual-halo" aria-hidden="true" />

      <figure className="hero-frame">
        <img
          src="/images/hero-services.webp"
          alt="Sync-Oaks enterprise operations command center with real-time cloud, analytics, and automation dashboards"
          width={1402}
          height={1122}
          fetchPriority="high"
          decoding="async"
        />
      </figure>

      <div className="hero-stat hero-stat-uptime">
        <span className="hero-stat-icon"><ShieldCheck size={16} aria-hidden="true" /></span>
        <span className="hero-stat-copy">
          <strong>99.97% Uptime</strong>
          <em>SLA Guaranteed</em>
        </span>
      </div>

      <div className="hero-stat hero-stat-roi">
        <span className="hero-stat-icon"><TrendingUp size={16} aria-hidden="true" /></span>
        <span className="hero-stat-copy">
          <strong>+340% ROI</strong>
          <em>Avg. Client Return</em>
        </span>
      </div>
    </div>
  );
}
