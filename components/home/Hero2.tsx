"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import DashboardAnimation from "@/components/home/DashboardAnimation";

// Image imports
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
        pushStrength: number,
      ) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = centerX - e.clientX;
        const deltaY = centerY - e.clientY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < maxDist) {
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
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      };

      repelElement(smileRef.current, 200, 60);
      repelElement(bulbRef.current, 200, 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="relative flex flex-col items-center justify-center min-h-[100svh] md:h-screen w-full bg-white text-orange-500 overflow-hidden px-4 pt-8 sm:pt-10">
        <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-6xl">
          <p className="font-clash text-sm sm:text-base font-semibold text-orange-300 uppercase tracking-widest mb-4 z-20 pointer-events-none">
            For brands ready to grow beyond noise
          </p>
          <h1 className="font-bue text-[40px] sm:text-[68px] md:text-[84px] lg:text-[128px] leading-[0.82] text-center uppercase font-bold m-0 z-20 pointer-events-none">
            <span className="block">
              Turn Creator <span className="text-orange-300">Marketing</span>
            </span>
            <span className="block">Into Real Growth</span>
          </h1>

          <div className="absolute  left-2 md:left-[17%] lg:left-[13%] bottom-2 md:bottom-6 lg:bottom-10 -rotate-10 z-30">
            <Image
              ref={bulbRef}
              src={bulbImg}
              alt="Bulb"
              width={180}
              height={180}
              className="w-16 sm:w-28 md:w-24 lg:w-32 h-auto"
              priority
            />
          </div>

          <div className="absolute right-2 md:right-[16%] lg:right-[12%] top-3 sm:top-[15%] z-30">
            <Image
              ref={smileRef}
              src={smileImg}
              alt="Smile"
              width={160}
              height={160}
              className="w-16 sm:w-28 md:w-24 lg:w-32 h-auto"
              priority
            />
          </div>
        </div>

        <div className="z-10 mt-4 text-center max-w-2xl px-2 sm:px-0">
          <p className="text-sm sm:text-base lg:text-[22px] leading-5 lg:leading-6 font-medium font-clash">
            No more guessing. No more vanity metrics.{" "}
            <br className="hidden sm:block" /> Just clear strategy, better creators, and outcomes you can actually see.
          </p>
        </div>

        {/* Updated Dividing Ticket Button */}
        <button className="group z-10 mt-10 flex items-center bg-transparent cursor-pointer overflow-visible transition-all">
          {/* Left Half: Text */}
          <div className="bg-orange group-hover:bg-[#154238] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-l-md font-medium font-clash uppercase text-sm sm:text-base transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:-translate-y-3 group-hover:-rotate-6">
            Join Now
          </div>

          {/* Right Half: Icon */}
          <div className="bg-orange group-hover:bg-[#154238] border-l-2 border-dashed border-orange-300 group-hover:border-transparent px-3 sm:px-4 py-3 sm:py-4 rounded-r-md transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-3.5 group-hover:rotate-6 relative flex items-center justify-center w-[46px] h-[44px] sm:w-[54px] sm:h-[56px]">
            {/* Black Tag (Visible by default) */}
            <div className=" absolute transition-opacity duration-300 group-hover:opacity-0">
              <Image
                src={whiteTag}
                alt="Ticket Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            {/* White Tag (Visible on hover) */}
            <div className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src={whiteTag}
                alt="Ticket Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </div>
        </button>
      </div>

      <DashboardAnimation scrollSectionRef={sectionRef} />
    </section>
  );
};

export default Hero2;
