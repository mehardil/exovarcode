import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, MessageCircle, UserRound } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { BookingSection } from "../../../components/BookingSection";
import { JsonLd } from "../../../components/JsonLd";
import { Reveal } from "../../../components/Reveal";
import { PostCard } from "../../../components/PostCard";
import {
  articleHref,
  categorySlug,
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
} from "../../../lib/articles";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
} from "../../../lib/seo";
import { services } from "../../../lib/services";
import { whatsappUrl } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle || `${article.title} | Sync-Oaks`,
    description: article.metaDescription || article.description,
    path: `/blog/${article.slug}/`,
    image: article.ogImage || `/og/article-${article.slug}.png`,
    imageAlt: article.coverAlt || article.title,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated || article.date,
    authors: [article.author || "Sync-Oaks"],
    keywords: [article.focusKeyword, ...(article.tags || [])].filter(Boolean),
    canonical: article.canonicalOverride || undefined,
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = getRelatedArticles(article, 3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/blog/" },
    { name: article.title },
  ];
  const suggestedServices = services.slice(0, 4);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <header className="article-header article-header--article">
        <div className="container-narrow">
          <div className="badge-row" style={{ marginBottom: "1rem" }}>
            <Link href={`/blog/category/${categorySlug(article.category)}/`} className="tag">
              {article.category}
            </Link>
            <span className="badge"><Clock3 size={12} aria-hidden="true" />{article.readingMinutes} min read</span>
            <span className="badge">{article.wordCount.toLocaleString("en-US")} words</span>
          </div>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <div className="article-meta">
            <span><UserRound size={14} aria-hidden="true" />{article.author || "Sync-Oaks"}</span>
            <span><CalendarDays size={14} aria-hidden="true" />{formatDate(article.date)}</span>
            {article.updated && article.updated !== article.date ? (
              <span>Updated {formatDate(article.updated)}</span>
            ) : null}
          </div>
          <div className="article-hero">
            <img
              src={article.coverImage || "/images/service-webdev.webp"}
              alt={article.coverAlt || article.title}
              width={1200}
              height={600}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </header>

      <div className="container article-layout">
        <article className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />

        <aside className="article-aside" aria-label="Article sidebar">
          <div className="aside-card">
            <h3>Work with the studio</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
              Need this done rather than explained? We scope fixed-price projects and
              reply within one business day.
            </p>
            <div className="btn-row" style={{ marginTop: "0.75rem" }}>
              <Link href="/book-meeting/" className="btn btn-primary btn-sm" data-track="cta_book" data-track-location="article_sidebar">
                Book a call
              </Link>
              <a
                href={whatsappUrl(`Hi Sync-Oaks, I read your article "${article.title}" and have a question.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
                data-track="cta_whatsapp"
                data-track-location="article_sidebar"
              >
                <MessageCircle size={14} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="aside-card">
            <h3>Related services</h3>
            <ul>
              {suggestedServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}/`}>{service.name} →</Link>
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 ? (
            <div className="aside-card">
              <h3>Keep reading</h3>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={articleHref(item)}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="aside-card">
            <h3>Free audit</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
              A short written review of your site with three prioritized fixes.
            </p>
            <Link href="/contact/?service=free-audit#lead" className="arrow-link" style={{ marginTop: "0.6rem" }}>
              Request it
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="section section-border">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Related reading</p>
              <h2>More from the same shelf.</h2>
            </div>
            <div className="grid grid-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <PostCard article={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <BookingSection
        source={`article_${article.slug}`}
        eyebrow="Turn reading into progress"
        title="Want us to handle it?"
        intro="Send a short brief or start a WhatsApp conversation. We will tell you what we would fix first, what it costs, and how long it takes."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            articleSchema(article),
            breadcrumbSchema(breadcrumbs),
            faqSchema(article.faq || []),
          ],
        }}
      />
    </>
  );
}
