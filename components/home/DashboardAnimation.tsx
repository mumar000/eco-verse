"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Image Imports
import dashboardImage1 from "@/public/assets/dashbaord1.svg"; // Reports
import dashboardImage2 from "@/public/assets/dashbaord2.svg"; // Traffic by Location
import dashboardImage3 from "@/public/assets/dashbaord3.svg"; // Analytics
import dashboardImage4 from "@/public/assets/dashbaord4.svg"; // Light speed booster

import numbersImage1 from "@/public/assets/numbers1.svg"; // Views (Lime)
import numbersImage2 from "@/public/assets/numbers2.svg"; // Active Users (Pink)
import numbersImage3 from "@/public/assets/numbers3.svg"; // New Users (Dark Blue)
import numbersImage4 from "@/public/assets/numbers4.svg"; // Visits (Light Blue)

import leftDetail from "@/public/assets/leftDetail.svg"; // Quick Summary Arrow
import rightDetail from "@/public/assets/rightDetail.svg"; // Improved UI Arrow

type DashboardAnimationProps = {
  scrollSectionRef?: React.RefObject<HTMLElement | null>;
};

const DashboardAnimation = ({ scrollSectionRef }: DashboardAnimationProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Continuous Floating Animation for the Details (Arrows)
      gsap.to(".floating-detail", {
        y: 20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Scroll-Triggered Scatter Animation for the Cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSectionRef?.current ?? sectionRef.current,
          start: "top 20%",     // Starts animating as soon as the section enters the viewport
          end: "bottom bottom", // Fully slots into place when the section is centered on screen
          scrub: 1,             // Binds the downward movement smoothly to the user's scroll amount
        },
      });

      // Scattered at the TOP of the section initially, then coming downwards on scroll
      tl.from(".animated-card-1", { x: "75vw", y: "-170vh", rotation: -15, scale: 1, ease: "none" }, 0) // Lime Card
        .from(".animated-card-2", { x: "-20vw", y: "-155vh", rotation: -10, scale: 1, ease: "none" }, 0) // Pink Card
        .from(".animated-card-3", { x: "15vw", y: "-163vh", rotation: 0, scale: 1, ease: "none" }, 0)  // Dark Blue Card
        .from(".animated-card-4", { x: "55vw", y: "-165vh", rotation: 15, scale: 1, ease: "none" }, 0); // Light Blue Card
        
    }, sectionRef);

    return () => ctx.revert();
  },[]);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-20 w-full min-h-screen py-10 overflow-visible flex justify-center items-center bg-[#154238]"
    >
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: `50px 50px`
        }} 
      />

      {/* Main Dashboard Wrapper */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 flex flex-col gap-5 md:gap-6">
        
        {/* ROW 1: Reports (Left) & Traffic by Location (Right) */}
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
          {/* Reports Chart */}
          <div className="w-full md:w-[75%] bg-white rounded-2xl p-4 flex items-center justify-center">
            <Image src={dashboardImage1} alt="Reports Dashboard" className="w-full h-full object-contain rounded-xl" />
          </div>
          
          {/* Traffic Location Pie Chart */}
          <div className="w-full md:w-[25%] bg-white rounded-2xl p-4 flex items-center justify-center">
            <Image src={dashboardImage2} alt="Traffic Location Dashboard" className="w-full h-auto object-contain rounded-xl" />
          </div>
        </div>

        {/* ROW 2: 2x2 Number Cards (Left), Analytics (Middle), Light Speed (Right) */}
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
          
          {/* 2x2 Empty Slots Wrapper */}
          <div className="w-full md:w-[50%] bg-white rounded-2xl px-4 flex flex-col justify-center relative">
            
            {/* The Grid layout for the slots */}
            <div className="grid grid-cols-2 gap-2 w-full relative">
              
              {/* Slot 1 (Lime Card Destination) */}
              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                <Image 
                  src={numbersImage1} 
                  alt="Views" 
                  className="animated-card-1 absolute inset-0 w-full h-full object-contain z-50 origin-center" 
                />
              </div>

              {/* Slot 2 (Pink Card Destination) */}
              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                <Image 
                  src={numbersImage2} 
                  alt="Active Users" 
                  className="animated-card-2 absolute inset-0 w-full h-full object-contain z-50 origin-center" 
                />
              </div>

              {/* Slot 3 (Dark Blue Card Destination) */}
              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center -mt-8">
                <Image 
                  src={numbersImage3} 
                  alt="New Users" 
                  className="animated-card-3 absolute inset-0 w-full h-full object-contain z-50 origin-center" 
                />
              </div>

              {/* Slot 4 (Light Blue Card Destination) */}
              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center -mt-8">
                <Image 
                  src={numbersImage4} 
                  alt="Visits" 
                  className="animated-card-4 absolute inset-0 w-full h-full object-contain z-50 origin-center" 
                />
              </div>

            </div>
          </div>

          {/* Analytics Donut Chart */}
          <div className="w-full md:w-[30%] bg-white rounded-2xl flex items-center justify-center">
            <Image src={dashboardImage3} alt="Analytics Dashboard" className="w-full h-auto object-contain rounded-xl" />
          </div>

          {/* Light Speed Booster Gauge */}
          <div className="w-full md:w-[28%] rounded-2xl flex items-center justify-center overflow-hidden bg-transparent">
            <Image src={dashboardImage4} alt="Light Speed Dashboard" className="w-full h-auto object-contain rounded-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardAnimation;
