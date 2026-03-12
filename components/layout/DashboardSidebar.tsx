"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  NotebookText,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

type DashboardSidebarProps = {
  collapsed?: boolean;
};

type DashboardNavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  count?: number;
};

const dashboardLinks: DashboardNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Workspace pulse & quick actions",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    description: "Manage portfolio entries",
  },
  {
    id: "blogs",
    label: "Blogs",
    href: "/dashboard/blogs",
    icon: NotebookText,
    description: "Publish and schedule posts",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    href: "/dashboard/inquiries",
    icon: MessageSquare,
    description: "Review inbound leads",
  },
  {
    id: "assets",
    label: "Assets",
    href: "/dashboard/assets",
    icon: FileText,
    description: "Upload media & references",
  },
];

const DashboardSidebar = ({ collapsed = false }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const activeRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`sticky top-0 z-30 h-screen border-r border-[var(--color-primary)]/20 bg-white p-4 backdrop-blur-sm transition-all duration-200 ${
        collapsed ? "w-[5.25rem]" : "w-[18rem]"
      }`}
    >
      <header className={`mb-6 flex items-center ${collapsed ? "justify-center" : ""}`}>
        <Link
          href="/dashboard"
          className={`inline-flex items-center text-sm font-black uppercase tracking-[0.16em] text-[var(--foreground)] ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <span className="grid size-8 place-items-center rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-xs text-[var(--foreground)]">
            CE
          </span>
          {!collapsed ? <span>Control Center</span> : null}
        </Link>
      </header>

      <nav className="space-y-2">
        {dashboardLinks.map((link) => {
          const isActive = activeRoute(link.href);
          const Icon = link.icon;
          return (
            <motion.div
              key={link.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="w-full"
            >
              <Link
                href={link.href}
                className={`group relative flex items-center gap-3 rounded-xl border px-3 py-3 transition ${
                  isActive
                    ? "border-[var(--color-green)]/35 bg-[var(--color-green)]/10 text-[var(--foreground)]"
                    : "border-[var(--color-primary)]/15 text-[var(--foreground)]/80 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/6 hover:text-[var(--foreground)]"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <span
                  className={`grid size-9 place-items-center rounded-lg border ${
                    isActive
                      ? "border-[var(--color-green)]/35 bg-[var(--color-green)]/12 text-[var(--foreground)]"
                      : "border-[var(--color-primary)]/20 bg-white"
                  }`}
                >
                  <Icon className="size-4" />
                </span>
                {!collapsed ? (
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold">
                      {link.label}
                    </span>
                    <span className="truncate text-xs text-[var(--foreground)]/55">
                      {link.description}
                    </span>
                  </span>
                ) : null}
                {link.count !== undefined ? (
                  <span className={`text-xs font-semibold text-[var(--foreground)]/60 ${collapsed ? "" : "ml-auto"}`}>
                    {link.count}
                  </span>
                ) : null}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
