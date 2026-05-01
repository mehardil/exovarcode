import React from "react";
import { ServiceTemplate } from "../../components/ServiceTemplate";
import { seoPlans } from "../../data/content";

const service = {
  id: "seo",
  title: "SEO Optimization",
  tagline: "Growth & ROI",
  image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1400&q=85",
  heroText:
    "Organic search is the highest-ROI channel in digital marketing. We build the technical foundation, content strategy, and backlink infrastructure needed to rank — and our 24/7 reporting dashboard shows exactly where every dollar of search value comes from.",
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
    />
  );
}
