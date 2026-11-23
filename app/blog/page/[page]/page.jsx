import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { HeroFlair } from "../../../../components/HeroFlair";
import { BlogList, Pagination } from "../../../../components/BlogList";
import { JsonLd } from "../../../../components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "../../../../lib/seo";
import { getAllArticles, getCategories, paginateArticles, POSTS_PER_PAGE } from "../../../../lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  const total = Math.ceil(getAllArticles().length / POSTS_PER_PAGE);
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }) {
  const { page: pageParam } = await params;
  return buildMetadata({
    title: `Insights — Page ${pageParam} | Sync-Oaks`,
    description: "More practical guides on websites, search, automation, cloud, and conversion from the Sync-Oaks studio.",
    path: `/blog/page/${pageParam}/`,
    image: "/og/blog.png",
    imageAlt: "Sync-Oaks insights",
  });
}

export default async function BlogPaginatedPage({ params }) {
  const { page: pageParam } = await params;
  const pageNumber = Number(pageParam);
  const articles = getAllArticles();
  const { items, page, totalPages } = paginateArticles(articles, pageNumber);
  if (pageNumber < 1 || pageNumber > totalPages) notFound();
  const categories = getCategories();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/blog/" },
    { name: `Page ${page}` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="hero-page hero-page--blog">
        <HeroFlair variant="blog" label="Insights" />
        <div className="container">
          <p className="eyebrow">Notes from the build</p>
          <h1>Insights, page {page}.</h1>
          <p className="lead">The archive continues. Browse by category or keep reading.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <BlogList articles={items} categories={categories} />
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema(breadcrumbs)] }} />
    </>
  );
}
