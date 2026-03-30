"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamMember } from "./page";

/* ── Shared easing curve (typed as const so TS accepts it as Easing) ────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Reusable static variants (no dynamic delay — avoids Variants type issues) */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.55 },
  },
} as const;

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
} as const;

/* ── Props ──────────────────────────────────────────────────────────────── */
interface TeamMemberClientProps {
  member: TeamMember;
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function TeamMemberClient({ member }: TeamMemberClientProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 md:pt-28 md:pb-32">

      {/* ── Back navigation ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 font-clash text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground/40 transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 rounded-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M11 7H3M6 3.5L2.5 7 6 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Team
          </Link>
        </motion.div>
      </div>

      {/* ── Hero section ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 lg:px-8 mt-10 md:mt-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-20 items-start">

          {/* Left — name + role */}
          <div className="flex flex-col justify-start">
            {/* Role eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="font-clash text-[0.65rem] font-bold uppercase tracking-[0.28em] text-orange mb-4"
            >
              {member.role}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
              className="font-beni font-black uppercase leading-[0.88] text-foreground"
            >
              {member.name.split(" ").map((word, i) => (
                <span key={i} className="block text-[3.8rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem]">
                  {i === 0 ? (
                    <span className="text-foreground">{word}</span>
                  ) : (
                    <span className="text-orange">{word}</span>
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="mt-8 md:mt-10 h-px w-16 bg-foreground/15"
            />

            {/* Quick stats — desktop inline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-8 hidden md:flex flex-col gap-5"
            >
              <motion.div variants={staggerChild} className="flex items-start gap-3">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                <div>
                  <p className="font-clash text-[0.6rem] font-bold uppercase tracking-[0.2em] text-foreground/30">
                    Experience
                  </p>
                  <p className="font-clash text-sm font-semibold text-foreground">
                    {member.experience}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerChild} className="flex items-start gap-3">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                <div>
                  <p className="font-clash text-[0.6rem] font-bold uppercase tracking-[0.2em] text-foreground/30">
                    Location
                  </p>
                  <p className="font-clash text-sm font-semibold text-foreground">
                    {member.location}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — portrait image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative w-full overflow-hidden rounded-2xl aspect-[3/4]">
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
              {/* Subtle warm overlay to match cream brand palette */}
              <div className="absolute inset-0 bg-linear-to-br from-orange/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating experience badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
              className="absolute -bottom-4 -left-4 md:-left-6 rounded-xl bg-foreground px-5 py-4 shadow-xl"
            >
              <p className="font-clash text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/40">
                Experience
              </p>
              <p className="font-beni text-xl font-black uppercase text-white leading-none mt-0.5">
                {member.experience}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Bio + details ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 lg:px-8 mt-20 md:mt-28">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] md:gap-16 lg:gap-24">

          {/* Bio */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-clash text-[0.65rem] font-bold uppercase tracking-[0.28em] text-green mb-5"
            >
              About
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
              className="font-clash text-[1.1rem] md:text-[1.2rem] leading-[1.85] text-foreground/65 max-w-2xl"
            >
              {member.bio}
            </motion.p>
          </div>

          {/* Details sidebar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-8"
          >
            {/* Expertise */}
            <motion.div variants={staggerChild}>
              <p className="font-clash text-[0.6rem] font-bold uppercase tracking-[0.22em] text-foreground/30 mb-3">
                Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full border border-foreground/10 bg-foreground/[0.04] px-3.5 py-1.5 font-clash text-[0.68rem] font-semibold text-foreground/70 hover:border-green/40 hover:text-green transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div variants={staggerChild}>
              <p className="font-clash text-[0.6rem] font-bold uppercase tracking-[0.22em] text-foreground/30 mb-2">
                Location
              </p>
              <p className="font-clash text-sm font-semibold text-foreground/80">
                {member.location}
              </p>
            </motion.div>

            {/* Experience (mobile — hidden on desktop where it's shown in hero) */}
            <motion.div variants={staggerChild} className="md:hidden">
              <p className="font-clash text-[0.6rem] font-bold uppercase tracking-[0.22em] text-foreground/30 mb-2">
                Experience
              </p>
              <p className="font-clash text-sm font-semibold text-foreground/80">
                {member.experience}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="container mx-auto px-6 lg:px-8 mt-20 md:mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl border border-foreground/8 bg-foreground/[0.03] px-8 py-8 md:px-10 md:py-9">
          <div>
            <p className="font-clash text-[0.65rem] font-bold uppercase tracking-[0.25em] text-orange mb-1.5">
              Ready to build something real?
            </p>
            <h2 className="font-beni font-black uppercase text-foreground text-[1.8rem] md:text-[2.2rem] leading-[0.95]">
              Work with us
            </h2>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl bg-orange px-7 py-3.5 font-clash text-sm font-bold text-white shadow-lg shadow-orange/20 transition-all duration-300 hover:bg-orange/90 hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
          >
            Get in touch
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </motion.section>

    </div>
  );
}
