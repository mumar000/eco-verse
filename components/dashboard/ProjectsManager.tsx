"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  Eye,
  ImageIcon,
  Pencil,
  PlusCircle,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/app/generated/prisma/client";
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/lib/hooks/useProjects";
import { parseProjectPayload } from "@/lib/projects/projectPayload";
import { uploadImageToCloudinary } from "@/lib/utils/cloudinary";
import type { ChangeEvent, FormEvent } from "react";

type ProjectFormState = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  tags: string;
  coverImage: string;
  galleryImages: string;
};

const defaultFormState: ProjectFormState = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  tags: "",
  coverImage: "",
  galleryImages: "",
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function ProjectsManager() {
  const { data, isLoading, error, refetch } = useProjects();
  const projects = useMemo(() => (data ?? []) as Project[], [data]);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [formState, setFormState] =
    useState<ProjectFormState>(defaultFormState);
  const [formError, setFormError] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);

  const isMutationPending =
    createProject.isPending ||
    updateProject.isPending ||
    deleteProject.isPending;
  const isFormBusy =
    isMutationPending || isUploadingCover || isUploadingGallery;

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === editingProjectId) ?? null,
    [projects, editingProjectId],
  );

  const resetPanel = () => {
    setEditingProjectId(null);
    setFormState(defaultFormState);
    setPanelOpen(false);
  };

  const startCreate = () => {
    setEditingProjectId(null);
    setFormState(defaultFormState);
    setPanelOpen(true);
  };

  const startEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setFormState({
      title: project.title ?? "",
      slug: project.slug ?? "",
      shortDescription: project.shortDescription ?? "",
      description: project.description ?? "",
      tags: (project.tags ?? []).join(", "),
      coverImage: project.coverImage ?? "",
      galleryImages: (project.galleryImages ?? []).join(", "),
    });
    setPanelOpen(true);
  };

  const submitCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    try {
      const payload = parseProjectPayload(formState);
      if (!payload.title || !payload.slug) {
        setFormError("Title and slug are required.");
        return;
      }

      if (editingProjectId) {
        await updateProject.mutateAsync({
          id: editingProjectId,
          ...payload,
        });
      } else {
        await createProject.mutateAsync(payload);
      }

      resetPanel();
      await refetch();
    } catch {
      setFormError("Unable to save this project right now.");
    }
  };

  const submitDelete = async (projectId: number) => {
    try {
      setFormError("");
      await deleteProject.mutateAsync(projectId);
      if (editingProjectId === projectId) {
        resetPanel();
      }
      await refetch();
    } catch {
      setFormError("Unable to remove this project right now.");
    }
  };

  const submitReset = () => {
    if (!selectedProject) {
      return;
    }

    setFormState({
      title: selectedProject.title ?? "",
      slug: selectedProject.slug ?? "",
      shortDescription: selectedProject.shortDescription ?? "",
      description: selectedProject.description ?? "",
      tags: (selectedProject.tags ?? []).join(", "),
      coverImage: selectedProject.coverImage ?? "",
      galleryImages: (selectedProject.galleryImages ?? []).join(", "),
    });
  };

  const updateField = (field: keyof ProjectFormState) => (value: string) => {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));
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
      updateField("coverImage")(secureUrl);
    } catch {
      setFormError(
        "Image upload failed. Please check Cloudinary configuration.",
      );
    } finally {
      setIsUploadingCover(false);
      event.target.value = "";
    }
  };

  const onGalleryUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    try {
      setIsUploadingGallery(true);
      setFormError("");
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadImageToCloudinary(file)),
      );
      setFormState((previous) => {
        const existing = previous.galleryImages
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
        return {
          ...previous,
          galleryImages: [...existing, ...uploadedUrls].join(", "),
        };
      });
    } catch {
      setFormError("One or more gallery uploads failed.");
    } finally {
      setIsUploadingGallery(false);
      event.target.value = "";
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-[var(--color-primary)]/20 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Projects
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Portfolio Hub
          </h2>
          <p className="text-sm text-zinc-600">
            Add, edit, and manage portfolio entries quickly.
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-green)]/40 bg-[var(--color-green)]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/18"
          onClick={startCreate}
          type="button"
        >
          <PlusCircle className="size-4" />
          Add Project
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl border border-zinc-200 bg-white"
            />
          ))}
        </div>
      ) : (
        <>
          {error ? (
            <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              Unable to load projects.
            </p>
          ) : null}

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center text-zinc-500">
              No projects yet. Click{" "}
              <span className="font-semibold">Add Project</span> to create your
              first item.
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
              {projects.map((project) => {
                const isSelected = editingProjectId === project.id && panelOpen;
                return (
                  <motion.article
                    key={project.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`group rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-[var(--color-green)]/35 bg-[var(--color-green)]/10"
                        : "border-zinc-200 bg-white hover:border-[var(--color-primary)]/60"
                    }`}
                  >
                    <div className="relative mb-3 h-40 overflow-hidden rounded-xl bg-zinc-100">
                      {project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-zinc-100 text-zinc-400">
                          <ImageIcon className="size-10" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xl font-black text-[var(--foreground)]">
                          {project.title}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                          {project.slug}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-primary)]/25 px-2 py-1 text-xs text-[var(--foreground)]/60">
                        {new Date(project.updatedAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                      {project.shortDescription || "No summary added yet."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(project.tags ?? []).slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-[var(--color-green)]/30 bg-[var(--color-green)]/8 py-2 text-sm font-semibold text-[var(--color-green)] transition hover:border-[var(--color-green)] hover:bg-[var(--color-green)]/15"
                      >
                        <Eye className="mr-2 size-4" /> View
                      </Link>
                      <button
                        onClick={() => startEdit(project)}
                        type="button"
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[var(--color-primary)] hover:text-[var(--foreground)]"
                      >
                        <Pencil className="mr-2 size-4" /> Edit
                      </button>
                      <button
                        onClick={() => submitDelete(project.id)}
                        type="button"
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-red-200 bg-red-50 py-2 text-sm font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-100"
                        disabled={isMutationPending}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </>
      )}

      {panelOpen && (
        <motion.div
          initial={{ x: 36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <form onSubmit={submitCreate} className="grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-zinc-600">
                {editingProjectId ? "Update Project" : "Create New Project"}
              </h3>
              <div className="flex gap-2">
                {editingProjectId ? (
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
                  className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700"
                >
                  Close
                </button>
              </div>
            </div>

            {formError ? (
              <p className="text-sm text-red-600">{formError}</p>
            ) : null}

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Title
              </span>
              <input
                value={formState.title}
                onChange={(event) => {
                  const value = event.target.value;
                  setFormState((prev) => ({
                    ...prev,
                    title: value,
                    slug: editingProjectId ? prev.slug : toSlug(value),
                  }));
                }}
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                required
                placeholder="Project title"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Slug
              </span>
              <input
                value={formState.slug}
                onChange={(event) => updateField("slug")(event.target.value)}
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="project-title"
                required
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Short Description
              </span>
              <input
                value={formState.shortDescription}
                onChange={(event) =>
                  updateField("shortDescription")(event.target.value)
                }
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="One-liner for cards"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Description
              </span>
              <textarea
                value={formState.description}
                onChange={(event) =>
                  updateField("description")(event.target.value)
                }
                className="min-h-24 border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="Project details"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Cover Image
              </span>
              <div className="flex gap-2">
                <input
                  value={formState.coverImage}
                  onChange={(event) =>
                    updateField("coverImage")(event.target.value)
                  }
                  className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                  placeholder="https://..."
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
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Tags (comma separated)
              </span>
              <input
                value={formState.tags}
                onChange={(event) => updateField("tags")(event.target.value)}
                className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                placeholder="ux, app, design"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Gallery Images (comma separated)
              </span>
              <div className="flex gap-2">
                <input
                  value={formState.galleryImages}
                  onChange={(event) =>
                    updateField("galleryImages")(event.target.value)
                  }
                  className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                  placeholder="https://... , https://..."
                />
                <button
                  type="button"
                  disabled={isUploadingGallery}
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="rounded-lg border border-[var(--color-green)]/30 bg-[var(--color-green)]/8 px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--color-green)]/16 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploadingGallery ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={galleryFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onGalleryUpload}
                  className="hidden"
                />
              </div>
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
                  <RotateCcw className="size-4" />
                </motion.span>
              ) : (
                <Save className="mr-2 size-4" />
              )}
              <span>
                {editingProjectId ? "Save Changes" : "Create Project"}
              </span>
              <Check className="ml-2 size-4" />
            </button>
          </form>
        </motion.div>
      )}
    </section>
  );
}
