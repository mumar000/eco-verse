import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { getProjectBySlug } from "@/lib/services/projectService";
import { normalizeCaseStudyContent, toContentRecord } from "@/lib/projects/caseStudyContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const createdDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const content = normalizeCaseStudyContent({
    rawContent: toContentRecord(project.content),
    shortDescription: project.shortDescription ?? "",
    description: project.description ?? "",
    createdDate,
    coverImage: project.coverImage ?? "",
  });

  return (
    <ProjectCaseStudy
      title={project.title}
      coverImage={project.coverImage ?? ""}
      shortDescription={project.shortDescription ?? ""}
      tags={project.tags ?? []}
      content={content}
    />
  );
}
