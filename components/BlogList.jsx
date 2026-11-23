import Link from "next/link";
import { PostCard } from "./PostCard";
import { categorySlug } from "../lib/articles";

export function CategoryPills({ categories, current }) {
  return (
    <div className="badge-row" style={{ marginBottom: "2rem" }}>
      <Link
        href="/blog/"
        className={`badge${!current ? " active" : ""}`}
        style={!current ? { borderColor: "var(--gold)", color: "var(--gold-2)" } : undefined}
      >
        All articles
      </Link>
      {categories.map((category) => {
        const isActive = current === category.name;
        return (
          <Link
            key={category.name}
            href={`/blog/category/${categorySlug(category.name)}/`}
            className="badge"
            style={isActive ? { borderColor: "var(--gold)", color: "var(--gold-2)" } : undefined}
          >
            {category.name} <span style={{ opacity: 0.6 }}>{category.count}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function BlogList({ articles, categories, currentCategory }) {
  return (
    <>
      <CategoryPills categories={categories} current={currentCategory} />
      <div className="post-grid">
        {articles.map((article) => (
          <PostCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}

export function Pagination({ page, totalPages, basePath = "/blog" }) {
  if (totalPages <= 1) return null;
  const hrefFor = (n) => (n === 1 ? `${basePath}/` : `${basePath}/page/${n}/`);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <nav className="pagination" aria-label="Blog pagination">
      {page > 1 ? <Link href={hrefFor(page - 1)} rel="prev">← Previous</Link> : null}
      {pages.map((n) =>
        n === page ? (
          <span className="current" key={n} aria-current="page">{n}</span>
        ) : (
          <Link key={n} href={hrefFor(n)}>{n}</Link>
        ),
      )}
      {page < totalPages ? <Link href={hrefFor(page + 1)} rel="next">Next →</Link> : null}
    </nav>
  );
}
