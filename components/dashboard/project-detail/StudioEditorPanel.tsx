"use client";

import { Loader2, MinusCircle, PlusCircle, Save } from "lucide-react";
import type { ProjectForm } from "./types";
import type { CaseStudyContent } from "@/lib/projects/caseStudyContent";
import { useRef, type ChangeEvent } from "react";

type StudioEditorPanelProps = {
  projectForm: ProjectForm;
  contentForm: CaseStudyContent;
  isSaving: boolean;
  isUploadingCover: boolean;
  uploadingHeroIndex: number | null;
  actionError: string;
  onExit: () => void;
  onSave: () => void;
  onUploadCover: (file: File) => Promise<void>;
  onUploadHeroImage: (index: number, file: File) => Promise<void>;
  onProjectChange: (
    field: keyof ProjectForm,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSummaryChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  updateHeroDetail: (index: number, field: "label" | "value", value: string) => void;
  updateHeroImage: (index: number, value: string) => void;
  updateStat: (index: number, field: "label" | "value", value: string) => void;
  updateSectionTitle: (index: number, value: string) => void;
  updateSectionParagraph: (
    sectionIndex: number,
    paragraphIndex: number,
    value: string,
  ) => void;
  addHeroDetail: () => void;
  addHeroImage: () => void;
  removeHeroDetail: (index: number) => void;
  removeHeroImage: (index: number) => void;
  addStat: () => void;
  removeStat: (index: number) => void;
  addSection: () => void;
  removeSection: (sectionIndex: number) => void;
  addParagraph: (sectionIndex: number) => void;
  removeParagraph: (sectionIndex: number, paragraphIndex: number) => void;
};

export default function StudioEditorPanel({
  projectForm,
  contentForm,
  isSaving,
  isUploadingCover,
  uploadingHeroIndex,
  actionError,
  onExit,
  onSave,
  onUploadCover,
  onUploadHeroImage,
  onProjectChange,
  onSummaryChange,
  updateHeroDetail,
  updateHeroImage,
  updateStat,
  updateSectionTitle,
  updateSectionParagraph,
  addHeroDetail,
  addHeroImage,
  removeHeroDetail,
  removeHeroImage,
  addStat,
  removeStat,
  addSection,
  removeSection,
  addParagraph,
  removeParagraph,
}: StudioEditorPanelProps) {
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const heroFileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    await onUploadCover(file);
    event.target.value = "";
  };

  const handleHeroUpload =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      await onUploadHeroImage(index, file);
      event.target.value = "";
    };

  return (
    <aside
      data-lenis-prevent
      className="border-b border-zinc-200 bg-white xl:sticky xl:top-16 xl:self-start xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto xl:overscroll-y-contain xl:border-b-0 xl:border-r"
    >
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-zinc-600">
            Studio Editor
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700"
            >
              Exit
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5">
        {actionError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {actionError}
          </p>
        ) : null}

        <div className="grid gap-3">
          <input
            value={projectForm.title}
            onChange={onProjectChange("title")}
            placeholder="Project title"
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />
          <input
            value={projectForm.coverImage}
            onChange={onProjectChange("coverImage")}
            placeholder="Cover image URL"
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => coverFileInputRef.current?.click()}
              disabled={isUploadingCover}
              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-60"
            >
              {isUploadingCover ? "Uploading..." : "Upload Cover"}
            </button>
            <input
              ref={coverFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={addHeroImage}
              disabled={contentForm.heroImages.length >= 4}
              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-45"
            >
              <PlusCircle className="mr-1 size-3.5" /> Add Hero Image
            </button>
          </div>
          <input
            value={projectForm.tags}
            onChange={onProjectChange("tags")}
            placeholder="Tags (comma separated)"
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />
          <textarea
            value={projectForm.shortDescription}
            onChange={onProjectChange("shortDescription")}
            rows={2}
            placeholder="Short description"
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />
          <textarea
            value={projectForm.description}
            onChange={onProjectChange("description")}
            rows={4}
            placeholder="Project description"
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />
          <textarea
            value={contentForm.summary}
            onChange={onSummaryChange}
            rows={3}
            placeholder="Hero summary"
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
              Hero Collage Images (1-4)
            </h3>
            <button
              type="button"
              onClick={addHeroImage}
              disabled={contentForm.heroImages.length >= 4}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 disabled:opacity-45"
            >
              <PlusCircle className="size-3.5" /> Add Image
            </button>
          </div>
          <div className="space-y-2">
            {contentForm.heroImages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-3 text-xs text-zinc-500">
                No hero collage images added yet. Click <span className="font-semibold">Add Image</span>.
              </div>
            ) : null}
            {contentForm.heroImages.map((image, index) => (
              <div key={`hero-image-${index}`} className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
                <input
                  value={image}
                  onChange={(event) => updateHeroImage(index, event.target.value)}
                  placeholder={`Hero image ${index + 1} URL`}
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => heroFileInputRefs.current[index]?.click()}
                  disabled={uploadingHeroIndex === index}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-60"
                >
                  {uploadingHeroIndex === index ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={(element) => {
                    heroFileInputRefs.current[index] = element;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleHeroUpload(index)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => removeHeroImage(index)}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-red-600"
                >
                  <MinusCircle className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
              Hero Details Fields
            </h3>
            <button
              type="button"
              onClick={addHeroDetail}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
            >
              <PlusCircle className="size-3.5" /> Add Field
            </button>
          </div>
          <div className="space-y-2">
            {contentForm.heroDetails.map((item, index) => (
              <div key={`detail-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  value={item.label}
                  onChange={(event) => updateHeroDetail(index, "label", event.target.value)}
                  placeholder="Label"
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <input
                  value={item.value}
                  onChange={(event) => updateHeroDetail(index, "value", event.target.value)}
                  placeholder="Value"
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeHeroDetail(index)}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 text-red-600"
                >
                  <MinusCircle className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
              Stat Fields
            </h3>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
            >
              <PlusCircle className="size-3.5" /> Add Stat
            </button>
          </div>
          <div className="space-y-2">
            {contentForm.stats.map((item, index) => (
              <div key={`stat-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  value={item.value}
                  onChange={(event) => updateStat(index, "value", event.target.value)}
                  placeholder="Value"
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <input
                  value={item.label}
                  onChange={(event) => updateStat(index, "label", event.target.value)}
                  placeholder="Label"
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 text-red-600"
                >
                  <MinusCircle className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
              Content Sections
            </h3>
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
            >
              <PlusCircle className="size-3.5" /> Add Section
            </button>
          </div>
          <div className="space-y-4">
            {contentForm.sections.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`} className="rounded-xl border border-zinc-200 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <input
                    value={section.title}
                    onChange={(event) => updateSectionTitle(sectionIndex, event.target.value)}
                    placeholder="Section title"
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-red-600"
                  >
                    <MinusCircle className="size-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <div key={`section-${sectionIndex}-paragraph-${paragraphIndex}`} className="grid gap-2">
                      <textarea
                        value={paragraph}
                        onChange={(event) =>
                          updateSectionParagraph(sectionIndex, paragraphIndex, event.target.value)
                        }
                        rows={3}
                        placeholder="Paragraph"
                        className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-red-600"
                      >
                        <MinusCircle className="size-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addParagraph(sectionIndex)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
                  >
                    <PlusCircle className="size-3.5" /> Add Paragraph
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
