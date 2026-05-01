export const services = [
  {
    id: "web",
    title: "Web Development",
    icon: "WD",
    slug: "/services/web-development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85",
    tagline: "Performance & React",
    text: "Custom React apps, landing pages, SaaS portals, dashboards, and production-ready deployments with 48-hour standard turnaround.",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    icon: "SEO",
    slug: "/services/seo-optimization",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=85",
    tagline: "Growth & ROI",
    text: "Technical SEO audits, backlink building, content strategy, and a 24/7 reporting dashboard that shows exactly where your revenue comes from.",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: "DM",
    slug: "/services/digital-marketing",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
    tagline: "Lead Generation",
    text: "Conversion-focused campaigns, paid ads on Google and Meta, email funnels, and creative strategies engineered for measurable lead growth.",
  },
  {
    id: "cloud",
    title: "Cloud & Automation",
    icon: "CA",
    slug: "/services/cloud-automation",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
    tagline: "Scale & Security",
    text: "AWS, GCP, Azure deployments with CI/CD pipelines, workflow automation, CRM syncing, and 24/7 infrastructure monitoring.",
  },
  {
    id: "data",
    title: "Data Engineering",
    icon: "DE",
    slug: null,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    tagline: "Insights at Scale",
    text: "ETL pipelines, data warehouses, analytics dashboards, and real-time reporting that turns raw data into revenue decisions.",
  },
  {
    id: "automation",
    title: "AI Automation",
    icon: "AI",
    slug: null,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    tagline: "Work Smarter",
    text: "AI-powered workflow automation, intelligent bots, CRM integrations, and custom systems that eliminate repetitive operations at scale.",
  },
];

export const webPlans = [
  {
    name: "Standard Web Package",
    price: "$499",
    badge: null,
    features: ["5 Pages", "Mobile Responsive", "SEO Ready", "48-hour Delivery", "Contact Form Integration", "1 Round of Revisions"],
  },
  {
    name: "Business Growth Package",
    price: "$1,499",
    badge: "Best Value",
    features: ["Custom React App", "CMS Integration", "Advanced SEO Setup", "Speed Optimization", "Admin Dashboard", "Priority Support"],
  },
  {
    name: "Enterprise Custom",
    price: "Custom",
    badge: null,
    features: ["Full SaaS Build", "Cloud Deployment", "Payment Integration", "Auth System", "Unlimited Revisions", "Dedicated Manager"],
  },
];

export const seoPlans = [
  {
    name: "SEO Starter",
    price: "$99/mo",
    badge: null,
    features: ["10 Keywords", "On-page Optimization", "Search Console Setup", "Monthly Audit Report", "Google Analytics Setup"],
  },
  {
    name: "SEO Growth",
    price: "$299/mo",
    badge: "Most Popular",
    features: ["Monthly Audits", "Backlink Building", "30 Keywords", "24/7 Reporting Dashboard", "4 Content Pieces/mo", "Weekly Strategy Call"],
  },
  {
    name: "SEO Domination",
    price: "$599/mo",
    badge: null,
    features: ["Unlimited Keywords", "Premium Backlinks", "Daily Rank Tracking", "Competitor Analysis", "8 Content Pieces/mo", "Dedicated SEO Lead"],
  },
];

export const marketingPlans = [
  {
    name: "Launch Campaign",
    price: "$149/mo",
    badge: null,
    features: ["2 Platforms", "8 Posts/month", "Basic Ad Spend Mgmt", "Monthly Analytics Report", "Email List Setup"],
  },
  {
    name: "Growth Engine",
    price: "$399/mo",
    badge: "Best Value",
    features: ["4 Platforms", "20 Posts/month", "Google + Meta Ads", "Email Funnels", "Conversion Tracking", "Bi-weekly Strategy"],
  },
  {
    name: "Performance Pro",
    price: "$799/mo",
    badge: null,
    features: ["Full Funnel Management", "Video/Reels Content", "A/B Testing", "CRM Integration", "Dedicated Strategist", "ROI Guarantee"],
  },
];

export const cloudPlans = [
  {
    name: "Cloud Starter",
    price: "$199/mo",
    badge: null,
    features: ["Single Deployment", "SSL & Domain Setup", "Basic Monitoring", "Automated Backups", "Support Tickets"],
  },
  {
    name: "Cloud Scale",
    price: "$499/mo",
    badge: "Best Value",
    features: ["CI/CD Pipeline", "Auto Scaling", "Database Management", "24/7 Monitoring", "Security Review", "Workflow Automation"],
  },
  {
    name: "Cloud Enterprise",
    price: "$999/mo",
    badge: null,
    features: ["Multi-cloud Architecture", "Kubernetes-ready", "Disaster Recovery", "Compliance Review", "SLA Guarantee", "Dedicated Engineer"],
  },
];

export const caseStudies = [
  {
    title: "E-Commerce Revenue Jump",
    tag: "SEO + Web Dev",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=85",
    problem: "200 monthly visitors, 0.4% conversion rate, no SEO strategy, 6-second load times.",
    solution: "Full technical SEO overhaul, React rebuild cutting load time to 1.1s, structured content strategy.",
    result: "4,200 monthly visitors in 90 days. Conversion at 3.1%. Revenue up 680%.",
  },
  {
    title: "SaaS Dashboard at Scale",
    tag: "Full-Stack",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
    problem: "Startup using spreadsheets for 800+ client records. Team spending 15 hrs/week on manual reporting.",
    solution: "Custom React dashboard with real-time data sync, automated reporting, and role-based access.",
    result: "15 hrs/week reclaimed. Reporting errors at zero. Client onboarding cut from 3 days to 2 hours.",
  },
  {
    title: "Cloud Migration, Zero Downtime",
    tag: "Cloud & DevOps",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    problem: "Legacy hosting costing $2,400/mo with 99.1% uptime and no CI/CD — every deploy was a gamble.",
    solution: "Migrated to AWS with containerized architecture, full CI/CD pipeline, and auto-scaling.",
    result: "Infrastructure cost dropped to $380/mo. Uptime at 99.97%. Deploys take 4 minutes, not 4 hours.",
  },
  {
    title: "Lead Gen System for Agency",
    tag: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85",
    problem: "$3,500/mo in ads, no tracking, 8% CTR, and unqualified leads flooding the pipeline.",
    solution: "Rebuilt full funnel: landing pages, Meta + Google campaigns, CRM automation, conversion tracking.",
    result: "Cost-per-lead dropped from $47 to $11. Qualified leads up 340%. Ad spend cut to $1,800/mo.",
  },
  {
    title: "Logistics Workflow Automation",
    tag: "Automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    problem: "Team manually processing 200+ daily orders across 3 platforms with a 12% error rate.",
    solution: "Built automation layer connecting Shopify, warehouse system, and courier APIs with error alerts.",
    result: "Error rate dropped to 0.3%. Processing time cut by 91%. Team of 4 handles volume of 12.",
  },
  {
    title: "Real-Time Analytics Pipeline",
    tag: "Data Engineering",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    problem: "Analytics firm waiting 3+ days for reports. Raw data scattered across 6 disconnected sources.",
    solution: "Unified ETL pipeline into a real-time warehouse with automated dashboards and alerting.",
    result: "Reports generated in 8 minutes. 6 sources unified. Decision latency cut by 85%.",
  },
];

export const work = caseStudies;

export const plans = {
  seo: [
    ["SEO Starter", "$99/mo", "10 keywords", "On-page optimization", "Search Console setup", "Monthly report"],
    ["SEO Growth", "$299/mo", "30 keywords", "Backlink building", "24/7 reporting dashboard", "Weekly strategy call"],
    ["SEO Domination", "$599/mo", "Unlimited keywords", "Premium backlinks", "8 content pieces/mo", "Dedicated SEO lead"],
  ],
  fullstack: [
    ["Standard Web", "$499", "5 pages", "Mobile responsive", "SEO ready", "48-hour delivery"],
    ["Business Growth", "$1,499", "Custom React app", "CMS integration", "Advanced SEO", "Speed optimization"],
    ["Enterprise", "Custom", "Full SaaS build", "Cloud deployment", "Payment integration", "Dedicated manager"],
  ],
  marketing: [
    ["Launch Campaign", "$149/mo", "2 platforms", "8 posts/month", "Basic analytics", "Ad account setup"],
    ["Growth Engine", "$399/mo", "4 platforms", "20 posts/month", "Google + Meta ads", "Email funnels"],
    ["Performance Pro", "$799/mo", "Full funnel", "Video/reels content", "A/B testing", "ROI guarantee"],
  ],
  cloud: [
    ["Cloud Starter", "$199/mo", "Single deployment", "SSL/domain setup", "Basic monitoring", "Backup setup"],
    ["Cloud Scale", "$499/mo", "CI/CD pipeline", "Auto scaling", "24/7 monitoring", "Workflow automation"],
    ["Cloud Enterprise", "$999/mo", "Multi-cloud architecture", "Kubernetes-ready", "Disaster recovery", "SLA guarantee"],
  ],
};
