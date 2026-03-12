import prisma from "@/lib/prisma";
import type { ProjectCreateInput, ProjectUpdateInput } from "@/lib/schemas/projectSchema";

const serializeProjectContent = (content: ProjectCreateInput["content"] | ProjectUpdateInput["content"]) => {
  if (typeof content === "string") {
    return content;
  }

  if (!content) {
    return undefined;
  }

  return JSON.stringify(content);
};

export const getProjects = async () => {
  try {
    return await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    return await prisma.project.findUnique({
      where: {
        slug,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
};

export const createProject = async (data: ProjectCreateInput) => {
  try {
    return await prisma.project.create({
      data: {
        ...data,
        tags: data.tags ?? [],
        galleryImages: data.galleryImages ?? [],
        content: serializeProjectContent(data.content),
      },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

export const updateProject = async (data: ProjectUpdateInput) => {
  try {
    const { id, ...payload } = data;
    return await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...payload,
        content: serializeProjectContent(payload.content),
      },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }
};

export const deleteProject = async (id: number) => {
  try {
    return await prisma.project.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
};
