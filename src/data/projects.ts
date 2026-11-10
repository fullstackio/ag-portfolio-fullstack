import type { Project } from '@/types/project';

/**
 * Sourced from the approved mockup (design/mockup/AG-Portfolio-Fullpage-Mockup.png).
 * `caseStudyHref` is intentionally `null` until the owner supplies real case-study
 * destinations — see docs/tasks.md "Open questions". Do not invent URLs here.
 */
export const projects: Project[] = [
  {
    slug: 'idot-ai',
    title: 'iDot AI — All-in-One AI Platform',
    description:
      'A modern AI platform with chat, code generation, image creation, document processing and multi-language support.',
    technologies: ['Next.js', 'NestJS', 'AI', 'OpenAI', 'Claude'],
    previewImage: {
      src: '/images/projects/idot-ai.png',
      alt: 'iDot AI dashboard showing the all-in-one AI assistant chat interface',
      width: 906,
      height: 429,
    },
    caseStudyHref: null,
  },
  {
    slug: 'ag-appliance-services',
    title: 'AG Appliance Services',
    description:
      'Service management platform for appliance repair (AMC, jobs, billing, stock & reports) built with Next.js and NestJS.',
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'Redis'],
    previewImage: {
      src: '/images/projects/ag-appliance.png',
      alt: 'AG Appliance Services dashboard with job, revenue, and customer metrics',
      width: 957,
      height: 414,
    },
    caseStudyHref: null,
  },
  {
    slug: 'port-of-subs',
    title: 'Port Of Subs',
    description:
      'WordPress platform with ADA compliance improvements, PageSpeed 90+, and ongoing enhancements.',
    technologies: ['WordPress', 'ADA', 'Performance'],
    previewImage: {
      src: '/images/projects/port-of-subs.png',
      alt: 'Port Of Subs website homepage',
      width: 951,
      height: 417,
    },
    caseStudyHref: null,
  },
  {
    slug: 'ntooitive',
    title: 'Ntooitive',
    description:
      'ADA improvements, performance optimization and SEO enhancements for a business CMS site.',
    technologies: ['WordPress', 'ACF', 'ADA', 'SEO'],
    previewImage: {
      src: '/images/projects/ntooitive.png',
      alt: 'Ntooitive website homepage with "Creative Digital Solutions for Growth" heading',
      width: 987,
      height: 390,
    },
    caseStudyHref: null,
  },
];
