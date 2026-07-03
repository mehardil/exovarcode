import React from "react";
import { ServiceTemplate } from "../../components/ServiceTemplate";
import { seoPlans } from "../../data/content";

const service = {
  id: "seo",
  title: "SEO Optimization",
  tagline: "Growth & ROI",
  image: "/images/service-seo.png",
  heroText:
    "Organic search is the highest-ROI channel in digital marketing. We build the technical foundation, content strategy, and backlink infrastructure needed to rank — and our 24/7 reporting dashboard shows exactly where every dollar of search value comes from.",
  metrics: [
    { value: 215, suffix: "%", label: "Avg Organic Traffic Lift" },
    { value: 4, suffix: "mo", label: "Avg Time to Rank #1" },
    { value: 30, suffix: "+", label: "SEO Clients" },
  ],
};

const miniCase = {
  title: "GreenGlow Organics — #1 Ranking in 4 Months",
  desc: "A health & CPG brand was invisible online despite a great product. We rebuilt their technical SEO architecture, created a content cluster strategy, and built 140 quality backlinks over 4 months.",
  quote: "We went from page 8 to #1 for our main keyword. Organic revenue now accounts for 55% of total sales.",
  author: "Tom H., Marketing Director at GreenGlow",
  metricVal: "#1",
  metricLabel: "Google Ranking",
};

const steps = [
  { title: "Technical Audit", text: "Full crawl of your site — Core Web Vitals, indexability, schema markup, redirect chains, duplicate content, and keyword cannibalization. You get a prioritized fix list." },
  { title: "Keyword & Competitor Strategy", text: "We map your target keywords to buyer intent stages, analyze your top competitors' link profiles, and find the gaps where you can win fastest." },
  { title: "On-Page & Content Optimization", text: "Title tags, meta descriptions, headers, internal linking, and content refreshes. For Growth and Domination plans, we produce new content pieces monthly." },
  { title: "Backlink Building", text: "White-hat outreach campaigns targeting DR 40+ sites in your niche. Every link is placed with editorial context, not paid link spam." },
  { title: "Reporting & Iteration", text: "You get access to a live dashboard showing rankings, traffic, and conversions. Monthly strategy calls keep the roadmap aligned with your business goals." },
];

const faqs = [
  { q: "How long until I see SEO results?", a: "Most clients see measurable ranking improvements in 60–90 days for medium-competition keywords. High-competition niches typically take 4–6 months. We track progress weekly." },
  { q: "What is in the $299/mo SEO Growth plan?", a: "Monthly technical audits, backlink building campaigns, 30 tracked keywords, 4 content pieces per month, and access to the 24/7 reporting dashboard. It is our most popular plan." },
  { q: "Do you use black-hat SEO tactics?", a: "No. Every tactic we use follows Google's guidelines. We have built our reputation on sustainable rankings that don't disappear with the next algorithm update." },
  { q: "Can you work on an existing site or do I need a new one?", a: "We work with existing sites. In fact, technical SEO on an established domain often produces faster results than starting fresh." },
  { q: "What is the 24/7 reporting dashboard?", a: "A live dashboard updated daily showing your keyword positions, organic traffic, backlink growth, and conversion data — all in one view. Available on Growth and Domination plans." },
];

export function SeoOptimization({ openOrder, openBooking }) {
  return (
    <ServiceTemplate
      service={service}
      plans={seoPlans}
      steps={steps}
      faqs={faqs}
      openOrder={openOrder}
      openBooking={openBooking}
      miniCase={miniCase}
    />
  );
}
