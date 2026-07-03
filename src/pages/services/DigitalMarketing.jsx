import React from "react";
import { ServiceTemplate } from "../../components/ServiceTemplate";
import { marketingPlans } from "../../data/content";

const service = {
  id: "marketing",
  title: "Digital Marketing",
  tagline: "Lead Generation",
  image: "/images/service-marketing.png",
  heroText:
    "We build lead generation machines — not vanity campaigns. Every strategy we deploy is tracked to revenue: cost-per-lead, qualified pipeline, and conversion rate. From paid ads to email funnels, we engineer marketing that pays for itself.",
  metrics: [
    { value: 4, suffix: "×", label: "Avg Lead Volume Increase" },
    { value: 68, suffix: "%", label: "Avg Conversion Rate Lift" },
    { value: 2, suffix: "M+", label: "Pipeline Generated" },
  ],
};

const miniCase = {
  title: "AutoLead CRM — 4.2× Lead Volume in 90 Days",
  desc: "A B2B SaaS company had a product but no reliable lead engine. We built a full-funnel strategy: Google Ads, LinkedIn outreach, automated email sequences, and HubSpot CRM integration.",
  quote: "Our pipeline went from $500K to $2.1M in a single quarter. The ROI on Sync-Oaks' work is genuinely remarkable.",
  author: "Priya S., Head of Growth at AutoLead",
  metricVal: "4.2×",
  metricLabel: "Lead Volume Increase",
};

const steps = [
  { title: "Funnel Audit & Strategy", text: "We map your current acquisition funnel, identify leaks, and build a 90-day plan covering platforms, budgets, and target CPL by channel." },
  { title: "Landing Page & Creative", text: "High-conversion landing pages and ad creatives built around your offer. Every element — headline, CTA, form — is tested and optimized for your audience." },
  { title: "Campaign Launch", text: "Paid campaigns launched on your chosen platforms (Google, Meta, LinkedIn). Ad accounts, pixels, and conversion tracking fully configured before spending a dollar." },
  { title: "Email & Nurture System", text: "Automated email sequences that convert cold leads into warm prospects. CRM integration ensures no lead slips through. Available on Growth and Pro plans." },
  { title: "Optimization & Reporting", text: "Weekly performance reviews with budget reallocation toward top-performing ads. You see exactly what your ad spend is generating — down to the dollar." },
];

const faqs = [
  { q: "What platforms do you run ads on?", a: "Google Search, Google Display, Meta (Facebook + Instagram), and LinkedIn. We recommend channels based on your audience and budget in the strategy call." },
  { q: "What is a typical cost-per-lead?", a: "This varies by industry. Our case studies show reductions from $47 CPL to $11 CPL through funnel optimization. We set CPL targets in the initial strategy and track against them weekly." },
  { q: "Do I need to provide ad creatives?", a: "No. We create all ad copy, static images, and where applicable, video/reels briefs. Performance Pro includes video content as standard." },
  { q: "Is my ad spend included in the monthly fee?", a: "No — ad spend goes directly to the platforms. Our monthly fee covers strategy, creative, management, and reporting. We recommend a minimum ad spend of $500/mo." },
  { q: "What is CRM integration?", a: "We connect your lead forms to a CRM (HubSpot, Zoho, or similar) so leads are automatically logged, assigned, and triggered into email sequences. Available on Growth and Pro plans." },
];

export function DigitalMarketing({ openOrder, openBooking }) {
  return (
    <ServiceTemplate
      service={service}
      plans={marketingPlans}
      steps={steps}
      faqs={faqs}
      openOrder={openOrder}
      openBooking={openBooking}
      miniCase={miniCase}
    />
  );
}
