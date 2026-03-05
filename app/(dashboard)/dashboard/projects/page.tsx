import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import ProjectsClient from "@/components/dashboard/ProjectsClient";
import { projectKeys } from "@/lib/hooks/useProjects";
import { getProjects } from "@/lib/services/projectService";

export default async function ProjectsPage() {
  const queryClient = new QueryClient();
  const projects = await getProjects();

  queryClient.setQueryData(projectKeys.all, projects);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
        <p className="text-foreground/70">
          Manage case studies, galleries, and portfolio content.
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsClient />
      </HydrationBoundary>
    </section>
  );
}
