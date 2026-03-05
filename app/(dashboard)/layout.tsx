import type { ReactNode } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-foreground/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-lg font-semibold text-foreground">Ecovorse 360</p>
          <p className="text-sm text-foreground/60">Admin Workspace</p>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row">
        <DashboardSidebar />
        <main className="flex-1 px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
