"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import type { Project } from "@/app/generated/prisma/client";
import {
  type CaseStudyContent,
  normalizeCaseStudyContent,
  sanitizeCaseStudyContent,
  toContentRecord,
} from "@/lib/projects/caseStudyContent";
import {
  emptyCaseStudyContent,
  emptyProjectForm,
  type ProjectForm,
} from "./types";
import { uploadImageToCloudinary } from "@/lib/utils/cloudinary";

type SavePayload = {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  tags: string[];
  content: string;
};

type UseProjectCaseStudyEditorOptions = {
  project: Project | null | undefined;
  onSave: (payload: SavePayload) => Promise<unknown>;
};

const hydrateFromProject = (project: Project) => {
  const createdDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  const rawContent = toContentRecord(project.content);

  const projectForm: ProjectForm = {
    title: project.title ?? "",
    shortDescription: project.shortDescription ?? "",
    description: project.description ?? "",
    coverImage: project.coverImage ?? "",
    tags: (project.tags ?? []).join(", "),
  };

  const contentForm = normalizeCaseStudyContent({
    rawContent,
    shortDescription: project.shortDescription ?? "",
    description: project.description ?? "",
    createdDate,
    coverImage: project.coverImage ?? "",
  });

  return { projectForm, contentForm, rawContent };
};

export const useProjectCaseStudyEditor = ({
  project,
  onSave,
}: UseProjectCaseStudyEditorOptions) => {
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProjectForm);
  const [contentForm, setContentForm] =
    useState<CaseStudyContent>(emptyCaseStudyContent);
  const [rawContent, setRawContent] = useState<Record<string, unknown>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadingHeroIndex, setUploadingHeroIndex] = useState<number | null>(
    null,
  );
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!project) {
      return;
    }

    const nextState = hydrateFromProject(project);
    setProjectForm(nextState.projectForm);
    setContentForm(nextState.contentForm);
    setRawContent(nextState.rawContent);
  }, [project]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("dashboard:sidebar-control", {
        detail: { collapsed: isEditing },
      }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("dashboard:sidebar-control", {
          detail: { collapsed: false },
        }),
      );
    };
  }, [isEditing]);

  const tags = useMemo(
    () =>
      projectForm.tags
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    [projectForm.tags],
  );

  const onProjectChange =
    (field: keyof ProjectForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setProjectForm((previous) => ({ ...previous, [field]: value }));
    };

  const onSummaryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContentForm((previous) => ({ ...previous, summary: value }));
  };

  const updateHeroDetail = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    setContentForm((previous) => ({
      ...previous,
      heroDetails: previous.heroDetails.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const updateStat = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    setContentForm((previous) => ({
      ...previous,
      stats: previous.stats.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const updateSectionTitle = (index: number, value: string) => {
    setContentForm((previous) => ({
      ...previous,
      sections: previous.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, title: value } : section,
      ),
    }));
  };

  const updateSectionParagraph = (
    sectionIndex: number,
    paragraphIndex: number,
    value: string,
  ) => {
    setContentForm((previous) => ({
      ...previous,
      sections: previous.sections.map((section, currentSectionIndex) => {
        if (currentSectionIndex !== sectionIndex) {
          return section;
        }

        return {
          ...section,
          paragraphs: section.paragraphs.map((paragraph, currentParagraphIndex) =>
            currentParagraphIndex === paragraphIndex ? value : paragraph,
          ),
        };
      }),
    }));
  };

  const addHeroDetail = () => {
    setContentForm((previous) => ({
      ...previous,
      heroDetails: [...previous.heroDetails, { label: "", value: "" }],
    }));
  };

  const updateHeroImage = (index: number, value: string) => {
    setContentForm((previous) => ({
      ...previous,
      heroImages: previous.heroImages.map((image, imageIndex) =>
        imageIndex === index ? value : image,
      ),
    }));
  };

  const addHeroImage = () => {
    setContentForm((previous) => ({
      ...previous,
      heroImages:
        previous.heroImages.length >= 4
          ? previous.heroImages
          : [...previous.heroImages, ""],
    }));
  };

  const removeHeroImage = (index: number) => {
    setContentForm((previous) => ({
      ...previous,
      heroImages: previous.heroImages.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const removeHeroDetail = (index: number) => {
    setContentForm((previous) => ({
      ...previous,
      heroDetails: previous.heroDetails.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const addStat = () => {
    setContentForm((previous) => ({
      ...previous,
      stats: [...previous.stats, { label: "", value: "" }],
    }));
  };

  const removeStat = (index: number) => {
    setContentForm((previous) => ({
      ...previous,
      stats: previous.stats.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const addSection = () => {
    setContentForm((previous) => ({
      ...previous,
      sections: [...previous.sections, { title: "", paragraphs: [""] }],
    }));
  };

  const removeSection = (sectionIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      sections: previous.sections.filter((_, currentIndex) => currentIndex !== sectionIndex),
    }));
  };

  const addParagraph = (sectionIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      sections: previous.sections.map((section, currentIndex) =>
        currentIndex === sectionIndex
          ? { ...section, paragraphs: [...section.paragraphs, ""] }
          : section,
      ),
    }));
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      sections: previous.sections.map((section, currentIndex) => {
        if (currentIndex !== sectionIndex) {
          return section;
        }

        return {
          ...section,
          paragraphs: section.paragraphs.filter(
            (_, currentParagraphIndex) => currentParagraphIndex !== paragraphIndex,
          ),
        };
      }),
    }));
  };

  const resetDraft = () => {
    if (!project) {
      return;
    }

    const nextState = hydrateFromProject(project);
    setProjectForm(nextState.projectForm);
    setContentForm(nextState.contentForm);
    setRawContent(nextState.rawContent);
    setActionError("");
  };

  const openEditor = () => {
    resetDraft();
    setIsEditing(true);
  };

  const closeEditor = () => {
    resetDraft();
    setIsEditing(false);
  };

  const saveCaseStudy = async () => {
    if (!project) {
      return;
    }

    setActionError("");
    setIsSaving(true);

    try {
      const nextContent = sanitizeCaseStudyContent(contentForm);
      const payloadContent: Record<string, unknown> = {
        ...rawContent,
        summary: nextContent.summary,
        heroDetails: nextContent.heroDetails,
        stats: nextContent.stats,
        sections: nextContent.sections,
        heroImages: nextContent.heroImages,
      };

      await onSave({
        id: project.id,
        title: projectForm.title.trim(),
        shortDescription: projectForm.shortDescription.trim(),
        description: projectForm.description.trim(),
        coverImage: projectForm.coverImage.trim(),
        tags,
        content: JSON.stringify(payloadContent),
      });

      setContentForm(nextContent);
      setRawContent(payloadContent);
      setIsEditing(false);
    } catch {
      setActionError("Could not save this case study right now.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadCoverImage = async (file: File) => {
    try {
      setActionError("");
      setIsUploadingCover(true);
      const secureUrl = await uploadImageToCloudinary(file);
      setProjectForm((previous) => ({ ...previous, coverImage: secureUrl }));
    } catch {
      setActionError("Image upload failed. Please check Cloudinary configuration.");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const uploadHeroImage = async (index: number, file: File) => {
    try {
      setActionError("");
      setUploadingHeroIndex(index);
      const secureUrl = await uploadImageToCloudinary(file);
      updateHeroImage(index, secureUrl);
    } catch {
      setActionError("Image upload failed. Please check Cloudinary configuration.");
    } finally {
      setUploadingHeroIndex(null);
    }
  };

  return {
    projectForm,
    contentForm,
    isEditing,
    isSaving,
    isUploadingCover,
    uploadingHeroIndex,
    actionError,
    tags,
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
    resetDraft,
    openEditor,
    closeEditor,
    saveCaseStudy,
    uploadCoverImage,
    uploadHeroImage,
  };
};
