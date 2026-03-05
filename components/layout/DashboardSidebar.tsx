import Link from "next/link";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/blogs", label: "Blogs" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/inquiries", label: "Inquiries" },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-full border-r border-foreground/10 bg-white/90 px-6 py-8 md:w-64">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
        Admin
      </p>
      <nav className="mt-6 space-y-3 text-sm">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-foreground/70 transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
