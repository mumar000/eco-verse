"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Pencil, Save } from "lucide-react";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { useProject, useUpdateProject } from "@/lib/hooks/useProjects";
import StudioEditorPanel from "@/components/dashboard/project-detail/StudioEditorPanel";
import { useProjectCaseStudyEditor } from "@/components/dashboard/project-detail/useProjectCaseStudyEditor";

type Props = {
  projectId: number;
};

export default function ProjectDetailView({ projectId }: Props) {
  const { data: project, isLoading, error } = useProject(projectId);
  const updateProject = useUpdateProject();

  const editor = useProjectCaseStudyEditor({
    project,
    onSave: async (payload) => {
      await updateProject.mutateAsync(payload);
    },
  });

  if (isLoading) {
    return <div className="h-72 animate-pulse rounded-2xl bg-zinc-200" />;
  }

  if (error || !project) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="text-sm font-semibold">Project not found.</p>
        <Link
          href="/dashboard/projects"
          className="mt-3 inline-flex text-sm underline"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  if (editor.isEditing) {
    return (
      <div className="bg-[#efefef] px-4 py-4 md:px-8 xl:px-20">
        <section className="grid grid-cols-1 rounded-2xl border border-zinc-200 bg-white xl:grid-cols-[28rem_1fr]">
          <StudioEditorPanel
            projectForm={editor.projectForm}
            contentForm={editor.contentForm}
            isSaving={editor.isSaving}
            isUploadingCover={editor.isUploadingCover}
            uploadingHeroIndex={editor.uploadingHeroIndex}
            actionError={editor.actionError}
            onExit={editor.closeEditor}
            onSave={editor.saveCaseStudy}
            onUploadCover={editor.uploadCoverImage}
            onUploadHeroImage={editor.uploadHeroImage}
            onProjectChange={editor.onProjectChange}
            onSummaryChange={editor.onSummaryChange}
            updateHeroDetail={editor.updateHeroDetail}
            updateHeroImage={editor.updateHeroImage}
            updateStat={editor.updateStat}
            updateSectionTitle={editor.updateSectionTitle}
            updateSectionParagraph={editor.updateSectionParagraph}
            addHeroDetail={editor.addHeroDetail}
            addHeroImage={editor.addHeroImage}
            removeHeroDetail={editor.removeHeroDetail}
            removeHeroImage={editor.removeHeroImage}
            addStat={editor.addStat}
            removeStat={editor.removeStat}
            addSection={editor.addSection}
            removeSection={editor.removeSection}
            addParagraph={editor.addParagraph}
            removeParagraph={editor.removeParagraph}
          />

          <div>
            <ProjectCaseStudy
              className="bg-[#efefef]"
              title={editor.projectForm.title}
              coverImage={editor.projectForm.coverImage}
              shortDescription={editor.projectForm.shortDescription}
              tags={editor.tags}
              content={editor.contentForm}
              actions={
                <div className="container mx-auto flex items-center justify-between gap-3 px-6 md:px-20">
                  <span className="inline-flex items-center rounded-full bg-black/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    Live Preview
                  </span>
                  <button
                    type="button"
                    onClick={editor.saveCaseStudy}
                    disabled={editor.isSaving}
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-800 disabled:opacity-60"
                  >
                    {editor.isSaving ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Save className="size-3.5" />
                    )}
                    Save
                  </button>
                </div>
              }
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-6 my-6 bg-[#efefef] pb-10">
      <ProjectCaseStudy
        className="bg-[#efefef]"
        title={editor.projectForm.title}
        coverImage={editor.projectForm.coverImage}
        shortDescription={editor.projectForm.shortDescription}
        tags={editor.tags}
        content={editor.contentForm}
        actions={
          <div className="container mx-auto flex items-center justify-between gap-3 px-6 md:px-10">
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-700"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
            <button
              type="button"
              onClick={editor.openEditor}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              <Pencil className="size-3.5" /> Edit Case Study
            </button>
          </div>
        }
      />
    </div>
  );
}
