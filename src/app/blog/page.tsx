import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actionable nutrition, weight loss, and lifestyle guidance from Ruchika Chawla.",
};

const categories = ["All", "Nutrition", "Weight Loss", "Lifestyle"];

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selected = searchParams.category && categories.includes(searchParams.category)
    ? searchParams.category
    : "All";

  const posts = selected === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selected);

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">Evidence-based Blog</h1>
          <p className="mt-4 text-olive-gray">
            Practical writing across nutrition, weight loss, and lifestyle design for Indian homes.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={category === "All" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`}
            >
              <Badge variant={selected === category ? "default" : "soft"}>{category}</Badge>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-sage-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium"
            >
              <Badge className="mb-4">{post.category}</Badge>
              <h2 className="font-display text-xl font-semibold text-charcoal group-hover:text-sage-700">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-olive-gray">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-olive-gray">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
