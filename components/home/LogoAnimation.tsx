"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Megaphone,
  Mail,
  User,
  LayoutDashboard,
  MessageSquareQuote,
  Ticket,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assets
import echoVerseLogo from "@/public/assets/echoverse-logo.png";
import backAnimation from "@/public/assets/backAnimation.svg";

interface IntegrationCard {
  icon: React.ReactNode;
  title: string;
  pos: string;
}

const LogoAnimation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: IntegrationCard[] = [
    {
      icon: <Mail className="w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 mb-1.5 md:mb-2" />,
      title: "Email newsletter",
      pos: "top-[16%] md:top-[12%] left-[4%] md:left-[5%] lg:left-[10%]",
    },
    {
      icon: <Megaphone className="w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 mb-1.5 md:mb-2" />,
      title: "Advertising",
      pos: "bottom-[15%] md:bottom-[10%] left-[18%] md:left-[5%]",
    },
    {
      icon: <User className="w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 mb-1.5 md:mb-2" />,
      title: "Social networks",
      pos: "bottom-[38%] md:bottom-[22%] left-[2%] md:left-[20%] lg:left-[25%]",
    },
    {
      icon: <LayoutDashboard className="w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 mb-1.5 md:mb-2" />,
      title: "CRM",
      pos: "top-[16%] right-[4%] md:right-[20%] lg:right-[25%]",
    },
    {
      icon: <MessageSquareQuote className="w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 mb-1.5 md:mb-2" />,
      title: "Chatbot",
      pos: "bottom-[15%] right-[18%]",
    },
    {
      icon: <Ticket className="w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 mb-1.5 md:mb-2" />,
      title: "Ticket operator",
      pos: "bottom-[38%] right-[2%] md:right-[3%] lg:right-[5%]",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create the scroll-bound timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%", // Starts when top of section hits 10% of viewport
          end: "bottom bottom", // Ends when bottom of section hits center of viewport
          scrub: 1, // Smoothly binds movement to scroll (1 second delay)
          markers: false, // Set to true to debug start/end positions
        },
      });

      // Move the logo from top to the center of the lines
      // On mobile, calculate a true center target from live element positions.
      const isMobile = window.innerWidth < 768;

      let yValue = window.innerWidth < 1024 ? 350 : 500;

      if (isMobile && logoRef.current && containerRef.current) {
        const logoRect = logoRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const logoCenterY = logoRect.top + logoRect.height / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        yValue = containerCenterY - logoCenterY;
      }

      tl.to(logoRef.current, {
        y: yValue,
        scale: 0.8,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex bg-[#1C4238] flex-col items-center justify-start pt-10 overflow-hidden relative min-h-[70vh] md:min-h-[50vh]"
    >
      {/* 1. INITIAL LOGO POSITION (TOP) */}
      <div ref={logoRef} className="z-50">
        <Image
          className="w-[190px] md:w-[300px] lg:w-[400px] h-auto bg-white rounded-xl"
          src={echoVerseLogo}
          alt="Logo of Echo Verse"
          priority
        />
      </div>

      {/* 3. ANIMATION ARENA */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] md:aspect-[16/7] max-w-[1400px]"
      >
        {/* Background Image (Static Lines as requested) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backAnimation}
            alt="Backside Animation"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Integration Cards with Framer Motion for entrance */}
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`absolute ${card.pos} z-10 bg-orange-500 rounded-xl shadow-sm p-2.5 md:p-4 w-[84px] h-[84px] md:w-30 lg:w-36 md:h-30 lg:h-36 flex flex-col items-center justify-center text-center transition-transform hover:scale-110 duration-300`}
          >
            <div className="text-white">{card.icon}</div>
            <p className="text-white font-clash font-medium text-[9px] sm:text-sm lg:text-base leading-3 md:leading-4 mt-1.5 md:mt-2">
              {card.title}
            </p>
          </motion.div>
        ))}

        {/* This is the destination spot (Visual Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default LogoAnimation;
