"use client";

import { ChevronLeft, ChevronRight, FolderClosed, House, LayoutList, MessageSquare, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode, ComponentType } from "react";

type CMSNavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  isActive?: boolean;
};

type CMSLayoutProps = {
  children: ReactNode;
  activePath?: string;
  navItems?: CMSNavItem[];
  brand?: string;
};

const defaultNavItems: CMSNavItem[] = [
  { id: "overview", label: "Overview", href: "/content-update", icon: House },
  { id: "content", label: "Content", href: "/content-update", icon: LayoutList },
  { id: "projects", label: "Projects", href: "/content-update/projects", icon: FolderClosed },
  { id: "blogs", label: "Blogs", href: "/content-update/blogs", icon: PenLine },
  { id: "inquiries", label: "Inquiries", href: "/content-update/inquiries", icon: MessageSquare },
];

const panelVariants = {
  open: { width: "16.5rem" },
  closed: { width: "4.75rem" },
};

export function CMSLayout({
  children,
  activePath,
  navItems = defaultNavItems,
  brand = "Content Studio",
}: CMSLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex min-h-screen gap-0">
        <motion.aside
          animate={collapsed ? "closed" : "open"}
          className="sticky top-0 h-screen border-r border-white/10 bg-zinc-950/80 backdrop-blur"
          initial="open"
          variants={panelVariants}
        >
          <motion.div
            animate={{ paddingInline: collapsed ? "0.75rem" : "1rem" }}
            transition={{ duration: 0.2 }}
            className="flex h-full flex-col"
          >
            <header className="flex h-16 items-center">
              <Link href="/" className="group inline-flex w-full items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold tracking-[0.2em] text-white">
                  CMS
                </span>
                {!collapsed && (
                  <motion.span
                    animate={{ opacity: 1, x: 0 }}
                    className="truncate text-lg font-black uppercase tracking-[0.18em] text-zinc-100"
                    exit={{ opacity: 0, x: -4 }}
                    initial={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {brand}
                  </motion.span>
                )}
              </Link>
            </header>

            <nav className="mt-4 flex flex-1 flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePath
                  ? item.href === activePath
                  : item.isActive ?? false;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-xl border px-3 py-3 transition ${
                        isActive
                          ? "border-white/30 bg-white/[0.06] text-white"
                          : "border-white/10 text-zinc-300 hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span
                        className={`grid size-9 place-items-center rounded-lg ${
                          isActive
                            ? "bg-white/12"
                            : "bg-zinc-900 group-hover:bg-white/6"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="pb-4">
              <button
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-xs uppercase tracking-[0.18em] text-zinc-300 transition hover:border-white/25 hover:text-white"
                onClick={() => setCollapsed((prev) => !prev)}
                type="button"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4" />
                    Collapse
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.aside>

        <main className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.08)_1px,_transparent_0)] bg-[length:24px_24px] p-6 text-zinc-100 md:p-8">
          <div className="mx-auto h-full max-w-7xl rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 ring-1 ring-white/5">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
