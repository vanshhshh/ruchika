import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Blog" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-sage-500">{post.category}</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-charcoal md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 text-sm text-olive-gray">
          {formatDate(post.date)} · {post.readTime} · {post.author}
        </div>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-olive-gray">
          {post.content.split(". ").map((line) => (
            <p key={line}>{line.endsWith(".") ? line : `${line}.`}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
