"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ProjectCreateInput,
  ProjectUpdateInput,
} from "@/lib/schemas/projectSchema";

export const projectKeys = {
  all: ["projects"] as const,
  detail: (slug: string) => ["projects", slug] as const,
};

const fetchProjects = async () => {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};

const createProject = async (input: ProjectCreateInput) => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
};

const updateProject = async (input: ProjectUpdateInput) => {
  const response = await fetch(`/api/projects/${input.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
};

const deleteProject = async (id: number) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
};

export const useProjects = () =>
  useQuery({
    queryKey: projectKeys.all,
    queryFn: fetchProjects,
  });

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};
