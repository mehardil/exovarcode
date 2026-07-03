const visualConfig = {
  commerce: {
    label: "Commerce Command",
    metric: "+680%",
    bars: [42, 58, 64, 78, 92],
    panels: ["Checkout", "Catalog", "SEO", "Revenue"],
  },
  saas: {
    label: "SaaS Operations",
    metric: "85K",
    bars: [35, 48, 62, 55, 74, 88, 95],
    panels: ["Users", "MRR", "Churn", "Health"],
  },
  cloud: {
    label: "Cloud Reliability",
    metric: "99.97%",
    bars: [82, 84, 88, 91, 94, 97],
    panels: ["API", "CDN", "DB", "CI/CD"],
  },
  marketing: {
    label: "Growth Pipeline",
    metric: "4.2x",
    bars: [24, 38, 52, 70, 86],
    panels: ["Ads", "CRM", "Email", "CPL"],
  },
  automation: {
    label: "Workflow Engine",
    metric: "91%",
    bars: [30, 45, 66, 80, 91],
    panels: ["Orders", "Rules", "Alerts", "Sync"],
  },
  data: {
    label: "Data Platform",
    metric: "8m",
    bars: [52, 68, 61, 86, 78, 94],
    panels: ["ETL", "Warehouse", "BI", "Alerts"],
  },
};

export function CaseStudyVisual({ type = "saas", title = "Case study", className = "" }) {
  const config = visualConfig[type] || visualConfig.saas;

  return (
    <div className={`case-visual ${className}`} role="img" aria-label={`${title} product dashboard preview`}>
      <div className="case-visual-grid" />
      <div className="case-visual-top">
        <div>
          <span className="case-visual-kicker">{config.label}</span>
          <strong>{title}</strong>
        </div>
        <div className="case-visual-live">Live</div>
      </div>

      <div className="case-visual-main">
        <div className="case-visual-chart">
          <div className="case-visual-chart-head">
            <span>Performance Index</span>
            <strong>{config.metric}</strong>
          </div>
          <div className="case-visual-bars">
            {config.bars.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="case-visual-side">
          {config.panels.map((panel, index) => (
            <div key={panel} className="case-visual-panel">
              <span>{panel}</span>
              <strong>{[98, 84, 73, 61][index] || 92}%</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="case-visual-flow">
        {[0, 1, 2, 3].map((item) => (
          <span key={item} />
        ))}
      </div>
    </div>
  );
}
