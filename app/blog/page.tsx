import type { Metadata } from "next";
import { Container, PageHeader } from "../components";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Growth guides for AI-built websites, micro SaaS founders, indie hackers, and small online businesses.",
};

const posts = [
  {
    title: "Why AI-Built Websites Struggle to Get Traffic",
    category: "Positioning",
    excerpt:
      "A practical look at why shipped pages still miss search intent, buyer language, and distribution.",
  },
  {
    title: "SEO Basics for Micro SaaS Founders",
    category: "SEO",
    excerpt:
      "The core page types, titles, internal links, and proof points small products need first.",
  },
  {
    title: "How to Make Your Website Ready for AI Search",
    category: "GEO",
    excerpt:
      "Simple ways to structure pages so AI search engines can understand and cite your offer.",
  },
  {
    title: "Reddit Growth Without Spam",
    category: "Distribution",
    excerpt:
      "How to find problem-first conversations, add value, and learn from niche communities.",
  },
  {
    title: "Content Gap Ideas for Indie Tools",
    category: "Content",
    excerpt:
      "Turn competitors, use cases, alternatives, and customer questions into better page ideas.",
  },
  {
    title: "Conversion Fixes for a Low-Traffic Homepage",
    category: "Conversion",
    excerpt:
      "Before buying more traffic, make the first screen, proof, and CTA easier to understand.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Growth notes for small websites that need traction"
        description="Example article cards for the first version. Full article pages can be added after the core audit flow is validated."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  {post.category}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-slate-950">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-6 inline-flex rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-500">
                  Article coming soon
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
