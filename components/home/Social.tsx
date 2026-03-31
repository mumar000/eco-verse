"use client";

import React, { useEffect, useRef, useState } from "react";
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
    title: "Why Most Creator Campaigns Fail Before They Start",
    slug: "why-most-creator-campaigns-fail-before-they-start",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    tags: ["Creator Economy", "Performance Strategy"],
  },
  {
    id: 2,
    title: "The Shift From Reach to Revenue in Creator Marketing",
    slug: "the-shift-from-reach-to-revenue-in-creator-marketing",
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    tags: ["Performance Strategy", "Growth Systems"],
  },
  {
    id: 3,
    title: "Where Attention Actually Converts Today",
    slug: "where-attention-actually-converts-today",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
    tags: ["Creator Economy", "Pakistan Market"],
  },
  {
    id: 4,
    title: "How to Build Creator Partnerships That Scale",
    slug: "how-to-build-creator-partnerships-that-scale",
    coverImage:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=80",
    tags: ["Growth Systems", "Performance Strategy"],
  },
  {
    id: 5,
    title: "What Smart Brands Track Beyond Engagement",
    slug: "what-smart-brands-track-beyond-engagement",
    coverImage:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80",
    tags: ["Pakistan Market", "Creator Economy"],
  },
];

const Social = ({ blogs = [] }: { blogs?: SocialBlog[] }) => {
  const cards = blogs.length > 0 ? blogs : fallbackCards;
  const totalTrackCards = cards.length + 1;

  // ==========================================
  // DESKTOP LOGIC (UNTOUCHED)
  // ==========================================
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopShiftPercent =
    totalTrackCards > 3 ? ((totalTrackCards - 3) / totalTrackCards) * 100 : 0;

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });

  const desktopSmooth = useSpring(desktopProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const desktopX = useTransform(
    desktopSmooth,
    [0, 1],
    ["0%", `-${desktopShiftPercent}%`],
  );

  // ==========================================
  // MOBILE LOGIC (OPTIMIZED)
  // ==========================================
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [mobileTrackDistance, setMobileTrackDistance] = useState(0);

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  // Fast, responsive spring tuned specifically for mobile thumb scrolling
  const mobileSmooth = useSpring(mobileProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateMobileTrackDistance = () => {
      const viewport = mobileViewportRef.current;
      const track = mobileTrackRef.current;

      if (!viewport || !track) {
        return;
      }

      const overflowDistance = Math.max(
        track.scrollWidth - viewport.clientWidth,
        0,
      );

      setMobileTrackDistance(overflowDistance);
    };

    updateMobileTrackDistance();

    window.addEventListener("resize", updateMobileTrackDistance);

    return () => {
      window.removeEventListener("resize", updateMobileTrackDistance);
    };
  }, [totalTrackCards]);

  const mobileX = useTransform(
    mobileSmooth,
    [0, 1],
    [0, -mobileTrackDistance],
  );

  const mobileSectionHeight = `${Math.max(320, totalTrackCards * 68)}vh`;

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  ];

  return (
    <>
      {/* ========================================== */}
      {/* DESKTOP VIEW (Visible lg and above)        */}
      {/* ========================================== */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block relative h-[400vh] bg-orange"
      >
        <div className="sticky top-0 h-screen w-full flex flex-row items-center overflow-hidden">
          {/* LEFT SECTION */}
          <div className="w-[35%] h-full flex flex-col justify-center px-8 z-20 relative">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-40 bg-orange-200 rounded-2xl p-4 flex items-center shadow-sm rotate-[-6deg] z-20"
              >
                <span className="text-3xl drop-shadow-sm">📱</span>
                <span className="text-3xl drop-shadow-sm">❤️</span>
                <span className="text-3xl drop-shadow-sm">😎</span>
              </motion.div>

              <h2 className="text-[94px] text-white leading-[0.7] font-beni uppercase font-black z-10 relative">
                <span className="block">WE</span>
                <span className="block">TELL</span>
                <span className="block">STORIES</span>
              </h2>
              <p className="font-clash text-white/75 text-base font-medium leading-snug mt-5 max-w-[320px]">
                This is a working layer of insight, not content for the sake of
                visibility. We share what&apos;s actually shaping the creator
                economy - grounded in real campaigns, real performance data, and
                real decisions being made.
              </p>

              <div className="flex items-center mt-6">
                {avatars.map((src, idx) => (
                  <img
                    loading="lazy"
                    key={idx}
                    src={src}
                    alt={`Avatar ${idx}`}
                    className="w-14 h-14 rounded-full border-3 border-white object-cover ml-[-8px] first:ml-0 z-10"
                  />
                ))}
                <div className="w-14 h-14 rounded-full border-3 border-white bg-[#00522D] flex items-center justify-center text-white font-clash font-bold text-lg ml-[-8px] z-0">
                  +1
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-9 z-50">
              <span className="text-white font-clash font-regular uppercase text-sm border-b border-white">
                Blogs
              </span>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-[65%] h-[75vh] flex items-center overflow-hidden">
            <motion.div
              style={{ x: desktopX }}
              className="flex gap-3 w-max items-center h-full pl-2 pr-12"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="relative w-[calc(20vw-1.25rem)] h-[70vh] rounded-2xl overflow-hidden shrink-0 group"
                >
                  <Image
                    loading="lazy"
                    src={card.coverImage}
                    fill
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                  <div className="absolute bottom-10 left-0 right-0 p-6 text-left">
                    <h3 className="font-beni font-bold text-4xl 2xl:text-5xl text-white uppercase leading-[0.86] drop-shadow-lg">
                      {card.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-20">
                    {card.tags.slice(0, 2).map((tag) => (
                      <span
                        key={`${card.id}-${tag}`}
                        className="rounded-full bg-black/45 px-3 py-1 text-xs font-clash font-medium capitalize text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <Link
                      href={`/blog/${card.slug}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/20 text-white backdrop-blur-sm transition hover:scale-95"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>
              ))}
              <div className="relative w-[calc(20vw-1.25rem)] h-[70vh] rounded-2xl bg-[#00522D] flex-shrink-0 flex flex-col items-center justify-center p-8 text-center">
                <h3 className="font-beni font-black text-[80px] text-white uppercase leading-[0.7] mb-8">
                  MORE
                  <br />
                  BLOGS?
                </h3>
                <Link
                  href="/blog"
                  className="bg-orange transition-all duration-300 text-white font-clash font-semibold text-sm hover:scale-95 px-8 py-3 rounded-lg cursor-pointer uppercase"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE VIEW (Visible below lg)             */}
      {/* ========================================== */}
      <div
        ref={mobileContainerRef}
        className="block lg:hidden relative bg-orange"
        style={{ height: mobileSectionHeight }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          {/* TOP SECTION */}
          <div className="w-full flex flex-col justify-center px-6 sm:px-10 z-20 relative pt-12 pb-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-32 top-[-10px] sm:left-40 bg-orange-200 rounded-xl p-2 sm:p-3 flex items-center shadow-sm rotate-[-6deg] z-20"
              >
                <span className="text-lg sm:text-2xl drop-shadow-sm">📱</span>
                <span className="text-lg sm:text-2xl drop-shadow-sm">❤️</span>
                <span className="text-lg sm:text-2xl drop-shadow-sm">😎</span>
              </motion.div>

              <h2 className="text-[60px] sm:text-[80px] text-white leading-[0.75] font-beni uppercase font-black z-10 relative">
                <span className="block">WE</span>
                <span className="block">TELL</span>
                <span className="block text-orange-200">STORIES</span>
              </h2>
              <p className="font-clash text-white/85 text-sm sm:text-base font-medium leading-snug mt-4 max-w-[90%]">
                This is a working layer of insight, not content for the sake of
                visibility. We share what&apos;s actually shaping the creator
                economy.
              </p>
            </motion.div>
          </div>

          {/* BOTTOM SECTION (ANIMATED TRACK) */}
          <div
            ref={mobileViewportRef}
            className="relative flex h-[55vh] w-full items-center overflow-hidden"
          >
            <motion.div
              ref={mobileTrackRef}
              style={{ x: mobileX }}
              className="flex gap-4 w-max items-center h-full px-6 will-change-transform"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="relative w-[82vw] sm:w-[50vw] h-[48vh] rounded-2xl overflow-hidden shrink-0 group transform-gpu"
                >
                  <Image
                    loading="lazy"
                    src={card.coverImage}
                    fill
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>

                  <div className="absolute bottom-6 left-0 right-0 p-5 text-left">
                    <h3 className="font-beni font-bold text-4xl sm:text-4xl text-white uppercase leading-[0.9] drop-shadow-lg">
                      {card.title}
                    </h3>
                  </div>

                  <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-20">
                    {card.tags.slice(0, 2).map((tag) => (
                      <span
                        key={`${card.id}-${tag}`}
                        className="rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] sm:text-xs font-clash font-medium capitalize text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 right-4 z-20">
                    <Link
                      href={`/blog/${card.slug}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/20 text-white backdrop-blur-sm"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>
              ))}

              {/* End Card */}
              <div className="relative w-[82vw] sm:w-[50vw] h-[48vh] rounded-2xl bg-[#00522D] flex-shrink-0 flex flex-col items-center justify-center p-6 text-center shadow-lg transform-gpu">
                <h3 className="font-beni font-black text-[50px] text-white uppercase leading-[0.8] mb-6">
                  MORE
                  <br />
                  BLOGS?
                </h3>
                <Link
                  href="/blog"
                  className="bg-orange text-white font-clash font-semibold text-xs px-6 py-3 rounded-lg uppercase shadow-sm"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
