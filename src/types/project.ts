export interface Project {
  slug: string;
  title: string;
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
