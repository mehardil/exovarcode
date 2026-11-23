"use client";

import { useRef } from "react";

export function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  function onMove(event) {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--ry", `${x * 7}deg`);
    node.style.setProperty("--rx", `${y * -7}deg`);
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--rx", "0deg");
  }

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt-inner">{children}</div>
    </div>
  );
}
