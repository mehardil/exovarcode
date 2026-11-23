import Link from "next/link";
import { ArrowRight, BarChart3, Cloud, Code2, Search, Target, Workflow } from "lucide-react";
import { TiltCard } from "./TiltCard";

const ICONS = { Code2, Search, Workflow, Cloud, BarChart3, Target };

export function ServiceCard({ service, featured = false }) {
  const Icon = ICONS[service.icon] || Code2;
  return (
    <TiltCard className="card card-hover service-card">
      <div className="service-thumb">
        <img src={service.image} alt={service.imageAlt} width={940} height={627} loading="lazy" decoding="async" />
        <span className="tag">{service.tagline}</span>
      </div>
      <span className="card-icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3>
        <Link href={`/services/${service.slug}/`}>{service.name}</Link>
      </h3>
      <p>{service.intro}</p>
      {featured ? (
        <ul className="feature-list">
          {service.includes.slice(0, 4).map((item) => (
            <li key={item}>
              <ArrowRight size={14} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      <Link href={`/services/${service.slug}/`} className="arrow-link">
        Explore {service.shortName}
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </TiltCard>
  );
}
