"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type SocialBlog = {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
};

const fallbackCards: SocialBlog[] = [
  {
    id: 1,
    title: "How We Build Social Campaign Systems",
    slug: "how-we-build-social-campaign-systems",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    tags: ["Social media", "Content creation"],
  },
  {
    id: 2,
    title: "Brand Storytelling That Converts",
    slug: "brand-storytelling-that-converts",
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    tags: ["Storytelling", "Strategy"],
  },
  {
    id: 3,
    title: "Creative Direction for Modern Feeds",
    slug: "creative-direction-for-modern-feeds",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
    tags: ["Creative", "Design"],
  },
  {
    id: 4,
    title: "Performance Content Playbook",
    slug: "performance-content-playbook",
    coverImage:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=80",
    tags: ["Performance", "Growth"],
  },
  {
    id: 5,
    title: "How Teams Ship Better Content Faster",
    slug: "how-teams-ship-better-content-faster",
    coverImage:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80",
    tags: ["Workflow", "Publishing"],
  },
];

const Social = ({ blogs = [] }: { blogs?: SocialBlog[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = blogs.length > 0 ? blogs : fallbackCards;
  const totalTrackCards = cards.length + 1;
  
  // Logic remains untouched for desktop, works as a base for mobile
  const shiftPercent =
    totalTrackCards > 3 ? ((totalTrackCards - 3) / totalTrackCards) * 100 : 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${shiftPercent}%`]);

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-orange-500">
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden">
        
        {/* --- LEFT SECTION --- */}
        <div className="w-full lg:w-[35%] h-[40%] lg:h-full flex flex-col justify-center px-6 sm:px-10 lg:px-8 z-20 relative pt-10 lg:pt-0">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Floating Emoji Bubble - Responsive position/size */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-10 sm:left-20 lg:left-40 bg-orange-200 rounded-2xl p-2 sm:p-4 flex items-center shadow-sm rotate-[-6deg] z-20"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">📱</span>
              <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">❤️</span>
              <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">😎</span>
            </motion.div>

            {/* Huge Title - Scaled for mobile */}
            <h2 className="text-[52px] sm:text-[80px] lg:text-[94px] text-white leading-[0.7] lg:leading-16 font-beni uppercase font-black z-10 relative">
              <span className="block">WE</span>
              <span className="block">TELL</span>
              <span className="block">STORIES</span>
            </h2>

            {/* Avatars Row */}
            <div className="flex items-center mt-4 sm:mt-6">
              {avatars.map((src, idx) => (
                <img
                  loading="lazy"
                  key={idx}
                  src={src}
                  alt={`Avatar ${idx}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 border-white object-cover ml-[-8px] first:ml-0 z-10"
                />
              ))}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 border-white bg-[#00522D] flex items-center justify-center text-white font-clash font-bold text-sm sm:text-lg ml-[-8px] z-0">
                +1
              </div>
            </div>
          </motion.div>

          {/* Label hidden on mobile for cleaner look, as per standard UI patterns */}
          <div className="absolute lg:block hidden bottom-8 left-9 z-50">
            <span className="text-white font-clash font-regular uppercase text-sm border-b border-white">
              Blogs
            </span>
          </div>
        </div>

        {/* --- RIGHT SECTION (CARDS) --- */}
        <div className="w-full lg:w-[65%] h-[60%] lg:h-[75vh] flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-4 sm:gap-6 lg:gap-3 w-max items-center h-full pl-6 lg:pl-2 pr-12 pt-8 lg:pt-0"
          >
            {cards.map((card) => (
              <div
                key={card.id}
                // Mobile: 85vw width for a partial peek of the next card. Tablet: 45vw. Desktop: Original logic.
                className="relative w-[85vw] sm:w-[45vw] lg:w-[calc(20vw-1.25rem)] h-[50vh] lg:h-[70vh] rounded-2xl overflow-hidden shrink-0 group"
              >
                <Image
                  loading="lazy"
                  src={card.coverImage}
                  fill
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 p-6 text-left">
                  <h3 className="font-beni font-bold text-3xl sm:text-4xl lg:text-4xl 2xl:text-5xl text-white uppercase leading-[0.86] drop-shadow-lg">
                    {card.title}
                  </h3>
                </div>

                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-20">
                  {card.tags.slice(0, 2).map((tag) => (
                    <span
                      key={`${card.id}-${tag}`}
                      className="rounded-full bg-black/45 px-3 py-1 text-[10px] sm:text-xs font-clash font-medium capitalize text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 z-20">
                  <Link
                    href={`/blog/${card.slug}`}
                    className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/80 bg-white/20 text-white backdrop-blur-sm transition hover:scale-95"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              </div>
            ))}

            {/* End Card */}
            <div className="relative w-[85vw] sm:w-[45vw] lg:w-[calc(20vw-1.25rem)] h-[45vh] lg:h-[70vh] rounded-2xl bg-[#00522D] flex-shrink-0 flex flex-col items-center justify-center p-8 text-center">
              <h3 className="font-beni font-black text-[50px] sm:text-[60px] lg:text-[80px] text-white uppercase leading-[0.7] mb-6 sm:mb-8">
                MORE
                <br />
                BLOGS?
              </h3>
              <Link
                href="/blog"
                className="bg-orange-500 transition-all duration-300 text-white font-clash font-semibold text-xs sm:text-sm hover:scale-95 px-6 sm:px-8 py-3 rounded-lg cursor-pointer uppercase"
              >
                Explore
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Social;