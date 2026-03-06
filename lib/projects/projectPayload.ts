export type RawProjectPayload = {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  tags?: string;
  coverImage?: string;
  galleryImages?: string;
};

export const parseProjectPayload = (input: RawProjectPayload) => {
  return {
    title: input.title.trim(),
    slug: input.slug.trim(),
    shortDescription: input.shortDescription?.trim() || undefined,
    description: input.description?.trim() || undefined,
    coverImage: input.coverImage?.trim() || undefined,
    tags: input.tags
      ? input.tags
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : [],
    galleryImages: input.galleryImages
      ? input.galleryImages
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : [],
  };
};
