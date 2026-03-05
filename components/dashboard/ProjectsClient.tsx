"use client";

import type { Project } from "@/app/generated/prisma/client";
import { useProjects } from "@/lib/hooks/useProjects";

const ProjectsClient = () => {
  const { data, isLoading, error } = useProjects();
  const projects = (data ?? []) as Project[];

  if (isLoading) {
    return <p className="text-foreground/70">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-red-500">Unable to load projects.</p>;
  }

  if (projects.length === 0) {
    return <p className="text-foreground/70">No projects yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li
          key={project.id}
          className="rounded border border-foreground/10 bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {project.title}
              </p>
              <p className="text-sm text-foreground/60">{project.slug}</p>
            </div>
            <span className="text-xs uppercase text-foreground/50">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
          {project.shortDescription && (
            <p className="mt-2 text-sm text-foreground/70">
              {project.shortDescription}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectsClient;
