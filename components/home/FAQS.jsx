"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const FAQS = () => {
    // Array state to allow multiple FAQs to be open at the same time
    const [openItems, setOpenItems] = useState([]);

    // Store references to the answer wrappers for GSAP
    const contentRefs = useRef([]);

    const toggleItem = (index) => {
        setOpenItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const faqs = [
        {
            question: "What types of companies do you support?",
            answer: "At Foudre, we primarily support SMEs, mid-sized companies, and large groups, whether regional or national. Our mission: to help these organizations strengthen their image, develop their visibility, and unite their communities."
        },
        {
            question: "Do you work only in Montpellier or also remotely?",
            answer: "Our agency is based in the heart of Montpellier, but we collaborate with clients throughout France and abroad. We organize photo and video shoots on location, lasting one or more days, and we work remotely using shared tools and regular communication. The result: the same high-quality support, whether you are in France or abroad."
        },
        {
            question: "What specific services do you offer?",
            answer: "We offer complete social media strategy, content creation (photo/video), daily community management, and targeted paid advertising campaigns tailored to your specific goals."
        },
        {
            question: "Do you only offer social media management or also consulting/support?",
            answer: "We offer both! Whether you want us to completely manage your accounts or just guide your internal team with consulting and strategy, we adapt entirely to your needs."
        },
        {
            question: "What results can be expected when working with Agence Foudre?",
            answer: "You can expect increased brand awareness, stronger community engagement, a cohesive visual identity, and measurable growth in your key performance indicators (KPIs)."
        },
        {
            question: "How to get a quote or start a collaboration with Agence Foudre?",
            answer: "It's very simple! Via WhatsApp, by answering the questionnaire at the bottom of the page, or by email. Next, we organize an initial exchange to understand your expectations and build a tailor-made proposal."
        }
    ];

    // GSAP Animation Logic
    useEffect(() => {
        faqs.forEach((_, idx) => {
            const el = contentRefs.current[idx];
            if (!el) return;

            const isOpen = openItems.includes(idx);

            if (isOpen) {
                // Smooth GSAP Bounce Open
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    marginTop: 24,
                    duration: 0.75,
                    ease: "bounce.out" // Authentic GSAP Bounce
                });
            } else {
                // Smooth non-bouncy close
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    }, [openItems, faqs]);

    return (
        <div className="relative min-h-screen bg-[#FFF8F6]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-start justify-between relative">

                {/* --- LEFT SECTION (STICKY) --- */}
                {/* h-screen and sticky top-0 ensures it stays locked in place while right side scrolls */}
                <div className="w-full lg:w-[45%] sticky top-0 h-screen flex flex-col justify-center pt-20 lg:pt-0">

                    <h2 className="text-[94px] leading-[0.7] font-beni font-black uppercase relative z-10">
                        <span className="text-orange-500 block">SMALL</span>
                        <span className="text-orange-500 block">QUESTIONS,</span>
                        <span className="text-orange-300 block">BIG</span>
                        <span className="text-orange-300 block">ANSWERS</span>
                    </h2>

                    {/* Floating Emoji Bubble */}
                    <motion.div
                        animate={{ y: [-6, 6, -6] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-[5%] top-[65%] lg:right-[25%] lg:top-[55%] bg-orange-200 rounded-2xl px-4 py-4 flex items-center shadow-sm rotate-[-5deg] z-20"
                    >
                        <span className="text-3xl drop-shadow-sm">👷</span>
                        <span className="text-3xl drop-shadow-sm">👏</span>
                        <span className="text-3xl drop-shadow-sm">📣</span>
                    </motion.div>

                    {/* Bottom Left Label */}
                    <div className="absolute bottom-8 left-0">
                        <span className="text-orange-500 font-clash font-regular uppercase text-sm border-b-2 border-orange-500">
                            FAQ
                        </span>
                    </div>
                </div>

                {/* --- RIGHT SECTION (SCROLLABLE) --- */}
                {/* This section naturally scrolls. padding-y gives it scrolling headroom/footroom */}
                <div className="w-full lg:w-[50%] py-[10vh] lg:py-[20vh] flex flex-col z-10 pl-0 pr-15">
                    {faqs.map((faq, idx) => {
                        const isOpen = openItems.includes(idx);

                        return (
                            <div key={idx} className="flex flex-col border-b border-orange-300/40 last:border-0 py-6">

                                {/* QUESTION BUTTON */}
                                <button
                                    onClick={() => toggleItem(idx)}
                                    className="flex items-center justify-between w-full text-left group outline-none"
                                >
                                    <h3 className={`font-clash font-bold text-[22px] leading-none transition-colors duration-300 w-[100%] cursor-pointer pr-20 ${isOpen ? "text-orange-500" : "text-orange-300 group-hover:text-orange-500"}`}>
                                        {faq.question}
                                    </h3>

                                    {/* ROTATING ICON BUTTON */}
                                    <motion.div
                                        animate={{
                                            rotate: isOpen ? 45 : 0,
                                            backgroundColor: isOpen ? "#EA580C" : "#FDBA74", // Shifts from light orange to deep orange
                                            color: isOpen ? "#FFFFFF" : "#000000"
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 rounded-full flex items-center justify-center cursor-pointer"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </motion.div>
                                </button>

                                {/* ANSWER CONTENT WITH GSAP BOUNCE ANIMATION */}
                                <div
                                    ref={(el) => (contentRefs.current[idx] = el)}
                                    className="overflow-hidden"
                                    style={{ height: 0, opacity: 0, marginTop: 0 }} // Starts completely hidden securely 
                                >
                                    <p className="font-clash text-orange-600 font-medium text-[16px] leading-5 w-[75%]">
                                        {faq.answer}
                                    </p>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default FAQS;