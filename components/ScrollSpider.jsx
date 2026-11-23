"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollSpider() {
  const [active, setActive] = useState(false);
  const spiderRef = useRef(null);
  const threadRef = useRef(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 1200px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (small.matches || reduce.matches) return;
    setActive(true);

    let raf = 0;
    let current = 0;
    let target = 0;

    const apply = () => {
      const vh = window.innerHeight;
      const top = 84 + current * Math.max(0, vh - 180);
      const node = spiderRef.current;
      const thread = threadRef.current;
      if (node) {
        node.style.transform = `translate3d(0, ${top.toFixed(1)}px, 0) rotate(${((current - 0.5) * 8).toFixed(2)}deg)`;
      }
      if (thread) thread.style.height = `${(top + 8).toFixed(1)}px`;
    };

    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0008) current = target;
      apply();
      raf = current !== target ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    read();
    current = target;
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="scroll-spider" aria-hidden="true">
      <span className="scroll-spider-thread" ref={threadRef} />
      <span className="scroll-spider-body" ref={spiderRef}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <g className="spider-legs spider-legs-left">
            <path d="M24 28 C16 22 12 16 8 9" />
            <path d="M23 33 C14 30 8 28 2 24" />
            <path d="M24 38 C15 40 9 44 4 50" />
            <path d="M26 43 C19 50 14 56 10 62" />
          </g>
          <g className="spider-legs spider-legs-right">
            <path d="M40 28 C48 22 52 16 56 9" />
            <path d="M41 33 C50 30 56 28 62 24" />
            <path d="M40 38 C49 40 55 44 60 50" />
            <path d="M38 43 C45 50 50 56 54 62" />
          </g>
          <ellipse cx="32" cy="38" rx="10" ry="12" fill="currentColor" fillOpacity="0.14" />
          <circle cx="32" cy="25" r="7" fill="currentColor" fillOpacity="0.2" />
          <circle cx="29.4" cy="23.6" r="1.15" fill="currentColor" stroke="none" />
          <circle cx="34.6" cy="23.6" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      </span>
    </div>
  );
}
