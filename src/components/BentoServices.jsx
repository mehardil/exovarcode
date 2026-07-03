import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Globe2, Search, BarChart3, Cloud, Database, Bot,
  ArrowUpRight,
} from "lucide-react";

const serviceItems = [
  {
    id: "web",
    icon: Globe2,
    image: "/images/service-webdev.png",
    title: "Web Development",
    tagline: "Full-Stack · React · SaaS",
    desc: "Enterprise React apps, SaaS portals, and revenue-optimised platforms deployed with CI/CD pipelines. 48-hour standard turnaround.",
    tags: ["React", "Next.js", "Node.js"],
    status: "Core Service",
    slug: "/services/web-development",
    featured: true,
  },
  {
    id: "seo",
    icon: Search,
    image: "/images/service-seo.png",
    title: "SEO Optimisation",
    tagline: "Growth · Technical · Content",
    desc: "Technical audits, backlink strategy, and a real-time reporting dashboard showing exactly where your revenue comes from.",
    tags: ["Audit", "Backlinks", "Content"],
    status: "ROI-Driven",
    slug: "/services/seo-optimization",
  },
  {
    id: "marketing",
    icon: BarChart3,
    image: "/images/service-marketing.png",
    title: "Digital Marketing",
    tagline: "Lead Gen · Paid Ads · Funnels",
    desc: "Conversion-focused campaigns across Google and Meta, email automation, and CRM-connected lead pipelines.",
    tags: ["Google Ads", "Meta", "Email"],
    status: "Growth Engine",
    slug: "/services/digital-marketing",
  },
  {
    id: "cloud",
    icon: Cloud,
    image: "/images/service-cloud.png",
    title: "Cloud & Automation",
    tagline: "AWS · GCP · Azure · DevOps",
    desc: "Multi-cloud architecture, Kubernetes-ready deployments, CI/CD pipelines, and 24/7 infrastructure monitoring with SLA guarantees.",
    tags: ["AWS", "CI/CD", "K8s"],
    status: "Enterprise SLA",
    slug: "/services/cloud-automation",
    featured: true,
  },
  {
    id: "data",
    icon: Database,
    image: "/images/service-data.png",
    title: "Data Engineering",
    tagline: "ETL · Warehousing · Analytics",
    desc: "Real-time ETL pipelines, unified data warehouses, and automated dashboards that turn raw data into actionable revenue decisions.",
    tags: ["ETL", "BigQuery", "Dashboards"],
    status: "Insight at Scale",
    slug: null,
  },
  {
    id: "automation",
    icon: Bot,
    image: "/images/service-ai.png",
    title: "Private AI Models",
    tagline: "LLMs · Automation · Workflows",
    desc: "Custom AI-powered workflows, private LLM deployments, intelligent bots, and automation layers that eliminate manual operations at scale.",
    tags: ["LLM", "Workflow", "Bots"],
    status: "Next-Gen",
    slug: null,
  },
];

function BentoCard({ service, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const navigate = useNavigate();
  const Icon = service.icon;

  const handleClick = () => {
    if (service.slug) {
      navigate(service.slug);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={ref}
      className="bento-glass-item"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "100%" }}
    >
      <button
        className={`bento-glass-card${service.featured ? " featured" : ""}`}
        onClick={handleClick}
        style={{ width: "100%", textAlign: "left", border: "none", cursor: service.slug ? "pointer" : "default" }}
      >
        {/* Background image */}
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          className="bento-card-bg"
          loading="lazy"
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div className="bento-glass-icon">
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <span className="bento-glass-status">{service.status}</span>
        </div>

        {/* Body */}
        <div className="bento-glass-body">
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted)" }}>
              {service.tagline}
            </p>
            <h3>{service.title}</h3>
          </div>
          <p>{service.desc}</p>

          {/* Tags */}
          <div className="bento-glass-tags">
            {service.tags.map((tag) => (
              <span key={tag} className="bento-glass-tag">#{tag}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {service.slug && (
          <div className="bento-glass-cta" style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            Explore Service <ArrowUpRight size={13} />
          </div>
        )}
      </button>
    </motion.div>
  );
}

export default function BentoServices() {
  return (
    <div className="bento-glass-grid">
      {serviceItems.map((service, i) => (
        <BentoCard key={service.id} service={service} delay={i * 0.08} />
      ))}
    </div>
  );
}
