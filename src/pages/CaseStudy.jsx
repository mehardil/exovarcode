import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies } from "../data/content";
import { CaseStudyVisual } from "../components/CaseStudyVisual";

export function CaseStudy({ openBooking }) {
  const { slug } = useParams();
  const item = caseStudies.find((study) => study.slug === slug) || caseStudies[0];

  return (
    <div className="case-detail-page">
      <section className="case-detail-hero wrap">
        <motion.div
          className="case-detail-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Link to="/work" className="case-back-link">
            <ArrowLeft size={15} />
            All Case Studies
          </Link>
          <p className="eyebrow">{item.service}</p>
          <h1>{item.title}</h1>
          <p>{item.result}</p>
          <div className="case-detail-metrics">
            <div>
              <strong>{item.headlineMetric}</strong>
              <span>{item.headlineLabel}</span>
            </div>
            <div>
              <strong>{item.duration}</strong>
              <span>Delivery Window</span>
            </div>
            <div>
              <strong>{item.tag}</strong>
              <span>Primary Workstream</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <CaseStudyVisual type={item.visual} title={item.title} className="case-detail-visual" />
        </motion.div>
      </section>

      <section className="case-detail-breakdown wrap">
        {[
          ["Problem", item.problem],
          ["Solution", item.solution],
          ["Result", item.result],
        ].map(([label, text]) => (
          <article key={label} className="case-detail-block">
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="case-detail-process wrap">
        <div>
          <p className="eyebrow">Execution Model</p>
          <h2>Built like an enterprise engagement.</h2>
        </div>
        <div className="case-detail-steps">
          {["Audit and KPI mapping", "Architecture and sprint plan", "Build, integrate, and test", "Launch, monitor, and optimise"].map((step, index) => (
            <div key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="band wrap case-detail-cta">
        <div>
          <p className="eyebrow">Build Your Version</p>
          <h2>Want this level of execution for your company?</h2>
          <p>Start with a strategy call and get a scoped proposal around your revenue, operations, or platform goals.</p>
        </div>
        <div className="meeting-links">
          <button className="primary shimmer-wrap" onClick={openBooking}>
            Book Discovery Call <ArrowRight size={15} />
          </button>
          <Link to="/services">View Services</Link>
        </div>
      </section>
    </div>
  );
}
