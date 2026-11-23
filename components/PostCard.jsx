import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate } from "../lib/articles";

export function PostCard({ article }) {
  return (
    <article className="post-card">
      <Link href={`/blog/${article.slug}/`} className="post-media" aria-hidden="true" tabIndex={-1}>
        <img
          src={article.coverImage || "/images/service-webdev.webp"}
          alt=""
          width={720}
          height={405}
          loading="lazy" decoding="async"
          decoding="async"
        />
      </Link>
      <div className="post-body">
        <div className="post-meta">
          <span>{article.category}</span>
          <span>{formatDate(article.date)}</span>
        </div>
        <h3>
          <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
        </h3>
        <p className="post-excerpt">{article.description}</p>
        <div className="post-foot">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Clock size={12} aria-hidden="true" />
            {article.readingMinutes} min read
          </span>
          <Link href={`/blog/${article.slug}/`} className="arrow-link">
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}
