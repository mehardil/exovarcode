import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { SITE } from "../config/site";

const HEADLINE_WORDS = "Enterprise Digital Infrastructure. Built to".split(" ");
const CYCLING_WORDS = ["Scale.", "Perform.", "Deliver.", "Dominate."];

function WordBlurReveal({ words, baseDelay = 0.2 }) {
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(14px)", y: 18 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.55, delay: baseDelay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

const trustBadges = [
  { icon: Shield, label: "SOC 2 Aligned" },
  { icon: Globe, label: "Global Delivery" },
  { icon: Zap, label: "48-hr Delivery" },
];

export default function AuroraHero({ onBooking }) {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="aurora-hero" ref={heroRef}>
      {/* Aurora animated background */}
      <motion.div className="aurora-bg" />

      {/* Gold radial glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.10), transparent 65%), " +
          "radial-gradient(ellipse 40% 40% at 80% 60%, rgba(201,168,76,0.06), transparent 55%)",
      }} />

      {/* Dot grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.25,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <motion.div className="aurora-hero-inner" style={{ opacity }}>
        {/* Left: Copy */}
        <div className="aurora-hero-copy">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Enterprise Digital Agency · Serving Global Teams
            </span>
          </motion.div>

          {/* Headline */}
          <h1 style={{ lineHeight: 1.06, letterSpacing: "-0.028em" }}>
            <WordBlurReveal words={HEADLINE_WORDS} baseDelay={0.2} />
            {" "}
            <span style={{ display: "inline-block", position: "relative", minWidth: "6ch" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="hero-cycling-word"
                  initial={{ opacity: 0, y: -22, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            We architect cloud infrastructure, build revenue-driving web platforms, and deploy
            AI automation for enterprise teams across the <strong style={{ color: "var(--platinum)" }}>
              world
            </strong>. Full-stack delivery with measurable ROI.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
          >
            <MagneticButton>
              <button className="primary shimmer-wrap" onClick={onBooking}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Book Enterprise Discovery Call
                <ArrowRight size={16} />
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link to="/portfolio" className="secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                View Case Studies →
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 12, fontWeight: 600, color: "var(--muted)",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 100, padding: "5px 12px",
              }}>
                <Icon size={13} style={{ color: "#E0BF7A" }} />
                {label}
              </div>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="hero-social-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div className="hero-avatars">
              {["M","S","A","J","R"].map((l, i) => (
                <div key={i} className="hero-avatar" style={{
                  background: `linear-gradient(135deg, ${
                    ["#C9A84C","#A89070","#C4AA88","#8a7050","#C9A84C"][i]
                  }, ${
                    ["#8a6a20","#6a5840","#8a7860","#6a5030","#6a5020"][i]
                  })`,
                }}>
                  {l}
                </div>
              ))}
            </div>
            <span>200+ enterprise teams trust Sync-Oaks</span>
          </motion.div>
        </div>

        {/* Right: Sync-Oaks service visual */}
        <motion.div
          className="hero-visual-wrap"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/sync-oaks-hero-services.png"
            alt="Sync-Oaks web development, cloud, automation, SEO, and analytics workspace"
            className="hero-visual-img"
            loading="eager"
          />
          <div className="hero-visual-overlay" />

          {/* Floating badge — uptime */}
          <motion.div
            style={{
              position: "absolute", top: 18, right: 18, zIndex: 10,
              background: "rgba(13,12,9,0.94)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(201,168,76,0.28)",
              borderRadius: 12, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 9,
              boxShadow: "0 8px 24px rgba(201,168,76,0.16)",
            }}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Shield size={15} style={{ color: "#E0BF7A" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#E0BF7A" }}>99.97% Uptime</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>SLA Guaranteed</div>
            </div>
          </motion.div>

          {/* Floating badge — ROI */}
          <motion.div
            style={{
              position: "absolute", bottom: 18, left: 18, zIndex: 10,
              background: "rgba(13,12,9,0.94)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 12, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 9,
              boxShadow: "0 8px 24px rgba(201,168,76,0.14)",
            }}
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Zap size={15} style={{ color: "#E0BF7A" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#E0BF7A" }}>+340% ROI</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Avg. Client Return</div>
            </div>
          </motion.div>

          {/* Gold corner accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 5,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)",
          }} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="scroll-down-indicator">
        <div className="scroll-down-arrow">
          <div className="scroll-down-dot" />
        </div>
      </div>
    </section>
  );
}
