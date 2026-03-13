"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ChooseUs = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        restDelta: 0.001
    });

    // Scroll mapping
    const y1 = useTransform(smoothProgress, [0.0, 0.25], ["70vh", "0vh"]);
    const y2 = useTransform(smoothProgress, [0.20, 0.45], ["100vh", "0vh"]);
    const y3 = useTransform(smoothProgress, [0.40, 0.65], ["100vh", "0vh"]);
    const y4 = useTransform(smoothProgress, [0.60, 0.85], ["100vh", "0vh"]);

    const yTransforms = [y1, y2, y3, y4];

    const cards = [
        {
            title: "SOCIAL MEDIA EXPERTS",
            desc: "For almost 10 years, our core business has been social media. Community management, photos, videos: that's what we do best.",
            rotation: -3,
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
            rotation: 3,
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
            rotation: -3,
            icon: (
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            )
        },
        {
            title: "HUMANITY FIRST",
            desc: "Behind every brand, there are passionate women and men. It's their story that we love to tell.",
            rotation: 3,
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
        <div ref={containerRef} className="relative h-[500vh] bg-[#F97316]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* BACKGROUND TEXT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                    <h1 className="text-[100px] sm:text-[180px] md:text-[200px] lg:text-[216px] leading-[0.7] font-beni font-black text-[#FFF0E5] text-center uppercase">
                        <span className="block">WHY</span>
                        <span className="block">CHOOSE</span>
                        <span className="block">ECHO VERSE</span>
                    </h1>
                </div>

                {/* --- DESKTOP VIEW (lg and up) --- */}
                <div className="hidden lg:flex relative z-10 w-full max-w-[1500px] px-8 items-center justify-center gap-5 h-full">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            style={{ y: yTransforms[idx], rotate: card.rotation, willChange: "transform" }}
                            className="w-full max-w-[300px] bg-[#00522D] rounded-3xl p-10 flex flex-col items-center text-white min-h-[410px]"
                        >
                            <div className="flex justify-center w-full mb-5 mt-7">{card.icon}</div>
                            <h3 className="font-beni font-black text-[46px] text-center uppercase leading-[0.7] mb-5 w-full">{card.title}</h3>
                            <p className="font-clash text-center text-[16px] font-medium leading-5 w-[95%]">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* --- MOBILE VIEW (Below lg) --- */}
                {/* Cards stack on top of each other in the center */}
                <div className="lg:hidden relative z-10 w-full h-full flex items-center justify-center px-6">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={`mobile-${idx}`}
                            style={{ 
                                y: yTransforms[idx], 
                                rotate: card.rotation, 
                                zIndex: idx, // Ensures later cards stack on top of earlier ones
                                willChange: "transform" 
                            }}
                            className="absolute w-full max-w-[300px] sm:max-w-[320px] bg-[#00522D] rounded-3xl pt-15 px-2 flex flex-col items-center text-white min-h-[380px]"
                        >
                            <div className="flex justify-center w-full mb-4 mt-4">{card.icon}</div>
                            <h3 className="font-beni font-black text-[36px] text-center uppercase leading-[0.8] mb-4 w-full">{card.title}</h3>
                            <p className="font-clash text-center text-[14px] font-medium leading-5 w-full">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ChooseUs;