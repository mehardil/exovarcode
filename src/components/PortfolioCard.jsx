import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import MockupFrame from "./MockupFrame";

export default function PortfolioCard({ project }) {
  const {
    key,
    name,
    desc,
    category,
    industry,
    stack,
    result,
    resultLabel,
    mockupType = "browser",
    url,
  } = project;

  const categoryColors = {
    web: "web",
    saas: "saas",
    mobile: "mobile",
    marketing: "marketing",
  };

  return (
    <TiltCard className="portfolio-card" intensity={5}>
      <div className="portfolio-card-mockup">
        <MockupFrame type={mockupType} projectKey={key} url={url} />
        <div className="portfolio-card-overlay">
          <motion.span
            className="primary small"
            style={{ pointerEvents: "none" }}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
          >
            View Case Study →
          </motion.span>
        </div>
      </div>

      <div className="portfolio-card-info">
        <span className={`portfolio-badge ${categoryColors[category] || "web"}`}>
          {industry}
        </span>
        <h3 className="portfolio-card-title">{name}</h3>
        <p className="portfolio-card-desc">{desc}</p>
        <div className="portfolio-card-result">{result}</div>
        <div className="portfolio-card-footer">
          <div className="portfolio-stack">
            {stack.slice(0, 3).map((s) => (
              <span key={s} className="stack-pill">{s}</span>
            ))}
          </div>
          <span className="muted" style={{ fontSize: 11 }}>{resultLabel}</span>
        </div>
      </div>
    </TiltCard>
  );
}
