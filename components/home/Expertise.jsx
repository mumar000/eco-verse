"use client";

import React, { useEffect, useRef, useState } from "react";
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
  // Enhanced transforms for a more "cinematic" feel on mobile
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    index === 0 ? [0, -20, -40] : index === 1 ? [15, 0, -15] : [40, 20, 0],
  );
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    index === 0
      ? [1, 0.94, 0.9]
      : index === 1
        ? [0.92, 1, 0.92]
        : [0.88, 0.94, 1],
  );
  const opacity = useTransform(
    progress,
    [0, 0.5, 1],
    index === 0 ? [1, 0.7, 0.4] : index === 1 ? [0.6, 1, 0.6] : [0.4, 0.7, 1],
  );

  return (
    <motion.div
      className="min-w-[75vw] xs:min-w-[65vw] shrink-0 h-[280px] "
      style={{
        x,
        scale,
        opacity,
        willChange: "transform, opacity",
        transformOrigin: "center center",
        WebkitBackfaceVisibility: "hidden", // Helps with flickering on iOS
        transform: "translateZ(0)",
      }}
    >
      <img
        loading="lazy"
        src={src}
        alt={`Expertise ${index}`}
        className="w-full h-full object-cover rounded-2xl shadow-xl"
      />
    </motion.div>
  );
};

const Expertise = () => {
  const images = [third2.src, second2.src, first1.src];

  const rightContent = [
    {
      title: "DEMAND STRATEGY",
      desc: "We build social strategies that guide people from first impression to final action.",
      pills: [
        "Channel growth",
        "Audience mapping",
        "Paid + organic",
        "Creator mix",
        "Launch systems",
      ],
    },
    {
      title: "ATTENTION DESIGN",
      desc: "We create content around how people actually stop, watch, trust, and respond.",
      pills: [
        "Short-form video",
        "Scroll-stopping hooks",
        "Platform-native",
        "Creative loops",
      ],
    },
    {
      title: "AUDIENCE INTELLIGENCE",
      desc: "We manage your community as a live layer of brand insight and sentiment tracking.",
      pills: [
        "Comment intel",
        "DM systems",
        "Sentiment tracking",
        "Brand trust",
      ],
    },
  ];

  // ==========================================
  // DESKTOP LOGIC (UNTOUCHED PER REQUEST)
  // ==========================================
  const desktopContainerRef = useRef(null);
  const desktopActiveIndexRef = useRef(0);
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);

  useMotionValueEvent(desktopProgress, "change", (latest) => {
    const nextIndex = latest < 0.33 ? 0 : latest < 0.66 ? 1 : 2;
    if (desktopActiveIndexRef.current !== nextIndex) {
      desktopActiveIndexRef.current = nextIndex;
      setDesktopActiveIndex(nextIndex);
    }
  });

  const handleDesktopItemClick = (index) => {
    const targetScroll =
      desktopContainerRef.current.offsetTop + index * window.innerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const getCardAnimation = (index) => {
    const position = (index - desktopActiveIndex + 3) % 3;
    if (position === 0)
      return { x: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1 };
    if (position === 1)
      return { x: 40, scale: 0.85, rotate: 3, zIndex: 20, opacity: 0.9 };
    return { x: -40, scale: 0.85, rotate: -3, zIndex: 10, opacity: 0.9 };
  };

  // ==========================================
  // MOBILE LOGIC (OPTIMIZED FOR SMOOTHNESS)
  // ==========================================
  const mobileSectionRef = useRef(null);
  const mobileTrackViewportRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const mobileActiveIndexRef = useRef(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileTrackDistance, setMobileTrackDistance] = useState(0);

  const { scrollYProgress: mobileScrollRaw } = useScroll({
    target: mobileSectionRef,
    // Change: Modified offset slightly to ensure animation completes before scrolling out
    offset: ["start start", "0.95 end"],
  });

  useEffect(() => {
    const updateMobileTrackDistance = () => {
      const viewportWidth = mobileTrackViewportRef.current?.offsetWidth ?? 0;
      const trackWidth = mobileTrackRef.current?.scrollWidth ?? 0;
      setMobileTrackDistance(Math.max(trackWidth - viewportWidth, 0));
    };

    updateMobileTrackDistance();
    window.addEventListener("resize", updateMobileTrackDistance);

    return () => window.removeEventListener("resize", updateMobileTrackDistance);
  }, []);

  // Faster spring with less drag for a quicker response on mobile.
  const mobileSpring = useSpring(mobileScrollRaw, {
    stiffness: 90,
    damping: 22,
    mass: 0.7,
    restDelta: 0.001,
  });

  // Measured pixel transforms are cheaper to animate than viewport-unit strings.
  const mobileTrackX = useTransform(
    mobileSpring,
    [0, 1],
    [0, -mobileTrackDistance],
  );

  useMotionValueEvent(mobileSpring, "change", (latest) => {
    const nextIndex = latest < 0.3 ? 0 : latest < 0.7 ? 1 : 2;
    if (mobileActiveIndexRef.current !== nextIndex) {
      mobileActiveIndexRef.current = nextIndex;
      setMobileActiveIndex(nextIndex);
    }
  });

  const scrollToMobileImage = (index) => {
    if (!mobileSectionRef.current) return;
    const containerTop = mobileSectionRef.current.offsetTop;
    const targetScroll = containerTop + index * window.innerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* DESKTOP VIEW */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block relative h-[300vh] bg-orange"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="flex w-full max-w-[1400px] px-8 items-center justify-between">
            <div className="w-full max-w-[400px] relative z-40">
              <h1 className="text-[94px] leading-[0.7] font-beni font-black uppercase">
                <span className="text-white block">BUILT TO</span>
                <span className="text-white block">DRIVE</span>
                <span className="block text-[#00522D]">RESULTS.</span>
              </h1>
              <p className="font-clash text-orange-500 mt-5 text-lg font-semibold w-[85%]">
                Echo Verse Expertise
              </p>
            </div>
            <div className="relative w-[250px] h-[400px] flex-shrink-0 mx-8">
              {images.map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  animate={getCardAnimation(index)}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                />
              ))}
            </div>
            <div className="w-full max-w-[400px] flex flex-col">
              {rightContent.map((item, i) => (
                <div key={i} className="border-b border-white py-4">
                  <h3
                    onClick={() => handleDesktopItemClick(i)}
                    className={`cursor-pointer font-beni font-black text-[46px] uppercase ${desktopActiveIndex === i ? "text-[#00522D]" : "text-white"}`}
                  >
                    {item.title}
                  </h3>
                  <motion.div
                    animate={{
                      height: desktopActiveIndex === i ? "auto" : 0,
                      opacity: desktopActiveIndex === i ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/80 text-sm py-2">{item.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.pills.map((p, idx) => (
                        <span
                          key={idx}
                          className="bg-[#00522D] text-white px-3 py-1 rounded text-xs"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div
        ref={mobileSectionRef}
        className="block lg:hidden relative h-[300vh] bg-orange"
      >
        <div className="sticky top-0 min-h-screen flex flex-col justify-start overflow-hidden py-8 px-6">
          <div className="relative z-10 mb-6">
            <h1 className="text-[2.8rem] xs:text-[3.5rem] leading-[0.8] font-beni font-black uppercase text-[#00522D]">
              REASONING <br />
              TO BETTER: <br />
              <span className="text-orange-300">RESONATING.</span>
            </h1>
          </div>

          <div className="relative w-full overflow-visible my-4 h-[250px] xs:h-[310px]">
            <div ref={mobileTrackViewportRef} className="w-full overflow-hidden">
              <motion.div
                ref={mobileTrackRef}
                style={{ x: mobileTrackX, willChange: "transform" }}
                className="flex items-center gap-6 [transform:translate3d(0,0,0)]"
              >
                {images.map((src, i) => (
                  <MobileExpertiseCard
                    key={i}
                    src={src}
                    index={i}
                    progress={mobileSpring}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="w-full space-y-2 mt-8">
            {rightContent.map((item, i) => (
              <div key={i} className="border-b border-white/30 py-3">
                <h3
                  onClick={() => scrollToMobileImage(i)}
                  className={`font-beni font-black text-[30px] uppercase transition-colors duration-300 ${mobileActiveIndex === i ? "text-[#00522D]" : "text-white"}`}
                >
                  {item.title}
                </h3>
                <motion.div
                  initial={false}
                  animate={{
                    height: mobileActiveIndex === i ? "auto" : 0,
                    opacity: mobileActiveIndex === i ? 1 : 0,
                  }}
                  className="overflow-hidden"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p className="font-clash text-white/90 text-md leading-snug py-2">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pb-2">
                    {item.pills.map((pill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#00522D] text-white rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-tight"
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
