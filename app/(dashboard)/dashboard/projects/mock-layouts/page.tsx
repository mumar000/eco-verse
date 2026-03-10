"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Layers,
  Star,
  Tag,
  Zap,
} from "lucide-react";

// ──────────────────────────────────────────────
// Shared mock data
// ──────────────────────────────────────────────
const MOCK = {
  title: "EcoSphere Dashboard",
  slug: "ecosphere-dashboard",
  shortDescription:
    "A next-generation sustainability analytics platform that helps enterprises track, visualize, and reduce their carbon footprint in real-time.",
  description: `EcoSphere transforms how Fortune 500 companies interact with their environmental data. Built on a microservices architecture with real-time streaming pipelines, it ingests sensor data from across global supply chains and renders it in an intuitive, role-based dashboard.

The platform serves both C-suite executives who need macro KPIs and field engineers who require granular machine-level telemetry. Accessibility and performance were first-class priorities throughout every sprint.`,
  tags: ["React", "Next.js", "TypeScript", "Prisma", "Recharts", "PostgreSQL"],
  createdAt: "2025-09-15T08:00:00Z",
  updatedAt: "2026-03-01T12:30:00Z",
  coverImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format",
  galleryImages: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format",
  ],
  highlights: [
    {
      icon: Zap,
      label: "Real-time Streaming",
      desc: "Sub-100ms data latency via WebSockets",
    },
    {
      icon: Layers,
      label: "Multi-tenant",
      desc: "Isolated workspaces for each enterprise",
    },
    {
      icon: CheckCircle2,
      label: "GDPR Compliant",
      desc: "EU data residency & right-to-forget",
    },
    {
      icon: Star,
      label: "99.9% Uptime SLA",
      desc: "Auto-scaling on AWS ECS Fargate",
    },
  ],
  timeline: [
    { phase: "Discovery", date: "Sep 2025", status: "done" },
    { phase: "Design System", date: "Oct 2025", status: "done" },
    { phase: "Core Build", date: "Nov–Dec 2025", status: "done" },
    { phase: "Beta Testing", date: "Jan 2026", status: "done" },
    { phase: "Public Launch", date: "Mar 2026", status: "active" },
    { phase: "V2 Planning", date: "Q2 2026", status: "planned" },
  ],
};

// ──────────────────────────────────────────────
// Concept A – "Editorial Dark"
// ──────────────────────────────────────────────
function ConceptA() {
  return (
    <div className="min-h-screen bg-[#0d0f11] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeft className="size-4" /> Projects
        </Link>
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
          EcoVerse CMS
        </span>
      </nav>

      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden">
        <Image
          src={MOCK.coverImage}
          alt={MOCK.title}
          fill
          className="object-cover brightness-40"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {MOCK.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tight leading-none mb-4">
            {MOCK.title}
          </h1>
          <p className="text-base text-white/65 leading-relaxed max-w-xl">
            {MOCK.shortDescription}
          </p>
          <div className="mt-5 flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {new Date(MOCK.createdAt).toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span>{MOCK.galleryImages.length} gallery images</span>
          </div>
        </div>
      </div>

      {/* Body — two-column */}
      <div className="mx-auto max-w-6xl px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        {/* Left: description + highlights */}
        <div className="space-y-10">
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 mb-4">
              Overview
            </h2>
            <div className="space-y-4 text-[15px] text-white/70 leading-relaxed">
              {MOCK.description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 mb-5">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK.highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-500/30 transition"
                >
                  <div className="mb-3 inline-flex size-9 items-center justify-center rounded-xl bg-emerald-500/15">
                    <Icon className="size-4 text-emerald-400" />
                  </div>
                  <p className="font-bold text-sm text-white">{label}</p>
                  <p className="text-xs text-white/50 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Filmstrip gallery */}
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 mb-5">
              Gallery
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {MOCK.galleryImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-video h-36 flex-shrink-0 overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={src}
                    alt={`Image ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: timeline sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">
              Project Timeline
            </h3>
            <ol className="space-y-4 relative before:absolute before:left-[11px] before:top-1 before:h-full before:w-px before:bg-white/10">
              {MOCK.timeline.map(({ phase, date, status }) => (
                <li key={phase} className="flex items-start gap-3 pl-1">
                  <div
                    className={`mt-0.5 size-[10px] flex-shrink-0 rounded-full border-2 ${
                      status === "done"
                        ? "border-emerald-500 bg-emerald-500"
                        : status === "active"
                          ? "border-emerald-400 bg-transparent animate-pulse"
                          : "border-white/20 bg-transparent"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{phase}</p>
                    <p className="text-xs text-white/40">{date}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {MOCK.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Concept B – "Magazine Bento"
// ──────────────────────────────────────────────
function ConceptB() {
  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      {/* Full-bleed hero */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src={MOCK.coverImage}
          alt={MOCK.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#f5f0eb]" />

        {/* Floating nav */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 backdrop-blur hover:bg-white transition"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="flex gap-2">
            {MOCK.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-2">
            Case Study
          </p>
          <h1 className="text-6xl font-black leading-none text-white drop-shadow-lg">
            {MOCK.title}
          </h1>
        </div>
      </div>

      {/* Bento grid body */}
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        {/* Row 1 - bento */}
        <div className="grid grid-cols-12 gap-4">
          {/* Large desc */}
          <div className="col-span-12 lg:col-span-7 rounded-3xl bg-white p-8 shadow-sm">
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider mb-4">
              Overview
            </span>
            <p className="text-lg leading-relaxed text-zinc-700">
              {MOCK.shortDescription}
            </p>
            <div className="mt-6 text-sm text-zinc-500 leading-relaxed">
              {MOCK.description.split("\n\n")[0]}
            </div>
          </div>

          {/* Stats */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { n: "6", l: "Sprints" },
              { n: "99.9%", l: "Uptime SLA" },
              { n: "<100ms", l: "Data Latency" },
              { n: "5 yrs", l: "On Roadmap" },
            ].map(({ n, l }) => (
              <div
                key={l}
                className="rounded-2xl bg-white p-5 shadow-sm flex flex-col justify-between"
              >
                <p className="text-3xl font-black text-zinc-900">{n}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK.highlights.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-5 shadow-sm border-t-4 border-orange-400 hover:-translate-y-1 transition"
            >
              <Icon className="size-6 text-orange-500 mb-3" />
              <p className="font-bold text-sm text-zinc-900 mb-1">{label}</p>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Masonry gallery */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-700">
              Image Gallery
            </h2>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500">
              {MOCK.galleryImages.length} photos
            </span>
          </div>
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {MOCK.galleryImages.map((src, i) => (
              <div
                key={src}
                className={`relative w-full overflow-hidden rounded-2xl shadow-sm ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-video"}`}
              >
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline row */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-700 mb-6">
            Project Timeline
          </h2>
          <div className="flex flex-wrap gap-0">
            {MOCK.timeline.map(({ phase, date, status }, i) => (
              <div key={phase} className="flex items-center">
                <div className="text-center px-4">
                  <div
                    className={`mx-auto mb-2 size-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      status === "done"
                        ? "bg-orange-100 text-orange-600"
                        : status === "active"
                          ? "bg-orange-500 text-white"
                          : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p className="text-xs font-bold text-zinc-700">{phase}</p>
                  <p className="text-[11px] text-zinc-400">{date}</p>
                </div>
                {i < MOCK.timeline.length - 1 && (
                  <ChevronRight className="size-4 text-zinc-300 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Concept C – "Minimalist Studio"
// ──────────────────────────────────────────────
function ConceptC() {
  return (
    <div className="min-h-screen bg-white">
      {/* Thin top bar */}
      <div className="border-b border-zinc-100 px-8 py-4 flex items-center justify-between">
        <Link
          href="/dashboard/projects"
          className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-700 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="size-3.5" /> All Projects
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300">
            /{MOCK.slug}
          </span>
          <ExternalLink className="size-3.5 text-zinc-300" />
        </div>
      </div>

      {/* Giant title block */}
      <div className="px-8 pt-14 pb-8 border-b border-zinc-100 max-w-5xl">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-300 mb-5">
              Project — 2025/2026
            </p>
            <h1 className="text-7xl font-black leading-[0.9] tracking-tight text-zinc-900 mb-6">
              {MOCK.title}
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl">
              {MOCK.shortDescription}
            </p>
          </div>
          <div className="flex-shrink-0 hidden lg:block">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
              <Image
                src={MOCK.coverImage}
                alt="Thumb"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {MOCK.tags.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 text-xs font-mono text-zinc-400 border border-zinc-100 rounded px-2 py-1"
            >
              <Tag className="size-2.5" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-8 py-12 space-y-16">
        {/* Description */}
        <section className="grid lg:grid-cols-[200px_1fr] gap-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-300 pt-1">
            01 — Overview
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            {MOCK.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="grid lg:grid-cols-[200px_1fr] gap-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-300 pt-1">
            02 — Highlights
          </p>
          <div className="grid sm:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
            {MOCK.highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white p-6">
                <Icon className="size-5 text-zinc-400 mb-3" />
                <p className="font-bold text-zinc-900 mb-1">{label}</p>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mosaic Gallery */}
        <section className="grid lg:grid-cols-[200px_1fr] gap-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-300 pt-1">
            03 — Gallery
          </p>
          <div>
            <div className="grid grid-cols-3 gap-2">
              {MOCK.galleryImages.slice(0, 3).map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={`img ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                    unoptimized
                  />
                </div>
              ))}
              {MOCK.galleryImages.slice(3).map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}`}
                >
                  <Image
                    src={src}
                    alt={`img ${i + 3}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="grid lg:grid-cols-[200px_1fr] gap-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-300 pt-1">
            04 — Timeline
          </p>
          <div className="space-y-0">
            {MOCK.timeline.map(({ phase, date, status }, i) => (
              <div
                key={phase}
                className={`flex items-center justify-between py-4 ${i < MOCK.timeline.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`size-2 rounded-full flex-shrink-0 ${
                      status === "done"
                        ? "bg-emerald-500"
                        : status === "active"
                          ? "bg-blue-500 animate-pulse"
                          : "bg-zinc-200"
                    }`}
                  />
                  <p className="text-sm font-semibold text-zinc-800">{phase}</p>
                </div>
                <p className="text-xs font-mono text-zinc-400">{date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back CTA */}
        <div className="pt-8 border-t border-zinc-100 flex items-center justify-between">
          <Link
            href="/dashboard/projects"
            className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="size-3.5" /> All Projects
          </Link>
          <p className="text-[11px] font-mono text-zinc-300">EcoVerse CMS</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Tabbed switcher — main export
// ──────────────────────────────────────────────
const CONCEPTS = [
  { id: "a", label: "A — Editorial Dark", component: ConceptA },
  { id: "b", label: "B — Magazine Bento", component: ConceptB },
  { id: "c", label: "C — Minimalist Studio", component: ConceptC },
];

export default function MockLayoutsPage() {
  const [active, setActive] = useState("a");
  const ActiveConcept = CONCEPTS.find((c) => c.id === active)!.component;

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="border-b border-[var(--color-primary)]/20 pb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Design Exploration
        </p>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Mock Layout Concepts
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Three distinct project detail page designs using mock data. Choose
          your preferred layout.
        </p>

        {/* Tab selector */}
        <div className="mt-5 flex gap-2 flex-wrap">
          {CONCEPTS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active === id
                  ? "border-[var(--color-green)] bg-[var(--color-green)]/10 text-[var(--color-green)]"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Full-width preview */}
      <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveConcept />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="grid sm:grid-cols-3 gap-4 text-sm">
        {[
          {
            id: "A",
            name: "Editorial Dark",
            desc: "Dark gradient hero · two-column layout · horizontal filmstrip gallery · vertical timeline sidebar",
          },
          {
            id: "B",
            name: "Magazine Bento",
            desc: "Full-bleed hero · bento stat cards · masonry gallery · numbered phase timeline",
          },
          {
            id: "C",
            name: "Minimalist Studio",
            desc: "Giant typography · mono labels · mosaic gallery grid · clean section rows",
          },
        ].map(({ id, name, desc }) => (
          <div
            key={id}
            className="rounded-xl border border-zinc-200 bg-white p-4"
          >
            <span className="inline-block mb-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Concept {id}
            </span>
            <p className="font-bold text-zinc-800 mb-1">{name}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
