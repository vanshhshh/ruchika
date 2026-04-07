"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="relative py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#f7ecd1] via-[#fcf5e5] to-[#f5e7c1]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
            >
              From the Blog
            </motion.p>
            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl font-bold text-charcoal sm:text-4xl md:text-5xl"
            >
              Nutrition <span className="text-gradient">Insights</span>
            </motion.h2>
            <motion.div
              initial={false}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-divider mt-6"
            />
          </div>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sage-600 font-medium hover:text-sage-700 transition-colors"
            >
              Read all articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="h-full overflow-hidden rounded-2xl border border-sage-200/80 bg-linear-to-b from-[#fffaf1] to-[#f5e8c8] shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-sage-200 via-sage-100 to-warm-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-sage-200/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="font-display text-2xl text-sage-500">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-xs text-sage-700 shadow-soft">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-olive-gray">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-charcoal mb-2 group-hover:text-sage-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-olive-gray leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 pt-4 border-t border-sage-50 flex items-center justify-between text-xs text-olive-gray">
                      <span>{formatDate(post.date)}</span>
                      <span className="text-sage-600 font-medium group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
