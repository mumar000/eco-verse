"use client"

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Expertise = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) setActiveIndex(0);
        else if (latest < 0.66) setActiveIndex(1);
        else setActiveIndex(2);
    });

    const handleItemClick = (index) => {
        if (!containerRef.current) return;
        const containerTop = containerRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        const targetScroll = containerTop + (index * windowHeight);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    const getCardAnimation = (index) => {
        const position = (index - activeIndex + 3) % 3;
        if (position === 0) return { x: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1, filter: "brightness(1)" };
        else if (position === 1) return { x: 40, scale: 0.85, rotate: 3, zIndex: 20, opacity: 0.9, filter: "brightness(0.7)" };
        else return { x: -40, scale: 0.85, rotate: -3, zIndex: 10, opacity: 0.9, filter: "brightness(0.7)" };
    };

    const rightContent = [
        { title: "SOCIAL MEDIA STRATEGY", pills: ["Analysis of the current situation", "Benchmark", "Creation of an art direction", "Defining a social media strategy"] },
        { title: "CONTENT CREATION", pills: ["Videos", "Photos", "Instagram Reels", "Interview", "Corporate", "Studio recording", "YouTube", "TikTok"] },
        { title: "COMMUNITY MANAGEMENT", pills: ["Editorial planning", "Posting", "Creating stories", "Daily moderation", "Reporting & Learnings", "Project management"] }
    ];

    const images = [
        "https://www.agencefoudre.com/media/site/3c742bb01f-1767612914/foudre-@agence.foudre-57-600x-q80.avif",
        "https://www.agencefoudre.com/media/site/b224aefda4-1767612789/shooting-foudre-600x-q80.avif",
        "https://www.agencefoudre.com/media/site/750b347a6e-1764266386/foudre-5-600x-q80.avif"
    ];

    return (
        <div ref={containerRef} className="relative h-[300vh] md:h-[400vh] lg:h-[300vh] bg-[#00522D] py-10 md:py-0">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                <div className="flex w-full max-w-[1400px] px-4 lg:px-8 flex-col md:flex-row items-center justify-between">

                    {/* LEFT SECTION */}
                    <div className="w-full max-w-[400px] relative z-40 mb-10 md:mb-0">
                        <h1 className="text-[36px] sm:text-[48px] md:text-[70px] lg:text-[94px] leading-[1.1] sm:leading-[1.0] md:leading-[0.7] font-beni font-black uppercase">
                            <span className="text-orange-500 block">REASONING</span>
                            <span className="text-orange-500 block">TO BETTER:</span>
                            <span className="block text-orange-300">RESONATING.</span>
                        </h1>

                        <p className="font-clash text-orange-500 mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg font-semibold w-full sm:w-[90%] md:w-[85%] leading-5 sm:leading-6">
                            Foudre is a social media agency founded on three strong areas of expertise.
                        </p>

                        {/* Floating Emoji */}
                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-16 top-[65%] sm:top-[70%] bg-[#FCE6D5] rounded-2xl px-3 py-5 flex items-center shadow-sm rotate-[-5deg]"
                        >
                            <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">👀</span>
                            <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">📱</span>
                            <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">📊</span>
                        </motion.div>
                    </div>

                    {/* MIDDLE IMAGES */}
                    <div className="relative w-[180px] h-[250px] sm:w-[200px] sm:h-[300px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:h-[400px] flex-shrink-0 mx-0 sm:mx-4 md:mx-8 flex items-center justify-center mb-10 md:mb-0">
                        {images.map((src, index) => (
                            <motion.img
                                key={index}
                                src={src}
                                initial={false}
                                animate={getCardAnimation(index)}
                                transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl origin-center"
                                style={{ willChange: "transform, z-index" }}
                            />
                        ))}
                    </div>

                    {/* RIGHT ACCORDION */}
                    <div className="w-full max-w-[400px] flex flex-col justify-center relative z-40 md:pl-5 lg:pl-0">
                        {rightContent.map((item, i) => (
                            <div key={i} className="flex flex-col border-b border-white last:border-0 py-4">
                                <h3
                                    onClick={() => handleItemClick(i)}
                                    className={`cursor-pointer font-beni font-black tracking-[0.5] text-[24px] sm:text-[30px] md:text-[40px] lg:text-[46px] uppercase leading-7 sm:leading-8 md:leading-8 transition-colors duration-500 ${activeIndex === i ? "text-orange-500" : "text-white"}`}
                                >
                                    {item.title}
                                </h3>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: activeIndex === i ? "auto" : 0,
                                        opacity: activeIndex === i ? 1 : 0,
                                        marginTop: activeIndex === i ? 12 : 0,
                                    }}
                                    className="overflow-hidden"
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="flex flex-wrap gap-1">
                                        {item.pills.map((pill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-orange-500 text-white rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs lg:text-sm font-clash font-medium tracking-wide"
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
                <div className="absolute bottom-4 left-4 sm:left-5 lg:left-9 z-50">
                    <span className="text-orange-500 font-clash font-regular uppercase text-xs sm:text-sm border-b border-orange-500">
                        Experts
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Expertise;