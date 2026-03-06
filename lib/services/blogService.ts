import prisma from "@/lib/prisma";
import type { BlogCreateInput, BlogUpdateInput } from "@/lib/schemas/blogSchema";

export const getBlogs = async () => {
  try {
    return await prisma.blog.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const createBlog = async (
  input: Omit<BlogCreateInput, "categoryName"> & { categoryId: number },
) => {
  try {
    return await prisma.blog.create({
      data: input,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
};

export const updateBlog = async (input: BlogUpdateInput) => {
  try {
    const { id, ...payload } = input;
    return await prisma.blog.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error("Failed to update blog");
  }
};

export const deleteBlog = async (id: number) => {
  try {
    return await prisma.blog.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw new Error("Failed to delete blog");
  }
};
