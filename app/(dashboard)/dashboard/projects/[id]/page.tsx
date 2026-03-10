import { notFound } from "next/navigation";
import ProjectDetailView from "@/components/dashboard/ProjectDetailView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  return <ProjectDetailView projectId={projectId} />;
}
