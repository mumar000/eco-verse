"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import DashboardAnimation from "@/components/home/DashboardAnimation";

// Image imports (using the paths you provided)
import smileImg from "@/public/assets/smile.svg";
import bulbImg from "@/public/assets/bulb.svg";
import blackTag from "@/public/assets/blackTag.svg";
import whiteTag from "@/public/assets/whiteTag.svg";

const Hero2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const smileRef = useRef<HTMLImageElement>(null);
  const bulbRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // GSAP Animation: Elements move away from the cursor
    const handleMouseMove = (e: MouseEvent) => {
      const repelElement = (
        el: HTMLElement | null,
        maxDist: number,
        pushStrength: number
      ) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = centerX - e.clientX;
        const deltaY = centerY - e.clientY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < maxDist) {
          // Calculate how far to push based on how close the cursor is
          const force = (maxDist - distance) / maxDist;
          const moveX = (deltaX / distance) * pushStrength * force;
          const moveY = (deltaY / distance) * pushStrength * force;

          gsap.to(el, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          // Return to original position smoothly
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      };

      // Apply the repel effect to both images (element, interaction distance, move strength)
      repelElement(smileRef.current, 200, 60);
      repelElement(bulbRef.current, 200, 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  },[]);

  return (
    <section ref={sectionRef}>
      <div className="relative flex flex-col items-center justify-center h-screen w-full bg-white text-orange-500 overflow-hidden px-4 pt-10">
        {/* Container for Heading and Floating Images */}
        <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-6xl">
          {/* Main Heading */}
          <h1 className="font-bue text-[150px] leading-[0.8] text-center uppercase font-bold m-0 z-20 pointer-events-none">
            Creator Marketing
            <br />
            Systemized
          </h1>

          {/* Floating Bulb Image */}
          <div className="absolute left-[-5%] sm:left-[13%] bottom-[-5%] sm:bottom-10 -rotate-10 z-30">
            <Image
              ref={bulbRef}
              src={bulbImg}
              alt="Bulb"
              width={180}
              height={180}
              className="w-24 sm:w-28 md:w-30 lg:w-32 h-auto"
              priority
            />
          </div>

          {/* Floating Smile Image */}
          <div className="absolute right-[-5%] sm:right-[12%] top-[-5%] sm:top-[15%] z-30">
            <Image
              ref={smileRef}
              src={smileImg}
              alt="Smile"
              width={160}
              height={160}
              className="w-24 sm:w-28 md:w-30 lg:w-32h-auto"
              priority
            />
          </div>
        </div>

        {/* Subheading */}
        <div className="z-10 mt-4 text-center max-w-2xl">
          <p className="text-[22px] leading-snug font-medium font-clash">
            Powering brands to launch and manage creator campaigns
          </p>
        </div>

        {/* Ticket Button */}
        <button className="z-10 mt-10 flex items-center bg-orange-500 cursor-pointer text-white font-medium font-clash uppercase text-base rounded-md overflow-hidden transition-all hover:scale-105 active:scale-95">
          <span className="px-6 py-4">Book Tickets</span>
          <div className="border-l-2 border-dashed border-orange-300 px-4 py-4 flex items-center justify-center bg-orange-500">
            <Image
              src={whiteTag}
              alt="Ticket Icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
        </button>
      </div>

      <DashboardAnimation scrollSectionRef={sectionRef} />
    </section>
  );
};

export default Hero2;
