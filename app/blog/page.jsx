import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Hero3D } from "../../components/Hero3D";
import { HeroFlair } from "../../components/HeroFlair";
import { BlogList, Pagination } from "../../components/BlogList";
import { JsonLd } from "../../components/JsonLd";
import { Reveal } from "../../components/Reveal";
import { buildMetadata, breadcrumbSchema } from "../../lib/seo";
import { getAllArticles, getCategories, paginateArticles } from "../../lib/articles";

export const metadata = buildMetadata({
  title: "Insights on Websites, SEO & Automation | Sync-Oaks",
  description:
    "Practical guides on website pricing, Next.js vs WordPress, technical SEO, Core Web Vitals, automation, cloud hosting, and landing pages that convert.",
  path: "/blog/",
  image: "/og/blog.png",
  imageAlt: "Sync-Oaks insights",
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Insights" }];

export default function BlogIndexPage() {
  const articles = getAllArticles();
  const categories = getCategories();
  const { items, page, totalPages } = paginateArticles(articles, 1);
  const totalMinutes = articles.reduce((sum, article) => sum + article.readingMinutes, 0);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--blog">
        <HeroFlair variant="blog" label="Insights" />
        <Hero3D variant="ambient" />
        <div className="container">
          <p className="eyebrow">Notes from the build</p>
          <h1>Advice we would give a friend who asked.</h1>
          <p className="lead">
            No recycled listicles and no fake statistics. These guides come from scoping,
            building, and fixing real websites: what things cost, which stack fits, what
            actually moves search, and where conversion breaks.
          </p>
          <div className="hero-proof">
            <span><BookOpen size={14} aria-hidden="true" />{articles.length} in-depth guides</span>
            <span><Clock3 size={14} aria-hidden="true" />{totalMinutes} minutes of reading</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BlogList articles={items} categories={categories} />
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="cta-band">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Need the short version?</p>
            <h2>Skip the reading and ask a direct question.</h2>
            <p>
              Tell us what you are trying to fix. We will reply with a straight answer,
              even if the answer is that you do not need us.
            </p>
            <div className="btn-row">
              <Link href="/book-meeting/" className="btn btn-primary btn-lg" data-track="cta_book" data-track-location="blog_index">
                Book a call
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/contact/" className="btn btn-secondary btn-lg">Send a question</Link>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema(breadcrumbs),
            {
              "@type": "CollectionPage",
              name: "Sync-Oaks insights",
              url: "https://syncoaks.com/blog/",
              hasPart: articles.map((article) => ({
                "@type": "BlogPosting",
                headline: article.title,
                url: `https://syncoaks.com/blog/${article.slug}/`,
                datePublished: article.date,
              })),
            },
          ],
        }}
      />
    </>
  );
}
