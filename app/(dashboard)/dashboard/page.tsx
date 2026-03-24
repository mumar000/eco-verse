export const dynamic = "force-dynamic";

import { Activity, LayoutGrid, MessageSquare, PenLine, Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

const kpiItems = [
  { label: "Projects", icon: LayoutGrid, href: "/dashboard/projects" },
  { label: "Blogs", icon: PenLine, href: "/dashboard/blogs" },
  { label: "Inquiries", icon: MessageSquare, href: "/dashboard/inquiries" },
];

export default async function DashboardPage() {
  const [projectCount, blogCount, inquiryCount] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.inquiry.count(),
  ]);

  const latestProjects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
  });

  const latestBlogs = await prisma.blog.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      updatedAt: true,
    },
  });

  const kpiValues = [projectCount, blogCount, inquiryCount];

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--foreground)]/50">Dashboard</p>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Control center
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpiItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.label}
              className="group rounded-2xl border border-[var(--color-primary)]/20 bg-white p-5 transition hover:border-[var(--color-green)]/40 hover:bg-white hover:shadow-[0_8px_20px_rgba(21,128,61,0.10)]"
            >
              <div className="mb-4 inline-flex items-center rounded-xl border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/6 px-3 py-2 text-[var(--foreground)]">
                <Icon className="size-4" />
                <span className="ml-2 text-xs uppercase tracking-[0.14em] text-[var(--foreground)]/65">
                  {item.label}
                </span>
              </div>
              <div className="text-3xl font-black text-[var(--foreground)]">{kpiValues[index]}</div>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/55">
                Total records
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-[var(--color-primary)]/20 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/55">
              Latest Projects
            </h2>
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center text-xs text-[var(--color-green)] transition hover:text-[var(--foreground)]"
            >
              <Plus className="size-3.5" />
              <span className="ml-1.5">New</span>
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
            {latestProjects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between border-b border-[var(--color-primary)]/20 py-2"
              >
                <p className="text-[var(--foreground)]">{project.title}</p>
                <p className="text-xs text-[var(--foreground)]/55">
                  {new Date(project.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-[var(--color-primary)]/20 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/55">
              Latest Blog Posts
            </h2>
            <Link
              href="/dashboard/blogs"
              className="inline-flex items-center text-xs text-[var(--color-green)] transition hover:text-[var(--foreground)]"
            >
              <Plus className="size-3.5" />
              <span className="ml-1.5">New</span>
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
            {latestBlogs.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between border-b border-[var(--color-primary)]/20 py-2"
              >
                <div>
                  <p className="text-[var(--foreground)]">{post.title}</p>
                  <p className="text-xs text-[var(--foreground)]/55">/{post.slug}</p>
                </div>
                <p className="text-xs text-[var(--foreground)]/55">
                  {new Date(post.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="rounded-2xl border border-[var(--color-green)]/25 bg-[var(--color-green)]/5 p-5">
        <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/55">
          <Activity className="size-4" />
          System snapshot
        </p>
        <p className="mt-3 text-sm text-[var(--foreground)]/65">
          {inquiryCount} unread inquiry cards are currently waiting for follow-up.
          Keep this section active for a quick workflow.
        </p>
      </div>
    </section>
  );
}
