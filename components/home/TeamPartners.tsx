"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Types ──────────────────────────────────────────────────────────────── */
interface TeamMember {
  name: string;
  slug: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  experience: string;
  location: string;
}

/* ── Team data ──────────────────────────────────────────────────────────── */
const teamMembers: TeamMember[] = [
  {
    name: "Fahad Bashir",
    slug: "fahad-bashir",
    role: "Co-Founder & CEO",
    image: "/team-2.jpeg",
    bio: "After leading commercial strategy across WPP and GroupM in Pakistan, Indonesia, and Australia - working with brands like Unilever, Gillette, and GSK - Fahad saw exactly where creator marketing breaks down at the execution level. EchoVerse is built from that experience: a system where influence stops being an activity and starts being a measurable business outcome.",
    expertise: ["Commercial Strategy", "Creator Marketing", "Brand Growth"],
    experience: "15+ years",
    location: "Pakistan / Australia",
  },
  {
    name: "Shoaib Hussain",
    slug: "shoaib-hussain",
    role: "Director & Head of Operations",
    image: "/team.webp",
    bio: "With 10 years of media experience across HUM TV, GEO, and ARY, Shoaib has worked at the center of how audience attention is built, monetized, and scaled. He now applies that operational depth to build creator-led systems that deliver measurable outcomes across clients in Pakistan.",
    expertise: ["Media Operations", "Audience Strategy", "Creator Systems"],
    experience: "10+ years",
    location: "Pakistan",
  },
  {
    name: "Ovais Ilyas",
    slug: "ovais-ilyas",
    role: "Country Lead",
    image: "/team-4.png",
    bio: "Two decades across WPP Media, Spark Foundry, and Carat managing portfolios for Unilever, Coca-Cola, and Jazz gave Ovais a rare view of what great strategy looks like - and where most agencies lose it in execution. He's now bringing that discipline and accountability back to how Pakistani brands grow through creators.",
    expertise: ["Portfolio Management", "Brand Strategy", "Market Leadership"],
    experience: "20+ years",
    location: "Pakistan",
  },
];

/* ── Section ────────────────────────────────────────────────────────────── */
export default function TeamPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Label: fade + slide up
      gsap.from(labelRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      // Headline lines: stagger slide up
      const lines = headlineRef.current?.querySelectorAll("span");
      if (lines) {
        gsap.from(lines, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
          },
        });
      }

      // Cards: stagger up from below
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 90,
          opacity: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-24 md:py-36 overflow-hidden"
    >
      <div className="mx-auto w-full container px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <h2
            ref={headlineRef}
            className="font-beni font-black uppercase leading-[0.9] overflow-hidden"
          >
            <span className="block text-foreground text-[3rem] md:text-[4.8rem] lg:text-[6.5rem]">
              Built by people who&apos;ve
            </span>
            <span className="block text-orange text-[3.5rem] md:text-[5.8rem] lg:text-[8rem]">
              run the system
            </span>
          </h2>
        </div>

        {/* Desktop: 3-column card grid */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-3 gap-6 lg:gap-10"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.slug}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link
                href={`/team/${member.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
              >
                {/* Portrait */}
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 78vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                  {/* Hover pill */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-5 py-2 font-clash text-xs font-semibold uppercase tracking-[0.15em] text-foreground shadow-lg backdrop-blur-sm whitespace-nowrap">
                      View profile
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="pt-6 pb-1">
                  <p className="font-clash text-xs font-semibold uppercase tracking-[0.22em] text-green">
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-beni text-[2rem] md:text-[2.5rem] font-black uppercase leading-[1.0] text-foreground">
                    {member.name}
                  </h3>
                  <p
                    className="mt-2.5 font-clash text-sm font-semibold text-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    View profile &rarr;
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal snap-scroll */}
        <div className="md:hidden -mx-6 flex snap-x snap-mandatory overflow-x-auto gap-4 px-6 pb-4">
          {teamMembers.map((member) => (
            <div key={member.slug} className="min-w-[78vw] snap-start">
              <Link
                href={`/team/${member.slug}`}
                className="block group focus:outline-none"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="78vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="pt-5">
                  <p className="font-clash text-xs font-semibold uppercase tracking-[0.22em] text-green">
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-beni text-[2rem] font-black uppercase leading-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-2 font-clash text-sm font-semibold text-orange">
                    View profile &rarr;
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
