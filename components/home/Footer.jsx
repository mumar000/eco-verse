"use client"

import React from 'react';
import { motion } from 'framer-motion';

import logo1 from "@/public/assets/logo1.svg"
import logo2 from "@/public/assets/logo2.svg"
import logo3 from "@/public/assets/logo3.svg"
import logo4 from "@/public/assets/logo4.svg"
import logo5 from "@/public/assets/logo5.svg"
import logo6 from "@/public/assets/logo6.svg"

import logo from "@/public/assets/charLogo.svg"
import Image from 'next/image';

const Footer = () => {
    // Smooth spring animation for sliding up from the bottom
    const slideUp = {
        hidden: { y: 250, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 }
        }
    };

    const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

    return (
        <div className="relative w-full overflow-hidden bg-[#FFEDD5] pt-10 sm:pt-20">

            {/* --- TOP SECTION: IMAGE & CONTACT BOX --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
                className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center px-6 lg:px-50"
            >
                {/* Left Image (Tilted Left) */}
                <motion.img
                    variants={slideUp}
                    // High-quality placeholder matching the studio team vibe
                    src="https://www.agencefoudre.com/media/site/9e2180cad6-1764264569/agence-foudre-1-1024x-q80.avif"
                    alt="Team"
                    className="w-full md:w-[50%] lg:w-[45%] h-auto rounded-3xl object-cover rotate-[-4deg] z-10"
                />

                {/* Right Contact Box (Tilted Right) */}
                <motion.div
                    variants={slideUp}
                    className="w-full md:w-[50%] lg:w-[45%] bg-[#F97316] rounded-3xl px-4 py-10 flex flex-col items-center text-center text-white rotate-[6deg] z-10"
                >
                    <span className="font-clash font-medium text-base mb-2">Contact</span>

                    <h2 className="font-beni font-black text-[40px] md:text-[60px] lg:text-[70px] leading-14 mb-6 uppercase">
                        TELL US ABOUT IT.
                    </h2>

                    <p className="font-clash font-medium text-sm md:text-base lg:text-[15px] md:w-[80%] lg:w-[70%] leading-5 mb-8">
                        A mini quiz, 3 questions, less than a minute. We receive your answers and get back to you quickly.
                    </p>

                    <button className="bg-white/30 hover:bg-white/40 transition-colors duration-300 px-4 py-3 rounded-lg font-clash font-semibold text-white text-xs">
                        Start the quiz
                    </button>
                </motion.div>
            </motion.div>

            {/* --- MIDDLE SECTION: FOUDRE SVGS --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } } // Staggers the letters popping up
                }}
                className="w-full flex -space-x-1 items-center justify-center px-4 mb-10 sm:mb-0 sm:-mt-40 z-50"
            >
                {/* {logos.map((logo, index) => (
                    <motion.img
                        key={index}
                        variants={slideUp}
                        src={logo?.src || logo} // Safely handles both Next.js objects and raw string imports
                        alt={`letter-${index}`}
                        className="w-[16%] h-auto object-contain"
                    />
                ))} */}
                <Image src={logo} alt="Logo" width={500} height={500} className="w-[500px] md:w-[600px] lg:w-[800px] z-50" />
            </motion.div>

            {/* --- BOTTOM SECTION: COPYRIGHT & LINKS --- */}
            <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 pb-8 text-[#00522D] font-clash font-medium text-[11px] lg:text-xs uppercase -mt-12">

                {/* Left: Copyright & Socials */}
                <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-4">
                    <span>© 2026 ECHO VERSE, all rights reserved.</span>

                    <div className="flex items-center gap-2">
                        {/* Instagram Icon */}
                        <a href="#" className="hover:opacity-70 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        {/* TikTok Icon */}
                        <a href="#" className="hover:opacity-70 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v7a6 6 0 1 1-6-6v3a3 3 0 0 0 3 3z"></path>
                            </svg>
                        </a>
                        {/* Pinterest Icon */}
                        <a href="#" className="hover:opacity-70 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.65 8 6.55 9.42-.09-.79-.17-2.01.04-2.88.19-.8 1.25-5.3 1.25-5.3s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.34.68 1.34 1.5 0 .91-.58 2.27-.88 3.53-.25 1.05.53 1.9 1.56 1.9 1.88 0 3.32-1.98 3.32-4.85 0-2.54-1.83-4.32-4.45-4.32-3.04 0-4.83 2.28-4.83 4.64 0 .91.35 1.89.79 2.42.09.1.1.2.07.31-.09.38-.3 1.22-.34 1.39-.05.18-.16.22-.35.13-1.3-.61-2.11-2.52-2.11-4.06 0-3.31 2.4-6.35 6.93-6.35 3.65 0 6.49 2.6 6.49 6.07 0 3.63-2.29 6.54-5.46 6.54-1.07 0-2.07-.56-2.42-1.21l-.66 2.5c-.24.93-.89 2.1-1.32 2.82 1.04.32 2.14.49 3.28.49 5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>
                            </svg>
                        </a>
                        {/* LinkedIn Icon */}
                        <a href="#" className="hover:opacity-70 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right: Legal Links */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2 lg:mt-0">
                    <a href="#" className="hover:opacity-70 transition-opacity">Terms & Conditions</a>
                    <a href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
                </div>

            </div>
        </div>
    );
};

export default Footer;