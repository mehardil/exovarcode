import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { HeroFlair } from "../../../../components/HeroFlair";
import { BlogList } from "../../../../components/BlogList";
import { JsonLd } from "../../../../components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "../../../../lib/seo";
import {
  categorySlug,
  getArticlesByCategory,
  getCategories,
  getAllArticles,
} from "../../../../lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: categorySlug(category.name) }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategories().find((item) => categorySlug(item.name) === slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} Guides | Sync-Oaks Insights`,
    description: `Practical ${category.name.toLowerCase()} guides from the Sync-Oaks studio, written for business owners and developers.`,
    path: `/blog/category/${slug}/`,
    image: "/og/blog.png",
    imageAlt: `${category.name} articles`,
  });
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getCategories().find((item) => categorySlug(item.name) === slug);
  if (!category) notFound();
  const articles = getArticlesByCategory(category.name);
  const categories = getCategories();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/blog/" },
    { name: category.name },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--blog">
        <HeroFlair variant="blog" label={category.name} />
        <div className="container">
          <p className="eyebrow">Category</p>
          <h1>{category.name} guides.</h1>
          <p className="lead">
            {category.count} {category.count === 1 ? "article" : "articles"} on {category.name.toLowerCase()},
            written from project experience rather than search-volume guesswork.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <BlogList articles={articles} categories={categories} currentCategory={category.name} />
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema(breadcrumbs)] }} />
    </>
  );
}
