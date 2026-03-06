import prisma from "@/lib/prisma";

export const getOrCreateCategoryByName = async (name: string) => {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  if (!slug) {
    throw new Error("Category name is required");
  }

  const existing = await prisma.category.findUnique({
    where: { slug },
  });

  if (existing) {
    return existing;
  }

  return prisma.category.create({
    data: {
      name,
      slug,
    },
  });
};

