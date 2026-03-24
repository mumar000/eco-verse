"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ContentImageGrid from "@/components/shared/ContentImageGrid";
import EmbedGrid from "@/components/shared/EmbedGrid";
import type { BlogStudioContent } from "@/lib/blogs/studioContent";

type BlogArticleProps = {
  title: string;
  coverImage?: string;
  description?: string;
  content: BlogStudioContent;
  tags?: string[];
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
  showBackLink?: boolean;
};

export default function BlogArticle({
  title,
  coverImage,
  description,
  content,
  tags = [],
  meta,
  actions,
  className,
  showBackLink = true,
}: BlogArticleProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
    },
  };

  return (
    <main className={className ?? "w-full bg-[#FFEDD5]"}>
      {actions}

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[50vh] w-full overflow-hidden md:h-[65vh]"
      >
        {coverImage ? (
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <Image
              src={coverImage}
              alt={title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[#FFEDD5]" />
          </motion.div>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#F97316] via-[#fdba74] to-[#15803d]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFEDD5]" />
          </div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="absolute inset-0 flex items-end"
        >
          <div className="w-full px-6 md:px-10">
            <div className="mx-auto max-w-6xl">
              {meta && (
                <motion.div variants={slideUp} className="mb-3">
                  <div className="inline-block rounded-full bg-[#00522D]/90 px-4 py-2 backdrop-blur-sm">
                    <div className="font-clash text-[10px] font-semibold uppercase tracking-[0.16em] text-white md:text-xs">
                      {meta}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.h1
                variants={slideUp}
                className="font-beni text-5xl font-black uppercase leading-[0.85] text-white drop-shadow-lg md:text-7xl lg:text-8xl"
              >
                {title}
              </motion.h1>

              {description && (
                <motion.p
                  variants={slideUp}
                  className="mt-4 max-w-3xl font-clash text-sm font-medium text-black drop-shadow-md md:text-base lg:text-lg"
                >
                  {description}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <article className="w-full px-6 py-12 md:px-10 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="mx-auto max-w-6xl"
        >
          {/* Main Content Card */}
          <motion.div
            variants={slideUp}
            className="rounded-3xl bg-white p-6 shadow-lg md:p-10 lg:p-14"
          >
            <div className="space-y-12 md:space-y-16">
              {content.blocks.map((block, blockIndex) => (
                <motion.section
                  key={`blog-block-${blockIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                    delay: blockIndex * 0.1,
                  }}
                  className="space-y-6"
                >
                  {block.heading && (
                    <h2 className="font-beni text-3xl font-black uppercase leading-tight text-[#00522D] md:text-4xl lg:text-5xl">
                      {block.heading}
                    </h2>
                  )}

                  {block.content && (
                    <div className="space-y-6 font-clash text-base leading-relaxed text-zinc-800 md:text-lg">
                      {block.content
                        .split(/\n\n+/)
                        .map((paragraph) => paragraph.trim())
                        .filter(Boolean)
                        .map((paragraph, paragraphIndex) => (
                          <p
                            key={`blog-block-${blockIndex}-paragraph-${paragraphIndex}`}
                            className={
                              blockIndex === 0 && paragraphIndex === 0
                                ? "first-letter:float-left first-letter:mr-4 first-letter:font-beni first-letter:text-7xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-[#F97316] md:first-letter:text-8xl"
                                : ""
                            }
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  )}

                  {block.images.length > 0 && (
                    <div className="my-10">
                      <ContentImageGrid
                        images={block.images}
                        altBase={`${title} block ${blockIndex + 1}`}
                      />
                    </div>
                  )}

                  {block.embeds.length > 0 && (
                    <div className="my-10">
                      <EmbedGrid
                        embeds={block.embeds}
                        idPrefix={`blog-block-${blockIndex}`}
                      />
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          </motion.div>

          {/* Tags Section - Separate Card with Tilt */}
          {tags.length > 0 && (
            <motion.div
              variants={slideUp}
              className="mt-8 rotate-[-1deg] rounded-3xl bg-gradient-to-br from-[#F97316] to-[#ff6b35] p-8 shadow-lg md:mt-12 md:p-10"
            >
              <h3 className="mb-6 font-beni text-xl font-black uppercase tracking-[0.16em] text-white md:text-2xl">
                Explore Topics
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.05,
                    }}
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    className="cursor-pointer rounded-full bg-white/90 px-5 py-2 font-clash text-xs font-bold uppercase tracking-[0.12em] text-[#00522D] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back Link - Fun Green Card */}
          {showBackLink && (
            <motion.div
              variants={slideUp}
              className="mt-8 flex justify-center md:mt-12"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 rounded-full bg-[#00522D] px-8 py-4 font-clash text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#003d22] hover:shadow-xl"
              >
                <svg
                  className="h-5 w-5 transition-transform group-hover:-translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back To All Stories
              </Link>
            </motion.div>
          )}
        </motion.div>
      </article>
    </main>
  );
}
