import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import TiltCard from "../components/TiltCard";
import { CaseStudyVisual } from "../components/CaseStudyVisual";
import MagneticButton from "../components/MagneticButton";
import TextReveal from "../components/TextReveal";
import CountUp from "../components/CountUp";
import { SITE } from "../config/site";

/* ── Portfolio data ── */
const PROJECTS = [
  {
    key: "novamart",
    name: "NovaMart",
    desc: "Full-stack e-commerce platform with dynamic pricing, Stripe checkout, and headless CMS. Launched in 8 weeks.",
    category: "web",
    industry: "E-Commerce",
    stack: ["React", "Stripe", "Node.js", "Sanity CMS"],
    result: "+340%",
    resultLabel: "Revenue in 6 months",
    result2: "2.1s",
    result2Label: "Page load time",
    mockupType: "browser",
    url: "novamart.io",
    featured: true,
  },
  {
    key: "pulsemetrics",
    name: "PulseMetrics",
    desc: "Real-time SaaS analytics platform serving 85K daily active users with live D3.js dashboards.",
    category: "saas",
    industry: "Analytics SaaS",
    stack: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
    result: "85K",
    resultLabel: "Daily active users",
    mockupType: "browser",
    url: "pulsemetrics.io",
  },
  {
    key: "autolead",
    name: "AutoLead CRM",
    desc: "Custom lead management CRM with HubSpot API integration and automated email sequences.",
    category: "marketing",
    industry: "Lead Generation",
    stack: ["React", "HubSpot API", "Node.js", "MongoDB"],
    result: "4.2×",
    resultLabel: "Lead volume increase",
    mockupType: "browser",
    url: "autolead.io",
  },
  {
    key: "greenglow",
    name: "GreenGlow Organics",
    desc: "Brand-first marketing website with technical SEO architecture that captured the #1 organic rank.",
    category: "web",
    industry: "Health & CPG",
    stack: ["Next.js", "Sanity CMS", "Vercel", "Ahrefs API"],
    result: "#1",
    resultLabel: "Google ranking (target KW)",
    mockupType: "browser",
    url: "greengloworganics.com",
  },
  {
    key: "taskflow",
    name: "TaskFlow Pro",
    desc: "Cross-platform productivity app with real-time sync, offline support, and team collaboration.",
    category: "mobile",
    industry: "Productivity",
    stack: ["React Native", "Firebase", "Redux", "Expo"],
    result: "50K",
    resultLabel: "Downloads in 30 days",
    mockupType: "phone",
    url: "taskflowapp.io",
  },
  {
    key: "cloudstack",
    name: "CloudStack B2B",
    desc: "Enterprise SaaS platform with AWS infrastructure, Terraform IaC, and 99.98% uptime SLA.",
    category: "saas",
    industry: "Infrastructure",
    stack: ["Next.js", "AWS", "Terraform", "GraphQL"],
    result: "99.98%",
    resultLabel: "Uptime achieved",
    mockupType: "browser",
    url: "cloudstack.io",
  },
  {
    key: "fitlife",
    name: "FitLife App",
    desc: "Fitness tracking mobile app with AI workout recommendations, wearable sync, and social challenges.",
    category: "mobile",
    industry: "Health & Fitness",
    stack: ["React Native", "Supabase", "OpenAI API", "Expo"],
    result: "4.8★",
    resultLabel: "App Store rating",
    mockupType: "phone",
    url: "fitlifeapp.io",
  },
  {
    key: "educonnect",
    name: "EduConnect",
    desc: "EdTech platform with live video streaming, course builder, and student progress analytics.",
    category: "web",
    industry: "EdTech",
    stack: ["Next.js", "Video.js", "Stripe", "Postgres"],
    result: "12K",
    resultLabel: "Active students",
    mockupType: "browser",
    url: "educonnect.io",
  },
  {
    key: "streamops",
    name: "StreamOps",
    desc: "DevOps SaaS platform with Kubernetes orchestration, GitOps workflow, and cost optimization AI.",
    category: "saas",
    industry: "DevOps",
    stack: ["React", "GraphQL", "Kubernetes", "Go"],
    result: "60%",
    resultLabel: "Infrastructure cost cut",
    mockupType: "browser",
    url: "streamops.io",
  },
];

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Dev" },
  { key: "saas", label: "SaaS" },
  { key: "mobile", label: "Mobile" },
  { key: "marketing", label: "Marketing" },
];

const categoryStats = [
  { target: 9, suffix: "", label: "Projects Shown" },
  { target: 50, suffix: "+", label: "Total Clients" },
  { target: 120, suffix: "+", label: "Projects Delivered" },
  { target: 98, suffix: "%", label: "On-Time Delivery" },
];

const visualByProject = {
  novamart: "commerce",
  pulsemetrics: "saas",
  autolead: "marketing",
  greenglow: "commerce",
  taskflow: "automation",
  cloudstack: "cloud",
  fitlife: "automation",
  educonnect: "data",
  streamops: "cloud",
};

export default function Portfolio({ openBooking }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const featured = PROJECTS.find((p) => p.featured);
  const grid = PROJECTS.filter((p) => !p.featured);
  const filtered = activeFilter === "all" ? grid : grid.filter((p) => p.category === activeFilter);

  return (
    <div className="portfolio-page">
      {/* ── Hero ── */}
      <motion.div
        className="portfolio-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="eyebrow">Our Portfolio</p>
        <TextReveal as="h1">Real Builds. Proven Results.</TextReveal>
        <p>
          9 showcase projects across e-commerce, SaaS, mobile apps, and marketing — each with
          measurable outcomes that prove our craft.
        </p>
      </motion.div>

      {/* ── Stats row ── */}
      <div style={{ maxWidth: 900, margin: "0 auto 48px", padding: "0 24px" }}>
        <div className="stats-grid">
          {categoryStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="stat-number">
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${activeFilter === f.key ? "active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Featured project ── */}
      {(activeFilter === "all" || activeFilter === featured.category) && (
        <motion.div
          className="portfolio-featured"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ★ Featured Project
            </span>
          </div>
          <TiltCard intensity={3} className="portfolio-featured-card gradient-border">
            <div className="portfolio-featured-mockup">
              <CaseStudyVisual type={visualByProject[featured.key]} title={featured.name} />
            </div>
            <div className="portfolio-featured-info">
              <span className={`portfolio-badge ${featured.category}`}>{featured.industry}</span>
              <h2>{featured.name}</h2>
              <p>{featured.desc}</p>

              <div className="portfolio-results">
                <div className="portfolio-result">
                  <div className="portfolio-result-val">{featured.result}</div>
                  <div className="portfolio-result-label">{featured.resultLabel}</div>
                </div>
                <div className="portfolio-result">
                  <div className="portfolio-result-val">{featured.result2}</div>
                  <div className="portfolio-result-label">{featured.result2Label}</div>
                </div>
              </div>

              <div className="portfolio-stack">
                {featured.stack.map((s) => (
                  <span key={s} className="stack-pill">{s}</span>
                ))}
              </div>

              <MagneticButton onClick={openBooking}>
                <button className="primary">Build Something Similar →</button>
              </MagneticButton>
            </div>
          </TiltCard>
        </motion.div>
      )}

      {/* ── Grid ── */}
      <div className="portfolio-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.key}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <TiltCard className="portfolio-card" intensity={5}>
                <div className="portfolio-card-mockup">
                  <CaseStudyVisual type={visualByProject[proj.key]} title={proj.name} />
                  <div className="portfolio-card-overlay">
                    <motion.button
                      className="primary small"
                      onClick={openBooking}
                      style={{ pointerEvents: "auto" }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Build Similar →
                    </motion.button>
                  </div>
                </div>

                <div className="portfolio-card-info">
                  <span className={`portfolio-badge ${proj.category}`}>{proj.industry}</span>
                  <h3 className="portfolio-card-title">{proj.name}</h3>
                  <p className="portfolio-card-desc">{proj.desc}</p>
                  <div className="portfolio-card-result">{proj.result}</div>
                  <div className="portfolio-card-footer">
                    <div className="portfolio-stack">
                      {proj.stack.slice(0, 3).map((s) => (
                        <span key={s} className="stack-pill">{s}</span>
                      ))}
                    </div>
                    <span className="muted" style={{ fontSize: 11 }}>{proj.resultLabel}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── CTA band ── */}
      <section className="band" style={{ position: "relative", overflow: "hidden" }}>
        <div className="aurora-bg" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="eyebrow">Your Project Next</p>
          <h2>Ready to build something exceptional?</h2>
          <p>Every project starts with a free 30-minute strategy call. No commitments, just clarity.</p>
        </div>
        <div className="meeting-links" style={{ position: "relative", zIndex: 1 }}>
          <MagneticButton onClick={openBooking}>
            <button className="primary shimmer-wrap" onClick={openBooking}>Book Free Strategy Call</button>
          </MagneticButton>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp Us</a>
          <Link to="/services">View Pricing →</Link>
        </div>
      </section>
    </div>
  );
}
