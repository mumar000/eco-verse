"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Check, Edit2, NotebookPen, RotateCcw, Save, SquarePen, Trash2 } from "lucide-react";
import {
  useBlogs,
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog,
} from "@/lib/hooks/useBlogs";
import type { BlogCreateInput, BlogUpdateInput } from "@/lib/schemas/blogSchema";
import { uploadImageToCloudinary } from "@/lib/utils/cloudinary";
import type { ChangeEvent } from "react";

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
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const panelTopRef = useRef<HTMLDivElement | null>(null);

  const blogs = useMemo(() => data ?? [], [data]);
  const editingBlog = useMemo(
    () =>
      blogs.find((blog: { id: number }) => blog.id === editingId) ??
      null,
    [blogs, editingId],
  );

  const isBusy =
    createBlog.isPending || updateBlog.isPending || deleteBlog.isPending;
  const isFormBusy = isBusy || isUploadingCover;

  useEffect(() => {
    if (!panelOpen || editingId) {
      return;
    }

    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [panelOpen, editingId]);

  const resetPanel = () => {
    setEditingId(null);
    setFormState(defaultBlogForm);
    setFormError("");
    setPanelOpen(false);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormState(defaultBlogForm);
    setFormError("");
    setPanelOpen(true);
  };

  const openEdit = (blog: { id: number; title: string; slug: string; description?: string | null; content: string; coverImage?: string | null; tags: string[]; category?: { name?: string } }) => {
    setEditingId(blog.id);
    setFormError("");
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

    const title = formState.title.trim();
    const slug = (formState.slug.trim() || toSlug(title)).trim();

    const payload = {
      title,
      slug,
      description: formState.description.trim() || undefined,
      coverImage: formState.coverImage.trim() || undefined,
      content: formState.content.trim() || title,
      tags: formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      categoryName: formState.categoryName.trim() || "General",
      published: false,
    };

    if (!payload.title || !payload.coverImage) {
      setFormError("Title and cover image are required.");
      return;
    }

    if (!payload.slug) {
      setFormError("Please enter a valid title to generate slug.");
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

  const onCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsUploadingCover(true);
      setFormError("");
      const secureUrl = await uploadImageToCloudinary(file);
      setFormState((previous) => ({
        ...previous,
        coverImage: secureUrl,
      }));
    } catch {
      setFormError("Image upload failed. Please check Cloudinary configuration.");
    } finally {
      setIsUploadingCover(false);
      event.target.value = "";
    }
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

      <div ref={panelTopRef} />

      {panelOpen && !editingId ? (
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
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Cover Image</span>
              <div className="flex gap-2">
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
                  required
                />
                <button
                  type="button"
                  disabled={isUploadingCover}
                  onClick={() => coverFileInputRef.current?.click()}
                  className="rounded-lg border border-[var(--color-green)]/30 bg-[var(--color-green)]/8 px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--color-green)]/16 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploadingCover ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={coverFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onCoverUpload}
                  className="hidden"
                />
              </div>
              {formState.coverImage.trim() ? (
                <div className="mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
                  <img
                    src={formState.coverImage}
                    alt="Blog cover preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ) : null}
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
              disabled={isFormBusy}
              className="inline-flex items-center justify-center rounded-xl border border-[var(--color-green)] bg-[var(--color-green)]/10 px-4 py-2.5 text-sm font-bold tracking-[0.12em] text-[var(--foreground)] transition hover:bg-[var(--color-green)]/20"
            >
              {isFormBusy ? (
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

      {isLoading ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square animate-pulse rounded-xl border border-zinc-200 bg-white"
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
              className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {blogs.map((blog: { id: number; title: string; coverImage?: string | null; tags?: string[] }) => (
                <motion.article
                  key={blog.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className={`rounded-xl border bg-white p-2.5 transition ${
                    editingId === blog.id && panelOpen
                      ? "border-[var(--color-green)]/35 bg-[var(--color-green)]/10"
                      : "border-zinc-200 hover:border-[var(--color-green)]/55"
                  }`}
                >
                  {blog.coverImage ? (
                    <div className="mb-3 aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="line-clamp-2 text-sm font-black text-[var(--foreground)]">
                        {blog.title}
                      </p>
                    </div>
                  </div>

                  {(blog.tags ?? []).length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(blog.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] text-zinc-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-3 flex gap-1.5">
                    <button
                      onClick={() => openEdit(blog as never)}
                      type="button"
                      className="inline-flex flex-1 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-[var(--color-primary)]"
                    >
                      <Edit2 className="mr-1 size-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => submitDelete(blog.id)}
                      type="button"
                      disabled={isBusy}
                      className="inline-flex flex-1 items-center justify-center rounded-md border border-red-200 bg-red-50 py-1.5 text-xs font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-100"
                    >
                      <Trash2 className="mr-1 size-3.5" />
                      Delete
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </>
      )}

      {panelOpen && editingId ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-10 md:pt-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl"
          >
            <form onSubmit={submitForm} className="grid gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-600">
                  Update Blog
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={submitReset}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700"
                  >
                    <RotateCcw className="size-3.5" /> Reset
                  </button>
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
                <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Cover Image</span>
                <div className="flex gap-2">
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
                    required
                  />
                  <button
                    type="button"
                    disabled={isUploadingCover}
                    onClick={() => coverFileInputRef.current?.click()}
                    className="rounded-lg border border-[var(--color-green)]/30 bg-[var(--color-green)]/8 px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--color-green)]/16 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploadingCover ? "Uploading..." : "Upload"}
                  </button>
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onCoverUpload}
                    className="hidden"
                  />
                </div>
                {formState.coverImage.trim() ? (
                  <div className="mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
                    <img
                      src={formState.coverImage}
                      alt="Blog cover preview"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ) : null}
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
                disabled={isFormBusy}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-green)] bg-[var(--color-green)]/10 px-4 py-2.5 text-sm font-bold tracking-[0.12em] text-[var(--foreground)] transition hover:bg-[var(--color-green)]/20"
              >
                {isFormBusy ? (
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
                Save Changes
                <Check className="ml-2 size-4" />
              </button>
            </form>
          </motion.div>
        </div>
      ) : null}

    </section>
  );
}
