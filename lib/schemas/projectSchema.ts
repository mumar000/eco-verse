import { z } from "zod";

export const projectCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  coverImage: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  galleryImages: z.array(z.string()).optional().default([]),
  content: z.string().optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial().extend({
  id: z.number().int().positive(),
});

export const projectDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
