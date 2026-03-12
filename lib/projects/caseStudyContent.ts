export type CaseStudyField = {
  label: string;
  value: string;
};

export type CaseStudySection = {
  title: string;
  paragraphs: string[];
};

export type CaseStudyContent = {
  summary: string;
  heroImages: string[];
  heroDetails: CaseStudyField[];
  stats: CaseStudyField[];
  sections: CaseStudySection[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const toContentRecord = (content: unknown) => {
  if (!content) {
    return {} as Record<string, unknown>;
  }

  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      return isRecord(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return isRecord(content) ? content : {};
};

const toParagraphs = (description: string) =>
  description
    .split(/\n\n+/)
    .map((value) => value.trim())
    .filter(Boolean);

const normalizeFieldArray = (value: unknown): CaseStudyField[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const label = typeof item.label === "string" ? item.label.trim() : "";
      const fieldValue = typeof item.value === "string" ? item.value.trim() : "";

      if (!label && !fieldValue) {
        return null;
      }

      return { label, value: fieldValue };
    })
    .filter((item): item is CaseStudyField => item !== null);
};

const normalizeSectionArray = (value: unknown): CaseStudySection[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const title = typeof item.title === "string" ? item.title.trim() : "";
      const paragraphs = Array.isArray(item.paragraphs)
        ? item.paragraphs
            .map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : ""))
            .filter(Boolean)
        : [];

      if (!title && paragraphs.length === 0) {
        return null;
      }

      return { title, paragraphs };
    })
    .filter((item): item is CaseStudySection => item !== null);
};

const normalizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
};

const toDefaultSections = (description: string, raw: Record<string, unknown>) => {
  const paragraphs = toParagraphs(description);
  const midpoint = Math.max(1, Math.ceil(paragraphs.length / 2));

  const firstParagraphs = paragraphs.slice(0, midpoint);
  const secondParagraphs = paragraphs.slice(midpoint);

  const legacyBlocks = [raw.challenge, raw.strategy, raw.impact]
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  const defaultFirst = firstParagraphs.length > 0 ? firstParagraphs : legacyBlocks.slice(0, 1);
  const defaultSecond =
    secondParagraphs.length > 0
      ? secondParagraphs
      : legacyBlocks.length > 1
        ? legacyBlocks.slice(1)
        : [
            "Share the campaign approach, creator strategy, and platform execution used to drive outcomes.",
          ];

  return [
    {
      title: "Standing Out Amidst The Noise",
      paragraphs:
        defaultFirst.length > 0
          ? defaultFirst
          : ["Introduce the market challenge and opportunity for this campaign."],
    },
    {
      title: "Curating Authentic Luxury Experiences",
      paragraphs: defaultSecond,
    },
  ];
};

export const normalizeCaseStudyContent = (options: {
  rawContent: Record<string, unknown>;
  shortDescription: string;
  description: string;
  createdDate: string;
  coverImage?: string;
}) => {
  const { rawContent, shortDescription, description, createdDate, coverImage } = options;

  const heroImages = normalizeStringArray(rawContent.heroImages);
  const heroDetails = normalizeFieldArray(rawContent.heroDetails);
  const legacyDetails = normalizeFieldArray(rawContent.details);
  const stats = normalizeFieldArray(rawContent.stats);
  const legacyStats = normalizeFieldArray(rawContent.metrics);
  const sections = normalizeSectionArray(rawContent.sections);

  return {
    summary:
      typeof rawContent.summary === "string" && rawContent.summary.trim()
        ? rawContent.summary
        : typeof rawContent.overviewNote === "string" && rawContent.overviewNote.trim()
          ? rawContent.overviewNote
          : shortDescription,
    heroImages:
      heroImages.length > 0
        ? heroImages
        : typeof coverImage === "string" && coverImage.trim()
          ? [coverImage.trim()]
          : [],
    heroDetails:
      heroDetails.length > 0
        ? heroDetails
        : legacyDetails.length > 0
          ? legacyDetails
          : [
              { label: "Brand", value: "" },
              { label: "Creators", value: "" },
              { label: "Platforms", value: "" },
              { label: "Date", value: createdDate },
            ],
    stats:
      stats.length > 0
        ? stats
        : legacyStats.length > 0
          ? legacyStats
          : [
              { value: "16M", label: "Impressions" },
              { value: "537.3K", label: "Engagements" },
              { value: "3", label: "Creators" },
              { value: "117", label: "Posts across Instagram and TikTok" },
            ],
    sections: sections.length > 0 ? sections : toDefaultSections(description, rawContent),
  } as CaseStudyContent;
};

export const sanitizeCaseStudyContent = (
  content: CaseStudyContent,
): CaseStudyContent => ({
  summary: content.summary.trim(),
  heroImages: content.heroImages.map((image) => image.trim()).filter(Boolean),
  heroDetails: content.heroDetails
    .map((item) => ({
      label: item.label.trim(),
      value: item.value.trim(),
    }))
    .filter((item) => item.label || item.value),
  stats: content.stats
    .map((item) => ({
      label: item.label.trim(),
      value: item.value.trim(),
    }))
    .filter((item) => item.label || item.value),
  sections: content.sections
    .map((section) => ({
      title: section.title.trim(),
      paragraphs: section.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean),
    }))
    .filter((section) => section.title || section.paragraphs.length > 0),
});
