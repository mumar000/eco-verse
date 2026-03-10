"use client"

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Expertise = () => {
    // ==========================================
    // DESKTOP LOGIC (>= lg)
    // ==========================================
    const desktopContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: desktopContainerRef,
        offset: ["start start", "end end"]
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
        const targetScroll = containerTop + (index * windowHeight);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    // Card transform logic for desktop stacked images
    const getCardAnimation = (index) => {
        const position = (index - desktopActiveIndex + 3) % 3;
        if (position === 0) return { x: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1, filter: "brightness(1)" };
        else if (position === 1) return { x: 40, scale: 0.85, rotate: 3, zIndex: 20, opacity: 0.9, filter: "brightness(0.7)" };
        else return { x: -40, scale: 0.85, rotate: -3, zIndex: 10, opacity: 0.9, filter: "brightness(0.7)" };
    };

    // ==========================================
    // MOBILE LOGIC (< lg)
    // ==========================================
    const carouselRef = useRef(null);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

    // Track horizontal swipe to update mobile active index
    const handleMobileScroll = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        // Width of one card + 16px gap (gap-4)
        const cardWidth = container.children[0].offsetWidth + 16;

        // Calculate which card is currently centered
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex !== mobileActiveIndex && newIndex >= 0 && newIndex < images.length) {
            setMobileActiveIndex(newIndex);
        }
    };

    // Click mobile accordion to scroll carousel to image
    const scrollToMobileImage = (index) => {
        setMobileActiveIndex(index);
        if (carouselRef.current) {
            const container = carouselRef.current;
            const cardWidth = container.children[0].offsetWidth + 16;
            container.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
    };

    // ==========================================
    // DATA
    // ==========================================
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
        <>
            {/* CSS to hide the scrollbar for the mobile horizontal carousel smoothly */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* ========================================== */}
            {/* DESKTOP VIEW (Visible lg and above)        */}
            {/* ========================================== */}
            <div ref={desktopContainerRef} className="hidden lg:block relative h-[300vh] bg-[#00522D]">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    <div className="flex w-full max-w-[1400px] px-8 items-center justify-between">

                        {/* LEFT SECTION */}
                        <div className="w-full max-w-[400px] relative z-40">
                            <h1 className="text-[94px] leading-[0.7] font-beni font-black uppercase">
                                <span className="text-orange-500 block">REASONING</span>
                                <span className="text-orange-500 block">TO BETTER:</span>
                                <span className="block text-orange-300">RESONATING.</span>
                            </h1>

                            <p className="font-clash text-orange-500 mt-5 text-lg font-semibold w-[85%] leading-6">
                                Foudre is a social media agency founded on three strong areas of expertise.
                            </p>

                            <motion.div
                                animate={{ y: [-6, 6, -6] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-20 top-[70%] bg-[#FCE6D5] rounded-2xl px-3 py-5 flex items-center shadow-sm rotate-[-5deg]"
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
                                    transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
                                    className="absolute inset-0 w-full h-full object-cover rounded-3xl origin-center"
                                    style={{ willChange: "transform, z-index" }}
                                />
                            ))}
                        </div>

                        {/* RIGHT ACCORDION */}
                        <div className="w-full max-w-[400px] flex flex-col justify-center relative z-40">
                            {rightContent.map((item, i) => (
                                <div key={i} className="flex flex-col border-b border-white last:border-0 py-4">
                                    <h3
                                        onClick={() => handleDesktopItemClick(i)}
                                        className={`cursor-pointer font-beni font-black tracking-[0.5] text-[46px] uppercase leading-[0.9] transition-colors duration-500 ${desktopActiveIndex === i ? "text-orange-500" : "text-white"}`}
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
                                        <div className="flex flex-wrap gap-1">
                                            {item.pills.map((pill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-clash font-medium tracking-wide"
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
            <div className="block lg:hidden relative w-full bg-[#00522D] py-10 px-4 overflow-hidden">

                {/* TOP TEXT */}
                <div className="w-full relative z-20 mb-10">
                    <h1 className="text-[3.5rem] sm:text-[5rem] leading-[0.7] font-beni font-black uppercase relative z-10">
                        <span className="text-orange-500 block">REASONING</span>
                        <span className="text-orange-500 block">TO BETTER:</span>
                        <span className="block text-orange-300">RESONATING.</span>
                    </h1>

                    <p className="font-clash text-orange-500 mt-4 text-base sm:text-lg font-semibold w-[95%] sm:w-[80%] leading-snug">
                        Foudre is a social media agency founded on three strong areas of expertise.
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

                {/* HORIZONTAL IMAGE CAROUSEL (1.5 Images Visible) */}
                <div
                    ref={carouselRef}
                    onScroll={handleMobileScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar w-full scroll-smooth"
                >
                    {images.map((src, i) => (
                        <div
                            key={i}
                            // 75vw forces it to take up 75% of the screen, leaving 25% for the next image to peek out (giving the 1.5 effect)
                            className="min-w-[70vw] sm:min-w-[60vw] snap-center shrink-0 h-[300px] sm:h-[400px]"
                        >
                            <img
                                loading='lazy'
                                src={src}
                                alt={`Expertise ${i}`}
                                className="w-full h-full object-cover rounded-3xl shadow-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* ACCORDION TEXT UPDATING ON SWIPE */}
                <div className="w-full flex flex-col justify-center mt-4">
                    {rightContent.map((item, i) => (
                        <div key={i} className="flex flex-col border-b border-white/50 last:border-0 py-4">
                            <h3
                                onClick={() => scrollToMobileImage(i)}
                                className={`cursor-pointer font-beni font-black tracking-wide text-[32px] sm:text-[40px] uppercase leading-[0.9] transition-colors duration-500 ${mobileActiveIndex === i ? "text-orange-500" : "text-white"}`}
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
                                <div className="flex flex-wrap gap-2">
                                    {item.pills.map((pill, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-orange-500 text-white rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[13px] font-clash font-medium tracking-wide shadow-sm"
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
        </>
    );
};

export default Expertise;