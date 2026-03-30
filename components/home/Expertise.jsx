"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";

import first1 from "@/public/assets/first2.png";
import second2 from "@/public/assets/second2.png";
import third2 from "@/public/assets/third2.png";

const MobileExpertiseCard = ({ src, index, progress }) => {
  const x = useTransform(
    progress,
    [0, 0.18, 0.5, 0.82, 1],
    index === 0
      ? [0, -4, -10, -16, -20]
      : index === 1
        ? [12, 10, 0, -8, -12]
        : [24, 22, 12, 4, 0],
  );
  const y = useTransform(
    progress,
    [0, 0.18, 0.5, 0.82, 1],
    index === 0
      ? [0, -1, -5, -9, -12]
      : index === 1
        ? [9, 7, 0, -5, -8]
        : [16, 14, 7, 2, 0],
  );
  const rotate = useTransform(
    progress,
    [0, 0.18, 0.5, 0.82, 1],
    index === 0
      ? [0, -0.25, -0.9, -1.5, -1.8]
      : index === 1
        ? [1.6, 1.2, 0, -0.8, -1.2]
        : [2.6, 2.1, 1.05, 0.3, 0],
  );
  const scale = useTransform(
    progress,
    [0, 0.18, 0.5, 0.82, 1],
    index === 0
      ? [1, 0.995, 0.978, 0.962, 0.952]
      : index === 1
        ? [0.955, 0.968, 1, 0.978, 0.965]
        : [0.91, 0.922, 0.962, 0.988, 1],
  );
  const opacity = useTransform(
    progress,
    [0, 0.18, 0.5, 0.82, 1],
    index === 0
      ? [1, 0.995, 0.96, 0.92, 0.89]
      : index === 1
        ? [0.91, 0.94, 1, 0.965, 0.93]
        : [0.84, 0.87, 0.93, 0.985, 1],
  );

  return (
    <motion.div
      className="min-w-[70vw] sm:min-w-[60vw] snap-center shrink-0 h-[250px] sm:h-[400px]"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        transformOrigin: "center center",
        willChange: "transform",
      }}
    >
      <img
        loading="lazy"
        src={src}
        alt={`Expertise ${index}`}
        className="w-full h-full object-cover rounded-3xl shadow-lg"
      />
    </motion.div>
  );
};

const Expertise = () => {
  // ==========================================
  // DESKTOP LOGIC (>= lg)
  // ==========================================
  const desktopContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });

  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);

  // Track scroll to change desktop active index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setDesktopActiveIndex(0);
    else if (latest < 0.66) setDesktopActiveIndex(1);
    else setDesktopActiveIndex(2);
  });

  // Click desktop accordion to jump to section
  const handleDesktopItemClick = (index) => {
    if (!desktopContainerRef.current) return;
    const containerTop = desktopContainerRef.current.offsetTop;
    const windowHeight = window.innerHeight;
    const targetScroll = containerTop + index * windowHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Card transform logic for desktop stacked images
  const getCardAnimation = (index) => {
    const position = (index - desktopActiveIndex + 3) % 3;
    if (position === 0)
      return {
        x: 0,
        scale: 1,
        rotate: 0,
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
      };
    else if (position === 1)
      return {
        x: 40,
        scale: 0.85,
        rotate: 3,
        zIndex: 20,
        opacity: 0.9,
        filter: "brightness(0.7)",
      };
    else
      return {
        x: -40,
        scale: 0.85,
        rotate: -3,
        zIndex: 10,
        opacity: 0.9,
        filter: "brightness(0.7)",
      };
  };

  // ==========================================
  // MOBILE LOGIC (< lg)
  // ==========================================
  const mobileSectionRef = useRef(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileSectionRef,
    offset: ["start start", "end end"],
  });
  const smoothMobileProgress = useSpring(mobileScrollProgress, {
    stiffness: 54,
    damping: 20,
    mass: 0.85,
  });
  const cinematicMobileProgress = useTransform(
    smoothMobileProgress,
    [0, 0.12, 0.24, 0.5, 0.76, 0.88, 1],
    [0, 0.04, 0.16, 0.5, 0.84, 0.96, 1],
  );
  const mobileTrackX = useTransform(
    cinematicMobileProgress,
    [0, 0.1, 0.22, 0.38, 0.5, 0.62, 0.78, 0.9, 1],
    [
      "0vw",
      "calc(-6vw - 0.05rem)",
      "calc(-20vw - 0.22rem)",
      "calc(-48vw - 0.58rem)",
      "calc(-66vw - 0.85rem)",
      "calc(-84vw - 1.08rem)",
      "calc(-102vw - 1.28rem)",
      "calc(-124vw - 1.56rem)",
      "calc(-132vw - 1.7rem)",
    ],
  );

  // Track vertical page scroll on mobile to keep the card motion and
  // accordion progression in sync with the user's scrolling.
  useMotionValueEvent(cinematicMobileProgress, "change", (latest) => {
    if (latest < 0.32) setMobileActiveIndex(0);
    else if (latest < 0.68) setMobileActiveIndex(1);
    else setMobileActiveIndex(2);
  });

  // Click mobile accordion to scroll carousel to image
  const scrollToMobileImage = (index) => {
    setMobileActiveIndex(index);
    if (!mobileSectionRef.current) return;

    const containerTop = mobileSectionRef.current.offsetTop;
    const windowHeight = window.innerHeight;
    const targetScroll = containerTop + index * windowHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // ==========================================
  // DATA
  // ==========================================
  const rightContent = [
    {
      title: "DEMAND STRATEGY",
      desc: "We build social strategies that guide people from first impression to final action - aligning creators, content, and distribution into a system that performs with purpose.",
      pills: [
        "Channel growth planning",
        "Audience intent mapping",
        "Campaign narrative design",
        "Paid + organic sync",
        "Creator mix strategy",
        "Conversion funnel planning",
        "Launch sequence systems",
      ],
    },
    {
      title: "ATTENTION DESIGN",
      desc: "We create content around how people actually stop, watch, trust, and respond - built to capture attention quickly and turn it into meaningful action.",
      pills: [
        "Creator-led production",
        "Platform-native storytelling",
        "Scroll-stopping hooks",
        "Short-form video systems",
        "Performance-first scripting",
        "Creative testing loops",
        "Retention-driven editing",
      ],
    },
    {
      title: "AUDIENCE INTELLIGENCE",
      desc: "We manage your community as a live layer of brand insight - turning replies, reactions, and conversations into stronger trust, smarter decisions, and better performance.",
      pills: [
        "Comment intelligence",
        "DM response systems",
        "Sentiment tracking",
        "Brand trust building",
        "Audience insight loops",
        "Reputation management",
        "Retention engagement",
      ],
    },
  ];

  const images = [third2.src, second2.src, first1.src];

  return (
    <>
      {/* CSS to hide the scrollbar for the mobile horizontal carousel smoothly */}
      <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

      {/* ========================================== */}
      {/* DESKTOP VIEW (Visible lg and above)        */}
      {/* ========================================== */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block relative h-[300vh] bg-orange"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="flex w-full max-w-[1400px] px-8 items-center justify-between">
            {/* LEFT SECTION */}
            <div className="w-full max-w-[400px] relative z-40">
              <h1 className="text-[94px] leading-[0.7] font-beni font-black uppercase">
                <span className="text-white block">BUILT TO</span>
                <span className="text-white block">DRIVE</span>
                <span className="block text-[#00522D]">RESULTS.</span>
              </h1>

              <p className="font-clash text-orange-500 mt-5 text-lg font-semibold w-[85%] leading-6">
                Echo Verse is a social media agency founded on three strong
                areas of expertise.
              </p>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-20 top-[70%] bg-[#00522D] rounded-2xl px-3 py-5 flex items-center shadow-sm rotate-[-5deg]"
              >
                <span className="text-3xl drop-shadow-sm">👀</span>
                <span className="text-3xl drop-shadow-sm">📱</span>
                <span className="text-3xl drop-shadow-sm">📊</span>
              </motion.div>
            </div>

            {/* MIDDLE IMAGES */}
            <div className="relative w-[250px] h-[400px] flex-shrink-0 mx-8 flex items-center justify-center">
              {images.map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  initial={false}
                  animate={getCardAnimation(index)}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 1,
                  }}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl origin-center"
                  style={{ willChange: "transform, z-index" }}
                />
              ))}
            </div>

            {/* RIGHT ACCORDION */}
            <div className="w-full max-w-[400px] flex flex-col justify-center relative z-40">
              {rightContent.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col border-b border-white last:border-0 py-4"
                >
                  <h3
                    onClick={() => handleDesktopItemClick(i)}
                    className={`cursor-pointer font-beni font-black tracking-[0.5] text-[46px] uppercase leading-[0.9] transition-colors duration-500 ${desktopActiveIndex === i ? "text-[#00522D]" : "text-white"}`}
                  >
                    {item.title}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{
                      height: desktopActiveIndex === i ? "auto" : 0,
                      opacity: desktopActiveIndex === i ? 1 : 0,
                      marginTop: desktopActiveIndex === i ? 16 : 0,
                    }}
                    className="overflow-hidden"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {item.desc && (
                      <p className="font-clash text-white/80 text-sm font-medium leading-snug mb-3 w-[90%]">
                        {item.desc}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {item.pills.map((pill, idx) => (
                        <span
                          key={idx}
                          className="bg-[#00522D] text-white rounded-lg px-4 py-2 text-sm font-clash font-medium tracking-wide"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          {/* BOTTOM LEFT LABEL */}
          <div className="absolute bottom-8 left-9 z-50">
            <span className="text-orange-500 font-clash font-regular uppercase text-sm border-b border-orange-500">
              Experts
            </span>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE VIEW (Visible below lg)             */}
      {/* ========================================== */}
      <div
        ref={mobileSectionRef}
        className="block lg:hidden relative h-[300vh] bg-orange"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-orange px-4 py-10">
          {/* TOP TEXT */}
          <div className="w-full relative z-20">
            <h1 className="text-[3.5rem] sm:text-[5rem] leading-[0.7] font-beni font-black uppercase relative z-10">
              <span className="text-[#00522D] block">REASONING</span>
              <span className="text-[#00522D] block">TO BETTER:</span>
              <span className="block text-orange-300">RESONATING.</span>
            </h1>

            <p className="font-clash text-orange-500 mt-4 text-base sm:text-lg font-semibold w-[95%] sm:w-[80%] leading-snug">
              Echo Verse is a social media agency founded on three strong areas of
              expertise.
            </p>

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-4 top-[0%] bg-[#FCE6D5] rounded-xl px-2 py-2 flex items-center shadow-sm rotate-[5deg] z-20"
            >
              <span className="text-xl drop-shadow-sm">👀</span>
              <span className="text-xl drop-shadow-sm">📱</span>
              <span className="text-xl drop-shadow-sm">📊</span>
            </motion.div>
          </div>

          {/* HORIZONTAL IMAGE STRIP DRIVEN BY VERTICAL SCROLL */}
          <div className="w-full overflow-hidden pb-6 mt-6">
            <motion.div
              className="flex gap-4 w-max"
              style={{ x: mobileTrackX, willChange: "transform" }}
            >
              {images.map((src, i) => (
                <MobileExpertiseCard
                  key={i}
                  src={src}
                  index={i}
                  progress={cinematicMobileProgress}
                />
              ))}
            </motion.div>
          </div>

          {/* ACCORDION TEXT DRIVEN BY SCROLL */}
          <div className="w-full flex flex-col justify-center mt-4">
            {rightContent.map((item, i) => (
              <div
                key={i}
                className="flex flex-col border-b border-white/50 last:border-0 py-4"
              >
                <h3
                  onClick={() => scrollToMobileImage(i)}
                  className={`cursor-pointer font-beni font-black tracking-wide text-[32px] sm:text-[40px] uppercase leading-[0.9] transition-colors duration-500 ${mobileActiveIndex === i ? "text-[#00522D]" : "text-white"}`}
                >
                  {item.title}
                </h3>

                <motion.div
                  initial={false}
                  animate={{
                    height: mobileActiveIndex === i ? "auto" : 0,
                    opacity: mobileActiveIndex === i ? 1 : 0,
                    marginTop: mobileActiveIndex === i ? 12 : 0,
                  }}
                  className="overflow-hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {item.desc && (
                    <p className="font-clash text-white/80 text-xs sm:text-sm font-medium leading-snug mb-2 w-[95%]">
                      {item.desc}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {item.pills.map((pill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#00522D] text-white rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[13px] font-clash font-medium tracking-wide shadow-sm"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Expertise;
