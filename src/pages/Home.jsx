import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Globe2, TrendingUp, Clock, ArrowRight, Search, Layers, Code2, Rocket } from "lucide-react";
import { SITE } from "../config/site";
import AuroraHero from "../components/AuroraHero";
import Marquee from "../components/Marquee";
import CountUp from "../components/CountUp";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";
import TextReveal from "../components/TextReveal";
import BentoServices from "../components/BentoServices";
import { CaseStudyVisual } from "../components/CaseStudyVisual";

/* ── Fade-up wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Enterprise client logos ── */
const clientLogos = [
  "TechCorp", "FinEdge", "Global Logistics", "CloudFirst", "DataVault",
  "MediBridge", "FinanceOps", "Pacific Digital", "NexGen Systems", "RetailForce",
  "EnterpriseAI", "SecureCloud", "HealthTech", "GovTech",
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "AWS", "Google Cloud", "Azure",
  "Kubernetes", "Terraform", "PostgreSQL", "Supabase", "Docker", "Vercel",
  "OpenAI", "HubSpot", "Stripe", "MongoDB", "Redis",
];

/* ── Enterprise KPI stats ── */
const stats = [
  { target: 12, suffix: "M+", label: "Revenue Generated for Clients" },
  { target: 200, suffix: "+", label: "Enterprise Projects Delivered" },
  { target: 98, suffix: "%", label: "Client Retention Rate" },
  { target: 4.9, suffix: "/5", label: "Average Client Rating" },
];

/* ── Process steps ── */
const processSteps = [
  { num: "01", Icon: Search,     title: "Discovery",    desc: "Scope, KPIs & roadmap in one strategy call" },
  { num: "02", Icon: Layers,     title: "Architecture", desc: "System design, UI/UX & tech stack" },
  { num: "03", Icon: Code2,      title: "Build",        desc: "Rapid sprints with daily progress updates" },
  { num: "04", Icon: Rocket,     title: "Deploy",       desc: "CI/CD, QA testing & go-live" },
  { num: "05", Icon: TrendingUp, title: "Scale",        desc: "Monitoring, optimisation & growth" },
];

/* ── Enterprise testimonials ── */
const testimonials = [
  {
    quote: "Sync-Oaks rebuilt our entire cloud infrastructure. Zero downtime, 99.97% uptime, and our hosting costs dropped 84% in the first quarter.",
    name: "Marcus Chen",
    title: "VP Engineering",
    company: "CloudStack Enterprise",
    initials: "MC",
    color: "#2563EB",
  },
  {
    quote: "Our organic traffic grew 340% in 5 months. Their technical SEO work is the most methodical and transparent we've experienced.",
    name: "Sarah Mitchell",
    title: "Chief Marketing Officer",
    company: "NovaMart E-Commerce",
    initials: "SM",
    color: "#4F46E5",
  },
  {
    quote: "Lead volume went 4.2× in 90 days. The CRM automation and conversion funnel they built pays for itself every single month.",
    name: "Priya Sharma",
    title: "Head of Growth",
    company: "AutoLead CRM",
    initials: "PS",
    color: "#0EA5E9",
  },
  {
    quote: "The dashboard handles 85,000 daily active users without a single performance issue. Their engineering standards are genuinely enterprise-grade.",
    name: "James Okafor",
    title: "CTO",
    company: "PulseMetrics SaaS",
    initials: "JO",
    color: "#7C3AED",
  },
  {
    quote: "From 6-second load times to 1.1 seconds. Revenue up 680%. The React rebuild was the best investment we made this financial year.",
    name: "Tom Hartley",
    title: "Director of Digital",
    company: "RetailForce Group",
    initials: "TH",
    color: "#0369A1",
  },
  {
    quote: "We went from spreadsheets to a full real-time analytics platform. Reporting time dropped from 3 days to 8 minutes. Remarkable team.",
    name: "Aisha Rahman",
    title: "Head of Data & Analytics",
    company: "DataVault Finance",
    initials: "AR",
    color: "#1D4ED8",
  },
];

/* ── Portfolio teasers ── */
const featuredProjects = [
  {
    key: "novamart", caseSlug: "ecommerce-revenue-jump", visual: "commerce", name: "NovaMart E-Commerce", industry: "E-Commerce",
    category: "web", result: "+680% Revenue in 6 Months",
    desc: "Full-stack headless e-commerce platform with Stripe, CMS, and sub-2s load times.",
    stack: ["React", "Stripe", "Node.js"],
  },
  {
    key: "pulsemetrics", caseSlug: "saas-dashboard-at-scale", visual: "saas", name: "PulseMetrics SaaS", industry: "B2B SaaS",
    category: "saas", result: "10K → 85K Active Users",
    desc: "Real-time analytics SaaS with live dashboards, D3 charts, and multi-tenant architecture.",
    stack: ["Next.js", "D3.js", "Postgres"],
  },
  {
    key: "autolead", caseSlug: "lead-gen-system-for-agency", visual: "marketing", name: "AutoLead CRM", industry: "Lead Generation",
    category: "marketing", result: "4.2× Qualified Lead Volume",
    desc: "Custom CRM + HubSpot automation powering a $2.1M enterprise sales pipeline.",
    stack: ["React", "HubSpot API", "Node"],
  },
];

/* ── Enterprise advantages ── */
const advantages = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    text: "SOC 2-aligned development practices, penetration testing readiness, and security-first architecture for compliance-sensitive industries.",
  },
  {
    icon: Zap,
    title: "60% Faster Delivery",
    text: "Dedicated specialist teams, pre-built component libraries, and automated CI/CD pipelines cut enterprise delivery timelines significantly vs. traditional agencies.",
  },
  {
    icon: Globe2,
    title: "Global Delivery Coverage",
    text: "Flexible communication windows across client timezones. No project management delays, no handoff confusion. Direct access to the specialists building your project.",
  },
  {
    icon: TrendingUp,
    title: "Guaranteed ROI Metrics",
    text: "Every engagement defines hard KPIs upfront. Real-time dashboards track performance, and a 90-day review locks in measurable ROI against agreed targets.",
  },
];

export function Home({ openBooking }) {
  const navigate = useNavigate();
  const go = (path) => { navigate(path); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      {/* ── HERO ── */}
      <AuroraHero onBooking={openBooking} />

      {/* ── ENTERPRISE CREDIBILITY BAR ── */}
      <div className="credibility-bar">
        <p className="credibility-bar-label">Trusted by enterprise teams around the world</p>
        <Marquee speed={36}>
          {clientLogos.map((name) => (
            <span key={name} className="marquee-logo">
              <span className="marquee-logo-dot" />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── KPI STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <div className="stat-number">
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BENTO SERVICES ── */}
      <section style={{ padding: "0 24px 0" }}>
        <FadeUp>
          <div className="section-head wrap" style={{ textAlign: "center", paddingBottom: 40 }}>
            <p className="eyebrow">Enterprise Service Portfolio</p>
            <h2 className="text-gradient" style={{ display: "inline-block" }}>
              Six Specialisms. One Trusted Partner.
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 560, margin: "12px auto 0", fontSize: 16 }}>
              End-to-end digital infrastructure for organisations that demand scalability,
              security, and measurable return on investment.
            </p>
          </div>
        </FadeUp>

        <BentoServices />
      </section>

      {/* ── PORTFOLIO TEASER ── */}
      <section className="portfolio-teaser">
        <div className="section-header">
          <div>
            <p className="eyebrow">Selected Enterprise Work</p>
            <TextReveal as="h2">Real Builds. Verified Results.</TextReveal>
            <p className="section-header-copy">
              Case studies from enterprise clients across e-commerce, SaaS, and B2B
              sectors — each measured against hard revenue and performance KPIs.
            </p>
          </div>
          <Link to="/portfolio" className="secondary small" onClick={() => window.scrollTo({ top: 0 })}>
            View All Case Studies →
          </Link>
        </div>

        <div className="portfolio-teaser-grid">
          {featuredProjects.map((proj, i) => (
            <motion.div
              key={proj.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <TiltCard className="portfolio-card" intensity={5}>
                <div className="portfolio-card-mockup">
                  <CaseStudyVisual type={proj.visual} title={proj.name} />
                  <div className="portfolio-card-overlay">
                    <Link to={`/case-studies/${proj.caseSlug}`} className="primary small" onClick={() => window.scrollTo({ top: 0 })}>
                      View Case Study →
                    </Link>
                  </div>
                </div>
                <div className="portfolio-card-info">
                  <span className={`portfolio-badge ${proj.category}`}>{proj.industry}</span>
                  <h3 className="portfolio-card-title">{proj.name}</h3>
                  <p className="portfolio-card-desc">{proj.desc}</p>
                  <div className="portfolio-card-result">{proj.result}</div>
                  <div className="portfolio-card-footer">
                    <div className="portfolio-stack">
                      {proj.stack.map((s) => <span key={s} className="stack-pill">{s}</span>)}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="portfolio-teaser-cta">
          <MagneticButton>
            <Link to="/portfolio" className="primary shimmer-wrap"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              onClick={() => window.scrollTo({ top: 0 })}>
              Explore All Enterprise Case Studies
              <ArrowRight size={15} />
            </Link>
          </MagneticButton>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section className="process-section">
        <div className="process-section-inner">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 0 }}>
              <p className="eyebrow">Delivery Framework</p>
              <h2>From Brief to Launch in 5 Structured Phases</h2>
              <p style={{ color: "var(--muted)", maxWidth: 520, margin: "10px auto 0" }}>
                A repeatable, transparent delivery process engineered to meet enterprise
                governance requirements — on time, on budget, every engagement.
              </p>
            </div>
          </FadeUp>

          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="process-step active"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                {i < processSteps.length - 1 && <div className="process-step-connector" />}
                <div className="process-step-circle">
                  <step.Icon size={18} strokeWidth={1.8} />
                </div>
                <div className="process-step-title">{step.title}</div>
                <div className="process-step-desc">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p className="eyebrow">Client Outcomes</p>
              <h2>What Enterprise Leaders Say</h2>
              <p style={{ color: "var(--muted)" }}>
                200+ verified enterprise engagements worldwide
              </p>
            </div>
          </FadeUp>

          <div className="testimonials-viewport">
            <motion.div
              className="testimonials-track"
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <motion.div
                  key={`${t.name}-${i}`}
                  className="testimonial-card glass-card"
                  aria-hidden={i >= testimonials.length}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % testimonials.length) * 0.08 }}
                >
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}90)` }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-title">{t.title} · {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE ADVANTAGE ── */}
      <section className="efficiency-section wrap">
        <FadeUp>
          <div className="efficiency-head">
            <p className="eyebrow">The Enterprise Advantage</p>
            <h2>Why global enterprises choose Sync-Oaks over traditional agencies.</h2>
            <p>
              Senior-level specialists, no account manager overhead, and a delivery model
              built for organisations that cannot afford delays or budget overruns.
            </p>
          </div>
        </FadeUp>
        <div className="efficiency-grid">
          {advantages.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={i * 0.08}>
                <TiltCard className="efficiency-card gradient-border" intensity={5}>
                  <div className="efficiency-icon" style={{ fontSize: "unset" }}>
                    <Icon size={26} style={{ color: "#60A5FA" }} />
                  </div>
                  <h3 style={{ marginTop: 6 }}>{item.title}</h3>
                  <p>{item.text}</p>
                </TiltCard>
              </FadeUp>
            );
          })}
        </div>

        {/* Comparison note */}
        <FadeUp delay={0.3}>
          <div className="efficiency-cta">
            <div className="mini-case-content">
              <h4>Enterprise Pricing Without Enterprise Overhead</h4>
              <p className="mini-case-quote">
                "We get senior-developer quality at a price point that would be impossible
                with a traditional high-overhead agency. The ROI is simply unmatched."
                — VP Engineering, Global Logistics Enterprise
              </p>
            </div>
            <div className="mini-case-metric">
              <div className="mini-case-metric-val">84%</div>
              <div className="mini-case-metric-label">Avg. Cost Saving vs. Agency</div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── TECH STACK MARQUEE ── */}
      <section className="credibility-bar" style={{ padding: "36px 24px" }}>
        <p className="credibility-bar-label">Technologies &amp; platforms we build with</p>
        <Marquee speed={40} reverse>
          {techStack.map((t) => (
            <span key={t} className="marquee-logo">
              <span className="marquee-logo-dot" />
              {t}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ── ENTERPRISE CTA BAND ── */}
      <section className="band wrap" style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div className="aurora-bg" />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            <Clock size={13} style={{ display: "inline", marginRight: 6 }} />
            Direct Line. No Intermediaries.
          </p>
          <h2 style={{ margin: "12px 0" }}>
            Book a Free Enterprise Discovery Call
          </h2>
          <p style={{ marginBottom: 28, opacity: 0.82 }}>
            Our enterprise strategists serve clients worldwide.
            You speak directly with the engineers who build your project — from day one.
          </p>
        </div>
        <div className="meeting-links" style={{ position: "relative", zIndex: 1, justifyContent: "center" }}>
          <MagneticButton>
            <button
              className="primary shimmer-wrap"
              onClick={openBooking}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Schedule Discovery Call
              <ArrowRight size={15} />
            </button>
          </MagneticButton>
          <MagneticButton>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Message on WhatsApp
            </a>
          </MagneticButton>
          <a href={`mailto:${SITE.email}?subject=Enterprise%20Project%20Inquiry`}
            style={{ display: "inline-flex", alignItems: "center" }}>
            Send Email Inquiry
          </a>
        </div>
      </section>
    </>
  );
}
