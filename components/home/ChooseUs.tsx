"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ChooseUs = () => {
    const containerRef = useRef(null);

    // Track scroll over a 500vh container to allow plenty of room for 4 cards to animate smoothly
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Softened spring for buttery-smooth card sliding
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        restDelta: 0.001
    });

    // --- SCROLL ANIMATION RANGES ---
    // The mappings stop at 0.85 so the last card finishes before hitting the absolute bottom of the page.

    // Card 1 starts at "70vh" (pushed down) so its top edge is slightly peeking at the bottom of the screen.
    const y1 = useTransform(smoothProgress, [0.0, 0.25], ["70vh", "0vh"]);

    // Cards 2, 3, and 4 start at "100vh" so they are completely hidden off-screen until it's their turn.
    const y2 = useTransform(smoothProgress, [0.20, 0.45], ["100vh", "0vh"]);
    const y3 = useTransform(smoothProgress, [0.40, 0.65], ["100vh", "0vh"]);
    const y4 = useTransform(smoothProgress, [0.60, 0.85], ["100vh", "0vh"]);

    const yTransforms = [y1, y2, y3, y4];

    // Data for the 4 cards including their specific rotations exactly as you requested
    const cards = [
        {
            title: "SOCIAL MEDIA EXPERTS",
            desc: "For almost 10 years, our core business has been social media. Community management, photos, videos: that's what we do best.",
            rotation: -3, // Left tilted
            icon: (
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                    <circle cx="12" cy="14" r="1" fill="currentColor" />
                </svg>
            )
        },
        {
            title: "PREMIUM & CUSTOM-MADE",
            desc: "No standardized offers or \"copy-paste\" packages. Each project is designed for you, and always guided by the same goal: quality.",
            rotation: 3, // Right tilted
            icon: (
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 14.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M10 14.5V18a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-4.5" />
                    <path d="M12 9.5V6a2 2 0 0 1 2-2h1" />
                    <path d="M16 11V6a2 2 0 0 1 2-2h1" />
                    <path d="M19 13V7a2 2 0 0 1 2-2h.5" />
                </svg>
            )
        },
        {
            title: "A METHOD",
            desc: "Shaped over the years, between rigor and creativity. Organization, precision and long-term vision: that's what makes us different.",
            rotation: -3, // Left tilted
            icon: (
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            )
        },
        {
            title: "HUMANITY FIRST",
            desc: "Behind every brand, there are passionate women and men. It's their story that we love to tell.",
            rotation: 3, // Left tilted (As strictly requested)
            icon: (
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            )
        }
    ];

    return (
        // Main wrapper pinned to 500vh to give scroll depth. Orange background applied.
        <div ref={containerRef} className="relative h-[500vh] bg-[#F97316]">

            {/* Sticky Wrapper - Pins to the screen while scrolling */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* --- BACKGROUND LARGE TEXT --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                    <h1 className="text-[216px] leading-[0.7] font-beni font-black text-[#FFF0E5] text-center uppercase">
                        <span className="block">WHY</span>
                        <span className="block">CHOOSE</span>
                        <span className="block">LIGHTNING</span>
                    </h1>
                </div>

                {/* --- CARDS ROW CONTAINER --- */}
                <div className="relative z-10 w-full max-w-[1500px] px-4 lg:px-8 flex items-center justify-center gap-4 lg:gap-5 h-full">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            style={{
                                y: yTransforms[idx],
                                rotate: card.rotation,
                                willChange: "transform" // Hardware acceleration for buttery smoothness
                            }}
                            className="w-full max-w-[300px] bg-[#00522D] rounded-3xl p-8 lg:p-10 flex flex-col items-center text-white min-h-[410px]"
                        >
                            {/* Hand-drawn style SVG Icon */}
                            <div className="flex justify-center w-full mb-5 mt-7">
                                {card.icon}
                            </div>

                            {/* Card Title */}
                            <h3 className="font-beni font-black text-[38px] lg:text-[46px] text-center uppercase leading-[0.7] mb-5 w-full">
                                {card.title}
                            </h3>

                            {/* Card Description */}
                            <p className="font-clash text-center text-[15px] lg:text-[16px] font-medium leading-5 w-[95%]">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ChooseUs;