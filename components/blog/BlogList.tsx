"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toBlogContentRecord } from "@/lib/blogs/studioContent";

type Blog = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  content: string;
  tags: string[];
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

type BlogListProps = {
  blogs: Blog[];
};

const getBlogExcerpt = (content: string) => {
  const raw = toBlogContentRecord(content);

  if (Array.isArray(raw.blocks)) {
    for (const item of raw.blocks) {
      if (typeof item === "object" && item !== null && "content" in item) {
        const blockContent = (item as { content?: unknown }).content;
        if (typeof blockContent === "string" && blockContent.trim()) {
          return blockContent.trim().slice(0, 150) + "...";
        }
      }
    }
  }

  return content;
};

export default function BlogList({ blogs }: BlogListProps) {
  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
    },
  };

  return (
    <main className="w-full bg-[#FFEDD5] px-6 py-16 md:px-10 md:py-24">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="mx-auto mb-10 max-w-6xl pt-14"
      >
        <motion.div
          variants={slideUp}
          className="inline-block rounded-full bg-[#00522D] px-5 py-2"
        >
          <p className="font-clash text-xs font-bold uppercase tracking-[0.2em] text-white">
            Journal
          </p>
        </motion.div>

        <motion.h1
          variants={slideUp}
          className="mt-6 font-beni text-6xl font-black uppercase leading-[0.9] text-[#00522D] md:text-7xl lg:text-8xl"
        >
          Stories & Insights
        </motion.h1>

        <motion.p
          variants={slideUp}
          className="mt-6 max-w-2xl font-clash text-base font-medium text-zinc-700 md:text-lg"
        >
          Exploring the intersection of creativity, strategy, and sustainable
          growth. Real stories from real campaigns.
        </motion.p>
      </motion.div>

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-[#F97316]/30 bg-white/50 px-8 py-16 text-center shadow-lg backdrop-blur-sm"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F97316]/10">
            <svg
              className="h-10 w-10 text-[#F97316]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="font-beni text-2xl font-bold uppercase text-[#00522D]">
            No Stories Yet
          </h2>
          <p className="mt-2 font-clash text-sm text-zinc-600">
            Check back soon for new insights and case studies.
          </p>
        </motion.div>
      ) : (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              variants={slideUp}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="relative h-56 overflow-hidden bg-zinc-100">
                  <Image
                    src={blog.coverImage ?? "/assets/choose1.avif"}
                    alt={blog.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </Link>

              <div className="space-y-4 p-6">
                <div className="inline-block rounded-full bg-gradient-to-r from-[#F97316]/10 to-[#15803d]/10 px-3 py-1">
                  <p className="font-clash text-[10px] font-bold uppercase tracking-[0.16em] text-[#00522D]">
                    {blog.category?.name ?? "General"}
                  </p>
                </div>

                <h2 className="font-beni text-2xl font-black uppercase leading-tight text-[#00522D] transition-colors group-hover:text-[#F97316]">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h2>

                <p className="line-clamp-3 font-clash text-sm leading-relaxed text-zinc-600">
                  {blog.description || getBlogExcerpt(blog.content)}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group/btn inline-flex items-center gap-2 font-clash text-xs font-bold uppercase tracking-[0.14em] text-[#F97316] transition-all hover:gap-3"
                  >
                    Read More
                    <svg
                      className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="h-2 w-2 rounded-full bg-[#15803d]/40"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.section>
      )}

      {/* Bottom CTA Section */}
      {blogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 0.5,
          }}
          className="mx-auto mt-16 max-w-4xl md:mt-24"
        >
          <div className="rotate-[-1deg] rounded-3xl bg-gradient-to-br from-[#00522D] to-[#003d22] p-8 shadow-2xl md:p-12">
            <div className="text-center">
              <h2 className="font-beni text-4xl font-black uppercase leading-tight text-white md:text-5xl">
                Want to tell your story?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-clash text-sm font-medium text-white/90 md:text-base">
                We help brands craft narratives that resonate, convert, and
                build lasting communities.
              </p>
              <button className="mt-8 rounded-full bg-[#F97316] px-8 py-4 font-clash text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#ff6b35] hover:shadow-xl">
                Start Your Project
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
