"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sage-500 text-sm font-medium uppercase tracking-[0.2em] mb-3"
            >
              From the Blog
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-charcoal"
            >
              Nutrition <span className="text-gradient">Insights</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-divider mt-6"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
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
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="h-full rounded-2xl bg-white border border-sage-100 overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 bg-linear-to-br from-sage-100 to-warm-100 overflow-hidden">
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
                      <span className="inline-flex items-center gap-1.5 text-xs text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full">
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
