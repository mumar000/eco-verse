"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import logo from "@/public/assets/charLogo.svg";
import Image from "next/image";
import QuizModal from "@/components/home/QuizModal";
import Link from "next/link";

const Footer = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Smooth spring animation for sliding up from the bottom
  const slideUp = {
    hidden: { y: 250, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
    },
  };

  return (
    <div
      id="contact-us"
      className="relative w-full overflow-hidden bg-[#FFEDD5] pt-10 sm:pt-20"
    >
      {/* --- TOP SECTION: IMAGE & CONTACT BOX --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center px-6 lg:px-50"
      >
        {/* Left Image (Tilted Left) */}
        <motion.img
          variants={slideUp}
          // High-quality placeholder matching the studio team vibe
          src="/assets/middle2.png"
          alt="Team"
          className="w-full md:w-[50%] lg:w-[45%] h-auto rounded-3xl object-cover rotate-[-4deg] z-10"
        />

        {/* Right Contact Box (Tilted Right) */}
        <motion.div
          variants={slideUp}
          className="w-full  md:w-[50%] lg:w-[45%] bg-[#F97316] rounded-3xl px-4 py-10 flex flex-col items-center text-center text-white rotate-[6deg] z-"
        >
          <span className="font-clash font-medium text-base mb-2 opacity-80">No pressure, just clarity</span>

          <h2 className="font-beni font-black text-[40px] md:text-[60px] lg:text-[70px] leading-14 mb-6 uppercase">
            LET&apos;S SEE IF THIS MAKES SENSE.
          </h2>

          <p className="font-clash font-medium text-sm md:text-base lg:text-[15px] md:w-[80%] lg:w-[70%] leading-5 mb-8">
            Share a bit about your brand, your current challenges, or what you&apos;re trying to unlock next. You&apos;ll get a thoughtful response from someone who understands this space - not a generic sales reply.
          </p>

          <Link
            href="/contact"
            className="bg-white/30 hover:bg-white/40 transition-colors duration-300 px-4 py-3 rounded-lg font-clash cursor-pointer z-60 font-semibold text-white text-xs"
          >
            Start the conversation
          </Link>
        </motion.div>
      </motion.div>

      {/* --- MIDDLE SECTION: FOUDRE SVGS --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }, // Staggers the letters popping up
        }}
        className="pointer-events-none relative w-full flex -space-x-1 items-center justify-center px-4 mb-10 sm:mb-0 sm:-mt-40 z-20"
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
        <Image
          src={logo}
          alt="Logo"
          width={500}
          height={500}
          className="w-[500px] md:w-[600px] lg:w-[800px] select-none"
        />
      </motion.div>

      {/* --- BOTTOM SECTION: COPYRIGHT & LINKS --- */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 pb-8 text-[#00522D] font-clash font-medium text-[11px] lg:text-xs uppercase -mt-12">
        {/* Left: Copyright & Socials */}
        <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-4">
          <span>© 2026 ECHO VERSE, all rights reserved.</span>
          <span className="hidden lg:inline text-[#00522D]/60">Where creator marketing shifts from activity to real business impact.</span>

          <div className="flex items-center gap-2">
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/echoverse.360/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Facebook Icon */}
            <a
              href="https://www.facebook.com/EchoVerse.360/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* LinkedIn Icon */}
            <a
              href="https://www.facebook.com/EchoVerse.360/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 lg:mt-0">
          <Link
            href="/terms-and-conditions"
            className="hover:opacity-70 transition-opacity"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:opacity-70 transition-opacity"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <QuizModal
        open={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSubmit={async (values) => {
          // Replace this with an API route or CRM integration when backend wiring is ready.
          console.info("Footer quiz submission", values);
        }}
      />
    </div>
  );
};

export default Footer;
