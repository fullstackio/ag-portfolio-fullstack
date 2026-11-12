import type { Project } from '@/types/project';

/**
 * Sourced from the approved mockup (design/mockup/AG-Portfolio-Fullpage-Mockup.png).
 * `caseStudyHref` points at the matching post in `src/data/blogs.ts`.
 * `date` is a placeholder for visual layout only — replace with real dates when known.
 */
export const projects: Project[] = [
  {
    slug: 'idot-ai',
    title: 'iDot AI — All-in-One AI Platform',
    category: 'AI & LLMs',
    date: 'August 2025',
    description:
      'A modern AI platform with chat, code generation, image creation, document processing and multi-language support.',
    technologies: ['Next.js', 'NestJS', 'AI', 'OpenAI', 'Claude'],
    previewImage: {
      src: '/images/projects/idot-ai.png',
      alt: 'iDot AI dashboard showing the all-in-one AI assistant chat interface',
      width: 906,
      height: 429,
    },
    caseStudyHref: '/blogs/idot-ai-platform',
  },
  {
    slug: 'ag-appliance-services',
    title: 'AG Appliance Services',
    category: 'Service Management',
    date: 'May 2025',
    description:
      'Service management platform for appliance repair (AMC, jobs, billing, stock & reports) built with Next.js and NestJS.',
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'Redis'],
    previewImage: {
      src: '/images/projects/ag-appliance.png',
      alt: 'AG Appliance Services dashboard with job, revenue, and customer metrics',
      width: 957,
      height: 414,
    },
    caseStudyHref: '/blogs/ag-appliance-services',
  },
  {
    slug: 'port-of-subs',
    title: 'Port Of Subs',
    category: 'WordPress & ADA',
    date: 'February 2025',
    description:
      'WordPress platform with ADA compliance improvements, PageSpeed 90+, and ongoing enhancements.',
    technologies: ['WordPress', 'ADA', 'Performance'],
    previewImage: {
      src: '/images/projects/port-of-subs.png',
      alt: 'Port Of Subs website homepage',
      width: 951,
      height: 417,
    },
    caseStudyHref: '/blogs/port-of-subs-ada-performance',
  },
  {
    slug: 'ntooitive',
    title: 'Ntooitive',
    category: 'WordPress & SEO',
    date: 'November 2024',
    description:
      'ADA improvements, performance optimization and SEO enhancements for a business CMS site.',
    technologies: ['WordPress', 'ACF', 'ADA', 'SEO'],
    previewImage: {
      src: '/images/projects/ntooitive.png',
      alt: 'Ntooitive website homepage with "Creative Digital Solutions for Growth" heading',
      width: 987,
      height: 390,
    },
    caseStudyHref: '/blogs/ntooitive-ada-seo',
  },
];
