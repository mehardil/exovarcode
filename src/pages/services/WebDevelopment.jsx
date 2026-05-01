import React from "react";
import { ServiceTemplate } from "../../components/ServiceTemplate";
import { webPlans } from "../../data/content";

const service = {
  id: "web",
  title: "Web Development",
  tagline: "Performance & React",
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
  heroText:
    "We build fast, conversion-optimized React websites and web applications — from $499 landing pages to full SaaS platforms. Every project ships with performance optimization, SEO foundation, and mobile-first design built in from day one.",
};

const steps = [
  { title: "Discovery & Scope", text: "30-minute call to define pages, features, design direction, and launch goals. You get a written scope and timeline before we start." },
  { title: "Design & Architecture", text: "Component-based design in React with your branding. We choose the right stack — Next.js, Vite, or CMS-driven — based on your scalability needs." },
  { title: "Build & Review", text: "Iterative builds with review checkpoints. You see the site early and often, not at the end. Revisions are built into every plan." },
  { title: "Launch & Optimize", text: "Deployment to your domain with SSL, speed optimization, and analytics. Standard packages ship in 48 hours. We stay available post-launch." },
];

const faqs = [
  { q: "What is the $499 Standard Web Package?", a: "It includes a 5-page mobile-responsive React website with basic SEO setup, contact form integration, and deployment. Delivered in 48 hours." },
  { q: "What is included in the $1,499 Business Growth Package?", a: "A custom React app with CMS integration (so you can edit content yourself), advanced SEO, speed optimization, and an admin dashboard. Best value for growing businesses." },
  { q: "Do you build e-commerce stores?", a: "Yes — Shopify, WooCommerce, or custom-built checkout flows with Stripe integration. These fall under our Enterprise Custom tier. Book a call for a scoped quote." },
  { q: "Can I update my site after launch?", a: "Business Growth Package includes CMS integration so you can update pages without code. For Standard packages, we offer a monthly maintenance add-on." },
  { q: "What technologies do you use?", a: "React 19, Next.js, Vite, Node.js, and PostgreSQL or MongoDB depending on the project. All deployments are containerized on AWS, GCP, or Vercel." },
];

export function WebDevelopment({ openOrder, openBooking }) {
  return (
    <ServiceTemplate
      service={service}
      plans={webPlans}
      steps={steps}
      faqs={faqs}
      openOrder={openOrder}
      openBooking={openBooking}
    />
  );
}
