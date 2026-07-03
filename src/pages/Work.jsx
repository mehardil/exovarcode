import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "../data/content";
import { CaseStudyVisual } from "../components/CaseStudyVisual";
import CountUp from "../components/CountUp";
import TextReveal from "../components/TextReveal";

const SERVICE_FILTERS = [
  { key: "all", label: "All Work" },
  { key: "Web Development", label: "Web Dev" },
  { key: "SEO + Web Dev", label: "SEO" },
  { key: "Digital Marketing", label: "Marketing" },
  { key: "Cloud & DevOps", label: "Cloud" },
  { key: "Automation", label: "Automation" },
  { key: "Data Engineering", label: "Data" },
];

const CASE_METRICS = {
  "E-Commerce Revenue Jump": { val: "+680%", label: "Revenue Growth" },
  "SaaS Dashboard at Scale": { val: "85K", label: "Daily Active Users" },
  "Cloud Migration, Zero Downtime": { val: "99.97%", label: "Uptime Achieved" },
  "Lead Gen System for Agency": { val: "4.2x", label: "Lead Volume" },
  "Logistics Workflow Automation": { val: "91%", label: "Processing Time Cut" },
  "Real-Time Analytics Pipeline": { val: "8 min", label: "Report Generation" },
};

export function Work() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? caseStudies
    : caseStudies.filter((c) => c.tag === activeFilter || c.tag.includes(activeFilter));

  return (
    <>
      {/* ── Hero ── */}
      <section className="work-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Case Studies</p>
          <TextReveal as="h1">Real problems. Real solutions. Measurable results.</TextReveal>
          <p style={{ color: "var(--muted)", maxWidth: 540, margin: "12px auto 0" }}>
            Every case study follows the same format: what the business faced, what we built, and what changed.
          </p>

          {/* Mini stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 36, flexWrap: "wrap" }}>
            {[
              { target: 120, suffix: "+", label: "Projects Delivered" },
              { target: 50, suffix: "+", label: "Clients Served" },
              { target: 98, suffix: "%", label: "On-Time Delivery" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "var(--teal)", lineHeight: 1 }}>
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <div className="work-filter">
        {SERVICE_FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-tab${activeFilter === f.key ? " active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Case Studies Grid ── */}
      <section className="case-grid wrap">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const metric = CASE_METRICS[item.title];
            return (
              <motion.article
                key={item.title}
                layout
                className="case-card"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
              >
                <Link className="case-card-media" to={`/case-studies/${item.slug}`} aria-label={`Read ${item.title} case study`}>
                  <CaseStudyVisual type={item.visual} title={item.title} />
                </Link>
                <div className="case-body">
                  <span className="case-card-tag">{item.tag}</span>
                  <h3>
                    <Link to={`/case-studies/${item.slug}`}>{item.title}</Link>
                  </h3>
                  {metric && (
                    <div className="case-card-metric">{metric.val}
                      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", marginLeft: 6 }}>
                        {metric.label}
                      </span>
                    </div>
                  )}
                  <div className="case-psr">
                    <div className="psr-block">
                      <span className="psr-label problem">Problem</span>
                      <p>{item.problem}</p>
                    </div>
                    <div className="psr-block">
                      <span className="psr-label solution">Solution</span>
                      <p>{item.solution}</p>
                    </div>
                    <div className="psr-block">
                      <span className="psr-label result">Result</span>
                      <p className="result-text">{item.result}</p>
                    </div>
                  </div>
                  <Link className="case-card-link" to={`/case-studies/${item.slug}`}>
                    View case study
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>
    </>
  );
}
