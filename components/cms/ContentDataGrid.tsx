"use client";

import { motion } from "framer-motion";
import { ChevronRight, PencilLine } from "lucide-react";
import { useMemo } from "react";

type CmsRecord = {
  id: number | string;
  title: string;
  slug: string;
  status?: "published" | "draft" | "archived" | string;
  updatedAt?: string | Date;
  excerpt?: string | null;
  tags?: string[];
  category?: string;
};

type ContentDataGridProps = {
  records: CmsRecord[];
  selectedId?: number | string | null;
  loading?: boolean;
  emptyMessage?: string;
  onEdit: (record: CmsRecord) => void;
};

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const listCard = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4 },
  },
};

const skeletonCount = Array.from({ length: 6 }, (_, index) => index);

const formatUpdatedAt = (value?: string | Date) => {
  if (!value) return "Not updated";
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const statusPillClass = (status?: CmsRecord["status"]) => {
  switch (status?.toLowerCase()) {
    case "published":
      return "border-emerald-300/50 text-emerald-200 bg-emerald-300/10";
    case "draft":
    default:
      return "border-zinc-400/30 text-zinc-300 bg-zinc-400/10";
  }
};

export function ContentDataGrid({
  records,
  selectedId,
  loading = false,
  emptyMessage = "No content available yet.",
  onEdit,
}: ContentDataGridProps) {
  const orderedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      const aTs = new Date(a.updatedAt ?? 0).getTime();
      const bTs = new Date(b.updatedAt ?? 0).getTime();
      return bTs - aTs;
    });
  }, [records]);

  if (loading) {
    return (
      <div className="grid gap-4">
        {skeletonCount.map((key) => (
          <motion.div
            key={key}
            className="h-28 rounded-2xl border border-white/10 bg-white/5"
            animate={{ opacity: [0.4, 0.65, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, repeatType: "mirror" }}
          />
        ))}
      </div>
    );
  }

  if (orderedRecords.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-zinc-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={listContainer}
      className="grid gap-4 lg:grid-cols-2"
    >
      {orderedRecords.map((record) => {
        const isActive = selectedId === record.id;
        return (
          <motion.button
            key={record.id}
            variants={listCard}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            type="button"
            onClick={() => onEdit(record)}
            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-4 text-left transition ${
              isActive
                ? "border-emerald-300/45 bg-emerald-300/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-lg font-black uppercase tracking-[0.1em] text-zinc-100">
                  {record.title}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {record.slug}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-zinc-200 opacity-0 transition group-hover:opacity-100"
              >
                Edit
                <PencilLine className="h-3.5 w-3.5" />
              </motion.div>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-zinc-300">
              {record.excerpt || "No description provided."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-xs ${statusPillClass(record.status)}`}>
                {record.status ?? "draft"}
              </span>
              <span className="rounded-full border border-zinc-500/20 px-2.5 py-1 text-xs text-zinc-300">
                {record.category ?? "General"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(record.tags ?? []).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
              {(record.tags ?? []).length > 4 ? (
                <span className="rounded-full border border-white/15 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-zinc-300">
                  +{record.tags!.length - 4}
                </span>
              ) : null}
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 text-xs text-zinc-400">
              <span>Updated {formatUpdatedAt(record.updatedAt)}</span>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-500 transition group-hover:translate-x-1" />
            </div>
          </motion.button>
        );
      })}
    </motion.section>
  );
}
