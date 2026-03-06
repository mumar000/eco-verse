"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Check, Edit2, EyeOff, NotebookPen, RotateCcw, Save, SquarePen, Trash2 } from "lucide-react";
import {
  useBlogs,
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from "@/lib/hooks/useBlogs";
import type { BlogCreateInput, BlogUpdateInput } from "@/lib/schemas/blogSchema";

type BlogFormState = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  content: string;
  tags: string;
  categoryName: string;
};

const defaultBlogForm: BlogFormState = {
  title: "",
  slug: "",
  description: "",
  coverImage: "",
  content: "",
  tags: "",
  categoryName: "General",
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function BlogsManager() {
  const { data, isLoading, error, refetch } = useBlogs();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [formState, setFormState] = useState<BlogFormState>(defaultBlogForm);
  const [formError, setFormError] = useState("");

  const blogs = useMemo(() => data ?? [], [data]);
  const editingBlog = useMemo(
    () =>
      blogs.find((blog: { id: number }) => blog.id === editingId) ??
      null,
    [blogs, editingId],
  );

  const isBusy =
    createBlog.isPending || updateBlog.isPending || deleteBlog.isPending;

  const resetPanel = () => {
    setEditingId(null);
    setFormState(defaultBlogForm);
    setPanelOpen(false);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormState(defaultBlogForm);
    setPanelOpen(true);
  };

  const openEdit = (blog: { id: number; title: string; slug: string; description?: string | null; content: string; coverImage?: string | null; tags: string[]; category?: { name?: string } }) => {
    setEditingId(blog.id);
    setFormState({
      title: blog.title,
      slug: blog.slug,
      description: blog.description ?? "",
      content: blog.content ?? "",
      coverImage: blog.coverImage ?? "",
      tags: (blog.tags ?? []).join(", "),
      categoryName: blog.category?.name ?? "General",
    });
    setPanelOpen(true);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const payload = {
      title: formState.title.trim(),
      slug: formState.slug.trim(),
      description: formState.description.trim() || undefined,
      coverImage: formState.coverImage.trim() || undefined,
      content: formState.content.trim(),
      tags: formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      categoryName: formState.categoryName.trim() || "General",
      published: false,
    };

    if (!payload.title || !payload.slug || !payload.content) {
      setFormError("Title, slug, and content are required.");
      return;
    }

    try {
      if (editingId) {
        await updateBlog.mutateAsync({
          id: editingId,
          ...payload,
        } as BlogUpdateInput);
      } else {
        await createBlog.mutateAsync(payload as BlogCreateInput);
      }
      resetPanel();
      await refetch();
    } catch {
      setFormError("Unable to save this blog right now.");
    }
  };

  const submitDelete = async (id: number) => {
    try {
      await deleteBlog.mutateAsync(id);
      if (editingId === id) {
        resetPanel();
      }
      await refetch();
    } catch {
      setFormError("Unable to delete this blog right now.");
    }
  };

  const submitReset = () => {
    if (!editingBlog) return;
    setFormState({
      title: editingBlog.title,
      slug: editingBlog.slug,
      description: editingBlog.description ?? "",
      content: editingBlog.content,
      coverImage: editingBlog.coverImage ?? "",
      tags: ((editingBlog.tags as string[]) ?? []).join(", "),
      categoryName: editingBlog.category?.name ?? "General",
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-[var(--color-primary)]/20 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Blogs</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Blog Studio
          </h2>
          <p className="text-sm text-zinc-600">
            Add blog content quickly and keep category mapping automatic.
          </p>
        </div>
        <button
          onClick={openCreate}
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-green)]/40 bg-[var(--color-green)]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/18"
        >
          <NotebookPen className="size-4" />
          Add Blog
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-zinc-200 bg-white"
            />
          ))}
        </div>
      ) : (
        <>
          {error ? (
            <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              Unable to load blog entries.
            </p>
          ) : null}

          {blogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center text-zinc-500">
              No blog posts yet. Add your first post now.
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
              className="grid gap-3 md:grid-cols-2"
            >
              {blogs.map((blog: { id: number; title: string; slug: string; content: string; updatedAt: string; published?: boolean; category?: { name?: string } }) => (
                <motion.article
                  key={blog.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className={`rounded-2xl border bg-white p-4 transition ${
                    editingId === blog.id && panelOpen
                      ? "border-[var(--color-green)]/35 bg-[var(--color-green)]/10"
                      : "border-zinc-200 hover:border-[var(--color-green)]/55"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-black text-[var(--foreground)]">
                        {blog.title}
                      </p>
                      <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">/{blog.slug}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-primary)]/25 px-2 py-1 text-xs text-[var(--foreground)]/60">
                      {new Date(blog.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-700">
                    {(blog.content || "").slice(0, 140)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 uppercase tracking-[0.13em] text-zinc-600">
                      {blog.category?.name ?? "General"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${
                        blog.published
                          ? "border-emerald-300/70 bg-emerald-50 text-emerald-700"
                          : "border-zinc-300 bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      <EyeOff className="size-3" />
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openEdit(blog as never)}
                      type="button"
                      className="inline-flex flex-1 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[var(--color-primary)]"
                    >
                      <Edit2 className="mr-2 size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => submitDelete(blog.id)}
                      type="button"
                      disabled={isBusy}
                      className="inline-flex flex-1 items-center justify-center rounded-lg border border-red-200 bg-red-50 py-2 text-sm font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-100"
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </>
      )}

      {panelOpen ? (
        <motion.div
          initial={{ x: 36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="rounded-2xl border border-zinc-200 bg-white p-5"
        >
          <form onSubmit={submitForm} className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-600">
                {editingId ? "Update Blog" : "Create Blog"}
              </p>
              <div className="flex gap-2">
                {editingId ? (
                  <button
                    type="button"
                    onClick={submitReset}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700"
                  >
                    <RotateCcw className="size-3.5" /> Reset
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={resetPanel}
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700"
                >
                  Close
                </button>
              </div>
            </div>

            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Title</span>
              <input
                value={formState.title}
                onChange={(event) => {
                  const next = event.target.value;
                  setFormState((previous) => ({
                    ...previous,
                    title: next,
                    slug: editingId ? previous.slug : toSlug(next),
                  }));
                }}
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                required
                placeholder="Blog title"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Slug</span>
              <input
                value={formState.slug}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, slug: event.target.value }))
                }
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                required
                placeholder="blog-title"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Category</span>
              <input
                value={formState.categoryName}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    categoryName: event.target.value,
                  }))
                }
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="General"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Description</span>
              <input
                value={formState.description}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="Meta description"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Cover Image</span>
              <input
                value={formState.coverImage}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    coverImage: event.target.value,
                  }))
                }
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="https://..."
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Content</span>
              <textarea
                value={formState.content}
                onChange={(event) =>
                  setFormState((previous) => ({
                    ...previous,
                    content: event.target.value,
                  }))
                }
                className="min-h-28 border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="Write draft text here"
                required
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Tags (comma separated)</span>
              <input
                value={formState.tags}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, tags: event.target.value }))
                }
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="design, updates, article"
              />
            </label>

            <button
              type="submit"
              disabled={isBusy}
              className="inline-flex items-center justify-center rounded-xl border border-[var(--color-green)] bg-[var(--color-green)]/10 px-4 py-2.5 text-sm font-bold tracking-[0.12em] text-[var(--foreground)] transition hover:bg-[var(--color-green)]/20"
            >
              {isBusy ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 inline-block"
                >
                  <SquarePen className="size-4" />
                </motion.span>
              ) : (
                <Save className="mr-2 size-4" />
              )}
              {editingId ? "Save Changes" : "Create Blog"}
              <Check className="ml-2 size-4" />
            </button>
          </form>
        </motion.div>
      ) : null}
    </section>
  );
}
