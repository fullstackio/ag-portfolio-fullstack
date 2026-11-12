export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  date: string;
  coverImage: { src: string; alt: string; width: number; height: number };
  sections: BlogSection[];
}
