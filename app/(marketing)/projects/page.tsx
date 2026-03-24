export const dynamic = "force-dynamic";

import Awards from "@/components/home/Awards";
import { getProjects } from "@/lib/services/projectService";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <Awards projects={projects} />;
}

