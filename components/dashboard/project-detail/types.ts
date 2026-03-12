import type { CaseStudyContent } from "@/lib/projects/caseStudyContent";

export type ProjectForm = {
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  tags: string;
};

export const emptyProjectForm: ProjectForm = {
  title: "",
  shortDescription: "",
  description: "",
  coverImage: "",
  tags: "",
};

export const emptyCaseStudyContent: CaseStudyContent = {
  summary: "",
  heroImages: [],
  heroDetails: [],
  stats: [],
  sections: [],
};
