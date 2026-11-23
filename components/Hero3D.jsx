"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2) return true;
  if (navigator.deviceMemory && navigator.deviceMemory < 2) return true;
  return false;
}

export function Hero3D({ variant = "full" }) {
  const [ready, setReady] = useState(false);
  const hostRef = useRef(null);
  const compact = variant === "ambient";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;
    if (isLowEndDevice()) return;
    if (!supportsWebGL()) return;

    let cancelled = false;
    let timeout;
    let idle;
    let observer;

    const start = () => {
      if (cancelled) return;
      setReady(true);
    };

    const schedule = () => {
      if (cancelled) return;
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(start, { timeout: 2000 })
          : (timeout = window.setTimeout(start, 800));
    };

    const host = hostRef.current;
    if (typeof IntersectionObserver === "function" && host) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer.disconnect();
            schedule();
          }
        },
        { rootMargin: "240px" },
      );
      observer.observe(host);
    } else {
      schedule();
    }

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (typeof window.cancelIdleCallback === "function" && idle) {
        window.cancelIdleCallback(idle);
      }
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={hostRef} className={`hero-3d${compact ? " hero-3d-ambient" : ""}`} aria-hidden="true">
      {ready ? (
        <div className={`hero-canvas-wrap${compact ? " hero-canvas-ambient" : ""}`}>
          <NetworkScene compact={compact} />
        </div>
      ) : (
        <div className={`hero-fallback${compact ? " hero-fallback-ambient" : ""}`} />
      )}
    </div>
  );
}
