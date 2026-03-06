import type { ReactNode } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen bg-[radial-gradient(circle_at_1px_1px,_rgba(21,128,61,0.14)_1px,_transparent_0)] bg-[length:24px_24px]">
        <DashboardSidebar />
        <div className="min-h-screen flex-1">
          <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/70">
                Admin Workspace
              </p>
              <p className="text-sm font-bold text-[var(--foreground)]">Ecoverse Dashboard</p>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-[var(--color-primary)]/20 bg-white/95 p-6 shadow-[0_12px_28px_rgba(31,41,55,0.08)]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
