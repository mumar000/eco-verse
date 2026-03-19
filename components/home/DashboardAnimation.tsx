"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dashboardImage1 from "@/public/dashboard.jpg";

import numbersImage1 from "@/public/assets/numbers1.svg";
import numbersImage2 from "@/public/assets/numbers2.svg";
import numbersImage3 from "@/public/assets/numbers3.svg";
import numbersImage4 from "@/public/assets/numbers4.svg";

type DashboardAnimationProps = {
  scrollSectionRef?: React.RefObject<HTMLElement | null>;
};

const AudienceMockCard = () => {
  const ageData = [
    { label: "18-24", female: 18, male: 14 },
    { label: "25-34", female: 22, male: 17 },
    { label: "35-44", female: 10, male: 8 },
    { label: "45-54", female: 5, male: 3 },
    { label: "55+", female: 2, male: 1 },
  ];

  const areaData = [
    { label: "Karachi", value: 92 },
    { label: "Lahore", value: 69 },
    { label: "Faisalabad", value: 44 },
    { label: "Rawalpindi", value: 30 },
  ];

  return (
    <div className="w-full max-w-[345px] rounded-2xl border border-orange-100 bg-gradient-to-b from-[#fffaf6] to-white p-3 md:p-4 shadow-[0_10px_35px_rgba(249,115,22,0.14)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-orange-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-500 text-[10px]">
            👥
          </span>
          <h3 className="font-clash font-semibold text-zinc-900 text-xs md:text-sm">
            Estimated Audience
          </h3>
        </div>
        <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[9px] font-clash font-medium text-orange-600">
          +12.4%
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-orange-100 bg-white px-2 py-1.5">
          <p className="font-clash text-[9px] text-zinc-500">Female</p>
          <p className="font-clash text-sm font-semibold text-orange-500">
            42.69%
          </p>
        </div>
        <div className="rounded-lg border border-orange-100 bg-white px-2 py-1.5">
          <p className="font-clash text-[9px] text-zinc-500">Male</p>
          <p className="font-clash text-sm font-semibold text-orange-700">
            57.31%
          </p>
        </div>
      </div>

      <div className="mt-2.5 rounded-lg border border-orange-100 bg-white p-2.5">
        <p className="font-clash text-[10px] text-zinc-500 font-medium mb-2">
          Gender Split
        </p>
        <div className="flex items-center gap-2.5">
          <div className="relative h-16 w-16 rounded-full bg-[conic-gradient(#f97316_0_42.69%,#fdba74_42.69%_100%)] shrink-0">
            <div className="absolute inset-[13px] rounded-full bg-white" />
          </div>

          <div className="w-full space-y-1.5">
            <div>
              <div className="flex justify-between text-[9px] font-clash text-zinc-500 mb-0.5">
                <span>Female</span>
                <span>42.69%</span>
              </div>
              <div className="h-1.5 rounded-full bg-orange-100 overflow-hidden">
                <div className="h-full w-[42.69%] rounded-full bg-orange-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-clash text-zinc-500 mb-0.5">
                <span>Male</span>
                <span>57.31%</span>
              </div>
              <div className="h-1.5 rounded-full bg-orange-100 overflow-hidden">
                <div className="h-full w-[57.31%] rounded-full bg-orange-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2.5 rounded-lg border border-orange-100 bg-white p-2.5">
        <p className="font-clash text-[10px] text-zinc-500 font-medium mb-2">
          Age
        </p>
        <div className="space-y-1.5">
          {ageData.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[32px_1fr] items-center gap-1.5"
            >
              <span className="font-clash text-[9px] text-zinc-500">
                {item.label}
              </span>
              <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden flex">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${item.female}%` }}
                />
                <div
                  className="h-full bg-orange-300"
                  style={{ width: `${item.male}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 rounded-lg border border-orange-100 bg-white p-2.5">
        <p className="font-clash text-[10px] text-zinc-500 font-medium mb-2">
          Top Areas
        </p>
        <div className="space-y-1.5">
          {areaData.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[60px_1fr_24px] items-center gap-1"
            >
              <span className="font-clash text-[9px] text-zinc-500 truncate">
                {item.label}
              </span>
              <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="text-[9px] text-right font-clash text-zinc-400">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FollowerGrowthMiniCard = () => {
  const followerBars = [84, 70, 55, 48, 52, 60, 50, 47, 58, 63, 51, 60, 62];
  const followerLine = [50, 54, 60, 68, 71, 61, 44, 40, 58, 74, 70, 59, 58];

  const chartWidth = 100;
  const chartHeight = 40;

  const linePoints = followerLine
    .map((value, index) => {
      const pointX = (index / (followerLine.length - 1)) * chartWidth;
      const pointY = chartHeight - (value / 100) * 30 - 4;
      return `${pointX},${pointY}`;
    })
    .join(" ");

  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-orange-100 bg-gradient-to-b from-white to-[#fff8f3] p-3 shadow-[0_10px_28px_rgba(249,115,22,0.12)]">
      <div className="flex items-center gap-2 border-b border-orange-100 pb-2.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-500 text-[10px]">
          📈
        </span>
        <h3 className="font-clash font-semibold text-zinc-900 text-xs md:text-sm">
          Follower Growth
        </h3>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-orange-100 bg-white px-2 py-1.5">
          <p className="font-clash text-[9px] text-zinc-500">Followers</p>
          <p className="font-clash text-base font-semibold text-zinc-900 leading-none mt-1">
            233,420
          </p>
        </div>
        <div className="rounded-lg border border-orange-100 bg-white px-2 py-1.5">
          <p className="font-clash text-[9px] text-zinc-500">New Posts</p>
          <p className="font-clash text-base font-semibold text-zinc-900 leading-none mt-1">
            12
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 font-clash text-[9px] text-orange-600">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Follower
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 font-clash text-[9px] text-orange-600">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f8a]" />
          Post
        </span>
      </div>

      <div className="mt-2.5 rounded-xl border border-orange-100 bg-white p-2">
        <div className="relative h-[96px]">
          <div className="absolute inset-0 grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 items-end">
            {followerBars.map((barValue, index) => (
              <div
                key={`bar-${index}`}
                className="rounded-sm bg-orange-200/70"
                style={{ height: `${Math.max(10, barValue)}%` }}
              />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              points={linePoints}
              fill="none"
              stroke="#ff4d7d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {followerLine.map((value, index) => {
              const pointX = (index / (followerLine.length - 1)) * chartWidth;
              const pointY = chartHeight - (value / 100) * 30 - 4;

              return (
                <circle
                  key={`dot-${index}`}
                  cx={pointX}
                  cy={pointY}
                  r="1.2"
                  fill="#ff4d7d"
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-2 flex justify-between font-clash text-[8px] text-zinc-400">
          <span>Sep 28</span>
          <span>Oct 1</span>
          <span>Oct 4</span>
          <span>Oct 8</span>
        </div>
      </div>
    </div>
  );
};

const CampaignPulseCard = () => {
  const bars = [30, 42, 36, 55, 48, 64, 58, 72, 67, 60];

  return (
    <div className="relative w-full h-full min-h-[280px] overflow-hidden rounded-2xl border border-orange-300/30 bg-[#1b110a] p-3.5 md:p-4 shadow-[0_14px_40px_rgba(249,115,22,0.35)]">
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-400/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-orange-300/20 blur-2xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="font-clash text-[10px] text-orange-200/80">
            Campaign Pulse
          </p>
          <h3 className="font-clash text-base font-semibold text-white">
            Performance Core
          </h3>
        </div>
        <span className="rounded-full border border-orange-300/30 bg-orange-400/15 px-2 py-0.5 font-clash text-[9px] text-orange-100">
          LIVE +24%
        </span>
      </div>

      <div className="relative z-10 mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-orange-300/20 bg-white/5 px-2 py-1.5">
          <p className="font-clash text-[9px] text-orange-100/70">ROI</p>
          <p className="font-clash text-lg font-semibold text-white leading-none mt-1">
            3.8x
          </p>
        </div>
        <div className="rounded-lg border border-orange-300/20 bg-white/5 px-2 py-1.5">
          <p className="font-clash text-[9px] text-orange-100/70">
            Conversions
          </p>
          <p className="font-clash text-lg font-semibold text-white leading-none mt-1">
            1,284
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-3 rounded-xl border border-orange-300/20 bg-white/5 p-2.5">
        <div className="flex items-center justify-between">
          <p className="font-clash text-[10px] text-orange-100/80">
            Optimization Score
          </p>
          <p className="font-clash text-[10px] font-medium text-orange-100">
            87/100
          </p>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="relative h-[72px] w-[72px] rounded-full bg-[conic-gradient(#fb923c_0_313deg,rgba(251,146,60,0.18)_313deg_360deg)]">
            <div className="absolute inset-[8px] flex items-center justify-center rounded-full bg-[#1b110a]">
              <span className="font-clash text-xs font-semibold text-orange-100">
                87%
              </span>
            </div>
          </div>

          <div className="w-full space-y-1">
            <div className="flex items-center justify-between font-clash text-[9px] text-orange-100/70">
              <span>Creative Quality</span>
              <span>91%</span>
            </div>
            <div className="h-1.5 rounded-full bg-orange-200/15 overflow-hidden">
              <div className="h-full w-[91%] rounded-full bg-orange-400" />
            </div>

            <div className="flex items-center justify-between font-clash text-[9px] text-orange-100/70">
              <span>Target Fit</span>
              <span>84%</span>
            </div>
            <div className="h-1.5 rounded-full bg-orange-200/15 overflow-hidden">
              <div className="h-full w-[84%] rounded-full bg-orange-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-3 rounded-xl border border-orange-300/20 bg-white/5 p-2.5">
        <div className="flex items-end gap-1.5 h-12">
          {bars.map((value, index) => (
            <div
              key={index}
              className="flex-1 rounded-sm bg-gradient-to-t from-orange-500/90 to-orange-300/80"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <p className="mt-1.5 font-clash text-[9px] text-orange-100/70">
          10-day momentum trend
        </p>
      </div>
    </div>
  );
};

const DashboardAnimation = ({ scrollSectionRef }: DashboardAnimationProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const card1From = isMobile
        ? { x: "20vw", y: "-115vh", rotation: -15, scale: 1, ease: "none" }
        : { x: "90vw", y: "-220vh", rotation: -15, scale: 1, ease: "none" };

      const card2From = isMobile
        ? { x: "-4vw", y: "-108vh", rotation: -10, scale: 1, ease: "none" }
        : { x: "-25vw", y: "-215vh", rotation: -10, scale: 1, ease: "none" };

      const card3From = isMobile
        ? { x: "2vw", y: "-112vh", rotation: 0, scale: 1, ease: "none" }
        : { x: "15vw", y: "-223vh", rotation: 0, scale: 1, ease: "none" };

      const card4From = isMobile
        ? { x: "8vw", y: "-110vh", rotation: 13, scale: 1, ease: "none" }
        : { x: "55vw", y: "-225vh", rotation: 13, scale: 1, ease: "none" };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSectionRef?.current ?? sectionRef.current,
          start: "top 50%",
          end: isMobile ? "bottom 100%" : "bottom bottom",
          scrub: isMobile ? 0.6 : 1,
        },
      });

      tl.from(".animated-card-1", card1From, 0)
        .from(".animated-card-2", card2From, 0)
        .from(".animated-card-3", card3From, 0)
        .from(".animated-card-4", card4From, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollSectionRef]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen py-10 overflow-hidden md:overflow-visible flex justify-center items-center bg-zinc-50"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 flex flex-col gap-5 py-4 rounded-4xl md:gap-6 bg-orange-400">
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
          <div className="w-full md:flex-1 bg-white rounded-2xl p-4 flex items-center justify-center">
            <Image
              src={dashboardImage1}
              alt="Reports Dashboard"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          <div className="w-full md:w-[28%] bg-white rounded-2xl p-2 md:p-3 flex items-center justify-center">
            <AudienceMockCard />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
          <div className="w-full md:w-[50%] bg-white rounded-2xl px-4 flex flex-col justify-center relative">
            <div className="grid grid-cols-2 gap-2 w-full relative">
              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                <Image
                  src={numbersImage1}
                  alt="Views"
                  className="animated-card-1 absolute inset-0 w-full h-full object-contain z-50 origin-center"
                />
              </div>

              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                <Image
                  src={numbersImage2}
                  alt="Active Users"
                  className="animated-card-2 absolute inset-0 w-full h-full object-contain z-50 origin-center"
                />
              </div>

              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center mt-0 md:-mt-8">
                <Image
                  src={numbersImage3}
                  alt="New Users"
                  className="animated-card-3 absolute inset-0 w-full h-full object-contain z-50 origin-center"
                />
              </div>

              <div className="relative aspect-[1.4] bg-[#f8f9fa] rounded-xl flex items-center justify-center mt-0 md:-mt-8">
                <Image
                  src={numbersImage4}
                  alt="Visits"
                  className="animated-card-4 absolute inset-0 w-full h-full object-contain z-50 origin-center"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[30%] bg-white rounded-2xl p-2 md:p-3 flex items-center justify-center">
            <FollowerGrowthMiniCard />
          </div>

          <div className="w-full md:w-[30%] rounded-2xl p-2 md:p-3 flex items-stretch justify-stretch overflow-hidden bg-transparent">
            <CampaignPulseCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAnimation;
