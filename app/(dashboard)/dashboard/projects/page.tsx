export const dynamic = "force-dynamic";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import ProjectsManager from "@/components/dashboard/ProjectsManager";
import { projectKeys } from "@/lib/hooks/useProjects";
import { getProjects } from "@/lib/services/projectService";

export default async function ProjectsPage() {
  const queryClient = new QueryClient();
  const projects = await getProjects();

  queryClient.setQueryData(projectKeys.all, projects);

  return (
    <section className="space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsManager />
      </HydrationBoundary>
    </section>
  );
}
