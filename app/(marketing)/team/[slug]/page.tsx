import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamMemberClient from "./TeamMemberClient";

/* ── Shared team data ────────────────────────────────────────────────────
   Kept co-located with the page so generateStaticParams, generateMetadata,
   and the client component all share the same source of truth.
──────────────────────────────────────────────────────────────────────── */
export interface TeamMember {
  name: string;
  slug: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  experience: string;
  location: string;
}

export const teamMembers: TeamMember[] = [
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

/* ── Static generation ──────────────────────────────────────────────────── */
export function generateStaticParams(): { slug: string }[] {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

/* ── Metadata ───────────────────────────────────────────────────────────── */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return { title: "Team Member Not Found | EcoVerse" };
  }

  return {
    title: `${member.name} — ${member.role} | EcoVerse`,
    description: member.bio.slice(0, 155) + "…",
  };
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return <TeamMemberClient member={member} />;
}
