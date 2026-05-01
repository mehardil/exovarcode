import React from "react";
import { ServiceTemplate } from "../../components/ServiceTemplate";
import { marketingPlans } from "../../data/content";

const service = {
  id: "marketing",
  title: "Digital Marketing",
  tagline: "Lead Generation",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
  heroText:
    "We build lead generation machines — not vanity campaigns. Every strategy we deploy is tracked to revenue: cost-per-lead, qualified pipeline, and conversion rate. From paid ads to email funnels, we engineer marketing that pays for itself.",
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
    />
  );
}
