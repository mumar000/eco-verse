import { z } from "zod";

export const blogCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(false),
  categoryId: z.number().int().positive().optional(),
  categoryName: z.string().optional(),
});

export const blogUpdateSchema = blogCreateSchema.partial().extend({
  id: z.number().int().positive(),
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;
export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>;

