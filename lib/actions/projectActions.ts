"use server";

import {
  projectCreateSchema,
  projectDeleteSchema,
  projectUpdateSchema,
} from "@/lib/schemas/projectSchema";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/lib/services/projectService";
import { enforceDashboardAuth } from "@/lib/utils/auth";

export const getProjectsAction = async () => {
  try {
    await enforceDashboardAuth();
    const projects = await getProjects();
    return { data: projects, error: null };
  } catch (error) {
    console.error("Project fetch failed:", error);
    return { data: null, error: "Failed to fetch projects" };
  }
};

export const createProjectAction = async (input: unknown) => {
  try {
    await enforceDashboardAuth();
    const data = projectCreateSchema.parse(input);
    const project = await createProject(data);
    return { data: project, error: null };
  } catch (error) {
    console.error("Project creation failed:", error);
    return { data: null, error: "Failed to create project" };
  }
};

export const updateProjectAction = async (input: unknown) => {
  try {
    await enforceDashboardAuth();
    const data = projectUpdateSchema.parse(input);
    const project = await updateProject(data);
    return { data: project, error: null };
  } catch (error) {
    console.error("Project update failed:", error);
    return { data: null, error: "Failed to update project" };
  }
};

export const deleteProjectAction = async (input: unknown) => {
  try {
    await enforceDashboardAuth();
    const { id } = projectDeleteSchema.parse(input);
    const project = await deleteProject(id);
    return { data: project, error: null };
  } catch (error) {
    console.error("Project deletion failed:", error);
    return { data: null, error: "Failed to delete project" };
  }
};
