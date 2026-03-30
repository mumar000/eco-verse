"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const CardsStack = () => {
  const containerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Track scroll over a larger container (600vh) to slow down the overall animation (DESKTOP ONLY)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Softened the spring for a slower, buttery-smooth transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const y1 = useTransform(smoothProgress, [0.0, 0.2], [2000, 0]);
  const y2 = useTransform(smoothProgress, [0.2, 0.4], [2000, 0]);
  const y3 = useTransform(smoothProgress, [0.4, 0.6], [2000, 0]);
  const y4 = useTransform(smoothProgress, [0.6, 0.8], [2000, 0]);

  const yTransforms = [0, y1, y2, y3, y4];

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.2) {
      setActiveCardIndex(0);
      return;
    }

    if (latest < 0.4) {
      setActiveCardIndex(1);
      return;
    }

    if (latest < 0.6) {
      setActiveCardIndex(2);
      return;
    }

    if (latest < 0.8) {
      setActiveCardIndex(3);
      return;
    }

    setActiveCardIndex(4);
  });

  // Data for the 5 cards
  const cards = [
    {
      id: "01",
      title: "LISTEN FIRST",
      desc: "Every strong partnership starts with understanding",
      details:
        "We begin by learning about your brand, your ambition, and the real challenge behind the brief - so the work starts from insight, not assumption.",
      color: "bg-[#F97316]", // orange-400
      rotation: 0, // straight
    },
    {
      id: "02",
      title: "SHAPE TOGETHER",
      desc: "Clarity before execution",
      details:
        "We align on goals, priorities, and direction early, creating a shared understanding of what success looks like and how we’ll get there.",
      color: "bg-[#00522D]", // orange-600 (green as per your code)
      rotation: -5, // tilt left
    },
    {
      id: "03",
      title: "BUILD WITH PURPOSE",
      desc: "Every move should have meaning",
      details:
        "From strategy to creators to content flow, we design an approach that fits your brand naturally and moves with intention.",
      color: "bg-[#F97316]", // orange-500
      rotation: 0, // straight
    },
    {
      id: "04",
      title: "STAY CONNECTED",
      desc: "A process that keeps you close, not confused",
      details:
        "You stay informed throughout the journey with clear visibility, open communication, and a team that works with you - not around you.",
      color: "bg-[#00522D]", // orange-700 (green as per your code)
      rotation: 5, // tilt right
    },
    {
      id: "05",
      title: "MOVE FORWARD",
      desc: "Progress doesn’t stop at launch",
      details:
        "We review, refine, and keep building on what works, turning each step into stronger momentum and a longer-term relationship.",
      color: "bg-[#F97316]", // orange-500
      rotation: 0, // straight
    },
  ];

  const activeCard = cards[activeCardIndex];

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
        ref={containerRef}
        className="hidden lg:block relative h-[500vh] bg-[#FFF0E5]"
      >
        {/* Sticky Wrapper - Pins to the screen while scrolling */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="flex w-full max-w-[1400px] px-4 lg:px-8 items-center justify-between mx-auto">
            {/* --- LEFT TEXT SECTION --- */}
            <div className="w-1/3 relative z-40">
              <h2 className="text-[94px] leading-[0.7] font-beni uppercase font-black">
                <span className="text-orange-500 block">WE WILL</span>
                <span className="text-orange-300 block">ALWAYS</span>
                <span className="text-orange-500 block">PREFER</span>
                <span className="text-orange-500 block">THIS ORDER.</span>
              </h2>

              {/* Floating Emoji Bubble */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[0%] lg:right-[-5%] bottom-2 bg-white/90 rounded-2xl p-4 flex items-center shadow-sm rotate-[10deg]"
              >
                <span className="text-3xl drop-shadow-sm">⚡</span>
                <span className="text-3xl drop-shadow-sm">🧠</span>
              </motion.div>
            </div>

            {/* --- CENTER CARDS SECTION --- */}
            <div className="w-1/3 flex items-center justify-center relative">
              <div className="relative w-[270px] h-[410px]">
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    style={{
                      y: yTransforms[idx],
                      rotate: card.rotation,
                      zIndex: idx * 10,
                      willChange: "transform", // Hardware acceleration
                    }}
                    className={`absolute inset-0 w-full h-full rounded-3xl ${card.color} flex flex-col items-center justify-between p-8 text-white`}
                  >
                    <h3 className="font-beni font-black text-[46px] text-center uppercase leading-8 pt-2">
                      {card.title}
                    </h3>

                    <span className="font-beni font-black text-[216px] leading-none">
                      {card.id}
                    </span>

                    <p className="font-clash text-center text-base font-medium leading-5 w-[95%] pb-2">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* --- RIGHT TEXT SECTION --- */}
            <div className="w-1/3 flex justify-start pl-14 z-40">
              <div className="w-full max-w-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <h5 className="font-clash font-bold text-orange-600 text-[16px] mb-3 leading-5">
                      {activeCard.desc}
                    </h5>
                    <p className="font-clash font-medium text-orange-500 text-[16px] leading-5">
                      {activeCard.details}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- BOTTOM LEFT LABEL --- */}
          <div className="absolute bottom-8 left-9 z-50">
            <span className="text-orange-500 font-clash font-regular tracking-wide uppercase text-sm border-b border-orange-500 pb-1">
              Methodo & Process
            </span>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE VIEW (Visible below lg)             */}
      {/* ========================================== */}
      <div className="block lg:hidden relative w-full bg-[#FFF0E5] py-10 overflow-hidden">
        {/* --- TOP TEXT SECTION --- */}
        <div className="flex flex-col items-center text-center px-6 relative z-20 w-full max-w-[500px] mx-auto">
          {/* Floating Emoji Bubble (Adjusted for mobile top-left) */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 left-[5%] bg-white/90 rounded-2xl p-2.5 flex items-center shadow-sm rotate-[-10deg] z-20"
          >
            <span className="text-xl sm:text-2xl drop-shadow-sm">⚡</span>
            <span className="text-xl sm:text-2xl drop-shadow-sm">🧠</span>
          </motion.div>

          <h2 className="text-[60px] sm:text-[75px] leading-[0.75] font-beni uppercase font-black mt-10">
            <span className="text-orange-500 block">WE WILL</span>
            <span className="text-orange-300 block">ALWAYS</span>
            <span className="text-orange-500 block">PREFER</span>
            <span className="text-orange-500 block">THIS ORDER.</span>
          </h2>
        </div>

        {/* --- HORIZONTAL CAROUSEL (1.5 Cards) --- */}
        {/* Native CSS scroll snapping used here for zero-lag, ultra-smooth swiping */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 mt-8 pb-8 hide-scrollbar w-full transform-gpu">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              // 75vw forces 1 full card to show, while leaving 25vw for the next card to peek in
              className="min-w-[75vw] sm:min-w-[50vw] md:min-w-[40vw] snap-center shrink-0 flex justify-center py-4"
            >
              <motion.div
                style={{ rotate: card.rotation }}
                className={`relative w-full max-w-[300px] h-[400px] sm:h-[420px] rounded-3xl ${card.color} flex flex-col items-center justify-between p-6 sm:p-8 text-white`}
              >
                <h3 className="font-beni font-black text-[40px] sm:text-[38px] text-center uppercase leading-[0.9] pt-2">
                  {card.title}
                </h3>

                <span className="font-beni font-black text-[150px] sm:text-[180px] leading-none">
                  {card.id}
                </span>

                <p className="font-clash text-center text-[13px] sm:text-[14px] font-medium leading-snug w-[95%] pb-2">
                  {card.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM LEFT LABEL --- */}
        <div className="absolute bottom-6 left-6 z-50">
          <span className="text-orange-500 font-clash font-regular tracking-wide uppercase text-xs sm:text-sm border-b border-orange-500 pb-1">
            Methodo & Process
          </span>
        </div>
      </div>
    </>
  );
};

export default CardsStack;
