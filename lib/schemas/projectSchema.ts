import { z } from "zod";

const caseStudyFieldSchema = z.object({
  label: z.string().optional().default(""),
  value: z.string().optional().default(""),
});

const caseStudySectionSchema = z.object({
  title: z.string().optional().default(""),
  paragraphs: z.array(z.string()).optional().default([]),
});

export const caseStudyContentSchema = z.object({
  summary: z.string().optional().default(""),
  heroImages: z.array(z.string()).optional().default([]),
  heroDetails: z.array(caseStudyFieldSchema).optional().default([]),
  stats: z.array(caseStudyFieldSchema).optional().default([]),
  sections: z.array(caseStudySectionSchema).optional().default([]),
  workflow: z.record(z.string(), z.unknown()).optional(),
});

export const projectCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  coverImage: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  galleryImages: z.array(z.string()).optional().default([]),
  content: z.union([z.string(), caseStudyContentSchema]).optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial().extend({
  id: z.number().int().positive(),
});

export const projectDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
