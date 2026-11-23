import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <Link href="/" aria-label="Home">
        <Home size={13} aria-hidden="true" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.name}-${item.href || "current"}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <ChevronRight className="sep" size={13} aria-hidden="true" />
            {isLast || !item.href ? (
              <span aria-current={isLast ? "page" : undefined}>{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
