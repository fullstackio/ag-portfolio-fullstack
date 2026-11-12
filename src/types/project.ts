export interface Project {
  slug: string;
  title: string;
  /** Short label shown as a badge over the preview image, e.g. "Full-Stack". */
  category: string;
  /** Display-only month/year badge, e.g. "June 2025". Placeholder until real dates are supplied. */
  date: string;
  description: string;
  technologies: string[];
  previewImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Case study destination. `null` means the owner has not supplied one yet. */
  caseStudyHref: string | null;
}
