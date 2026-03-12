"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

type DashboardShellProps = {
  children: ReactNode;
};

type SidebarControlEventDetail = {
  collapsed: boolean;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const isProjectDetailRoute =
    pathname.startsWith("/dashboard/projects/") && pathname !== "/dashboard/projects";

  useEffect(() => {
    const onSidebarControl = (event: Event) => {
      const customEvent = event as CustomEvent<SidebarControlEventDetail>;
      const collapsed = customEvent.detail?.collapsed;

      if (typeof collapsed === "boolean") {
        setIsSidebarCollapsed(collapsed);
      }
    };

    window.addEventListener("dashboard:sidebar-control", onSidebarControl);

    return () => {
      window.removeEventListener("dashboard:sidebar-control", onSidebarControl);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--color-green": "#ea580c" } as CSSProperties}
    >
      <div className="flex min-h-screen bg-[radial-gradient(circle_at_1px_1px,_rgba(234,88,12,0.14)_1px,_transparent_0)] bg-[length:24px_24px]">
        <DashboardSidebar collapsed={isSidebarCollapsed} />
        <div className="min-h-screen flex-1">
          <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed((previous) => !previous)}
                  className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700"
                >
                  {isSidebarCollapsed ? (
                    <>
                      <PanelLeftOpen className="size-3.5" /> Expand
                    </>
                  ) : (
                    <>
                      <PanelLeftClose className="size-3.5" /> Collapse
                    </>
                  )}
                </button>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/70">
                  Admin Workspace
                </p>
              </div>
              <p className="text-sm font-bold text-[var(--foreground)]">Ecoverse Dashboard</p>
            </div>
          </header>
          <main
            className={
              isProjectDetailRoute
                ? "px-0 pb-0 pt-0"
                : "mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8"
            }
          >
            <div
              className={
                isProjectDetailRoute
                  ? "border-0 bg-transparent p-0 shadow-none"
                  : "rounded-[28px] border border-[var(--color-primary)]/20 bg-white/95 p-6 shadow-[0_12px_28px_rgba(31,41,55,0.08)]"
              }
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
