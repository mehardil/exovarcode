import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "../data/content";

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.46, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Work() {
  return (
    <>
      <section className="section-head wrap">
        <FadeUp>
          <p className="eyebrow">Case Studies</p>
          <h2>Real problems. Real solutions. Measurable results.</h2>
          <p>Every case study follows the same format: what the business faced, what we built, and what changed.</p>
        </FadeUp>
      </section>

      <section className="case-grid wrap">
        {caseStudies.map((item, i) => (
          <FadeUp key={item.title} delay={i * 0.07}>
            <article className="case-card">
              <img src={item.image} alt="" loading="lazy" />
              <div className="case-body">
                <span className="case-tag">{item.tag}</span>
                <h3>{item.title}</h3>
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
              </div>
            </article>
          </FadeUp>
        ))}
      </section>
    </>
  );
}
