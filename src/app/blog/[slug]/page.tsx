import type { Metadata } from "next";
import Link from "next/link";
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

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="inline-flex items-center rounded-full bg-sage-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-800"
          >
            Book
          </Link>
          <Link
            href="/#free-guide"
            className="inline-flex items-center rounded-full border border-warm-300 bg-warm-100 px-5 py-2.5 text-sm font-semibold text-sage-900 transition-colors hover:bg-warm-200"
          >
            Free PDF Guide
          </Link>
        </div>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-olive-gray">
          {post.content.split(". ").map((line) => (
            <p key={line}>{line.endsWith(".") ? line : `${line}.`}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-sage-200 bg-sage-50/70 p-5">
          <p className="text-sm text-olive-gray">Want a personalized roadmap?</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-full bg-sage-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Book
            </Link>
            <Link
              href="/#free-guide"
              className="inline-flex items-center rounded-full border border-sage-300 bg-white px-5 py-2.5 text-sm font-semibold text-sage-800"
            >
              Get Free PDF
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
