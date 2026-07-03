import React from "react";
import { ServiceTemplate } from "../../components/ServiceTemplate";
import { cloudPlans } from "../../data/content";

const service = {
  id: "cloud",
  title: "Cloud & Automation",
  tagline: "Scale & Security",
  image: "/images/service-cloud.png",
  heroText:
    "Unreliable infrastructure and manual processes are silent profit killers. We architect cloud systems on AWS, GCP, and Azure that scale without drama — and build automation layers that eliminate the repetitive work your team should not be doing.",
  metrics: [
    { value: 99, suffix: ".98%", label: "Avg Uptime Delivered" },
    { value: 60, suffix: "%", label: "Avg Infra Cost Reduction" },
    { value: 20, suffix: "+", label: "Cloud Migrations" },
  ],
};

const miniCase = {
  title: "CloudStack B2B — Zero-Downtime AWS Migration",
  desc: "An enterprise SaaS company was on unreliable shared hosting with 99.1% uptime and $18K/month in infra costs. We migrated them to AWS ECS with Terraform IaC and cut costs by 60%.",
  quote: "We haven't had a single incident since migration. Uptime is 99.98% and our bill dropped from $18K to $7K per month.",
  author: "Marcus C., VP Engineering at CloudStack",
  metricVal: "99.98%",
  metricLabel: "Uptime Achieved",
};

const steps = [
  { title: "Infrastructure Audit", text: "We review your current setup — hosting costs, uptime history, bottlenecks, and manual processes. You get a prioritized roadmap showing exactly where you are leaving money on the table." },
  { title: "Architecture Design", text: "A detailed infrastructure plan: compute, databases, networking, storage, and CI/CD pipeline. Designed for your scale today and 10x growth tomorrow." },
  { title: "Migration or Build", text: "Zero-downtime migration from legacy hosting, or greenfield infrastructure build. All environments (dev, staging, prod) configured with identical setups to prevent surprises." },
  { title: "Automation Layer", text: "Workflow automations connecting your tools — Slack alerts, CRM syncing, report generation, order processing, or any repetitive operation your team wants to eliminate." },
  { title: "Monitoring & Handover", text: "24/7 uptime monitoring, automated alerts, and a full runbook your team can follow. Monthly infrastructure reviews on Scale and Enterprise plans." },
];

const faqs = [
  { q: "Which cloud providers do you work with?", a: "AWS, Google Cloud Platform, Azure, and Vercel/Railway for smaller deployments. We recommend the right provider based on your use case and team familiarity." },
  { q: "Can you migrate our existing app without downtime?", a: "Yes. Our migration process uses blue-green deployments — your old environment stays live until the new one is verified healthy. Zero-downtime is standard practice." },
  { q: "What is workflow automation?", a: "Automations that connect your tools — for example, a new Shopify order triggers a warehouse pick request, a Slack alert, and a customer email. Built with Zapier, n8n, or custom code depending on complexity." },
  { q: "Do you offer ongoing managed cloud services?", a: "Yes — all three plans are monthly retainers covering ongoing monitoring, incident response, and infrastructure updates. We act as your cloud operations team." },
  { q: "What does the $499/mo Cloud Scale plan include?", a: "CI/CD pipeline setup, auto-scaling configuration, database management, 24/7 monitoring with alerting, security review, and workflow automation. Our most popular tier for growing SaaS products." },
];

export function CloudAutomation({ openOrder, openBooking }) {
  return (
    <ServiceTemplate
      service={service}
      plans={cloudPlans}
      steps={steps}
      faqs={faqs}
      openOrder={openOrder}
      openBooking={openBooking}
      miniCase={miniCase}
    />
  );
}
