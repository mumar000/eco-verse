"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ContentImageGrid from "@/components/shared/ContentImageGrid";
import EmbedGrid from "@/components/shared/EmbedGrid";
import type { CaseStudyContent } from "@/lib/projects/caseStudyContent";

type ProjectCaseStudyProps = {
  title: string;
  coverImage: string;
  shortDescription: string;
  tags?: string[];
  content: CaseStudyContent;
  actions?: ReactNode;
  className?: string;
};

export default function ProjectCaseStudy({
  title,
  coverImage,
  shortDescription,
  tags = [],
  content,
  actions,
  className,
}: ProjectCaseStudyProps) {
  const containerClass = "container mx-auto px-6 md:px-10 ";
  const heroImages = content.heroImages.filter(Boolean).slice(0, 4);
  const singleHeroImage = heroImages[0] || coverImage;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const slideUp = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
    },
  };

  return (
    <div className={className ?? "bg-[#FFEDD5]"}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="h-full w-full">
          {heroImages.length > 1 ? (
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
              {heroImages.length === 2 ? (
                heroImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative row-span-2">
                    <Image
                      src={image}
                      alt={`${title} hero ${index + 1}`}
                      fill
                      unoptimized
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                ))
              ) : heroImages.length === 3 ? (
                <>
                  <div className="relative row-span-2">
                    <Image
                      src={heroImages[0]}
                      alt={`${title} hero 1`}
                      fill
                      unoptimized
                      priority
                      className="object-cover"
                    />
                  </div>
                  {heroImages.slice(1).map((image, index) => (
                    <div key={`${image}-${index + 1}`} className="relative">
                      <Image
                        src={image}
                        alt={`${title} hero ${index + 2}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </>
              ) : (
                heroImages.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative">
                    <Image
                      src={image}
                      alt={`${title} hero ${index + 1}`}
                      fill
                      unoptimized
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          ) : singleHeroImage ? (
            <Image
              src={singleHeroImage}
              alt={title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#F97316] via-[#fdba74] to-[#15803d]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[#FFEDD5]" />
        </motion.div>

        <div className="absolute left-0 right-0 top-0 z-20 px-6 py-5 md:px-10">
          {actions}
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14"
        >
          <div className={`${containerClass} text-white`}>
            <motion.h1
              variants={slideUp}
              className="max-w-4xl font-beni text-5xl font-black uppercase leading-[0.95] drop-shadow-lg md:text-7xl"
            >
              {title}
            </motion.h1>

            <motion.div variants={slideUp} className="mt-8 border-t border-white/60 pt-6">
              <div className="grid gap-8 md:grid-cols-2">
                <p className="max-w-xl font-clash text-lg font-medium leading-relaxed text-white/95 drop-shadow-md md:text-xl">
                  {content.summary || shortDescription}
                </p>

                <div className="space-y-3 font-clash text-base text-white/95 drop-shadow-md">
                  {content.heroDetails.map((item, index) => (
                    <p key={`${item.label}-${index}`}>
                      <span className="font-bold text-[#fdba74]">{item.label}:</span>{" "}
                      <span>{item.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      {content.stats.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className={`${containerClass} grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4`}
          >
            {content.stats.map((item, index) => (
              <motion.div
                key={`${item.label}-${index}`}
                variants={slideUp}
              >
                <p className="font-beni text-5xl font-black text-[#F97316] md:text-6xl">{item.value}</p>
                <p className="mt-3 font-clash text-lg font-bold uppercase tracking-[0.1em] text-[#00522D] md:text-xl">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="rotate-[-0.5deg] bg-gradient-to-br from-[#00522D] to-[#003d22] py-10 md:py-12">
        <div className={`${containerClass} flex flex-col items-center justify-between gap-6 md:flex-row`}>
          <h3 className="font-beni text-2xl font-black uppercase leading-tight text-white md:text-3xl">
            Ready to Drive Engagement and Impact for Your Brand?
          </h3>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#F97316] px-8 py-4 font-clash text-base font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff6b35]"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      {/* Content Sections */}
      <section className={`${containerClass} space-y-20 py-16 md:py-24`}>
        {content.sections.map((section, sectionIndex) => (
          <motion.article
            key={`${section.title}-${sectionIndex}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 0.1,
            }}
            className="grid gap-8 md:grid-cols-[1fr_1.1fr]"
          >
            <h2 className="font-beni text-4xl font-black uppercase leading-tight text-[#00522D] md:text-5xl">
              {section.title}
            </h2>
            <div className="space-y-6 font-clash text-base leading-relaxed text-zinc-800 md:text-lg">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-paragraph-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </div>

            {section.images.length > 0 ? (
              <div className="md:col-span-2">
                <ContentImageGrid images={section.images} altBase={section.title || `section-${sectionIndex + 1}`} />
              </div>
            ) : null}

            {section.embeds.length > 0 ? (
              <div className="md:col-span-2">
                <EmbedGrid embeds={section.embeds} idPrefix={section.title || `section-${sectionIndex + 1}`} />
              </div>
            ) : null}
          </motion.article>
        ))}
      </section>

      {/* Tags Section */}
      {tags.length > 0 ? (
        <section className={`${containerClass} pb-16`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rotate-[-0.5deg] rounded-3xl bg-gradient-to-br from-[#F97316] to-[#ff6b35] p-8 shadow-lg md:p-10"
          >
            <h3 className="mb-6 font-beni text-xl font-black uppercase tracking-[0.16em] text-white md:text-2xl">
              Project Tags
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
        </section>
      ) : null}
    </div>
  );
}
