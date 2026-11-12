import type { BlogPost } from '@/types/blog';

/**
 * Case studies for the real, shipped projects in `src/data/projects.ts` — not placeholder
 * content. `date` mirrors the placeholder project dates (see projects.ts) pending real dates.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'idot-ai-platform',
    title: 'iDot AI: Building an All-in-One AI Platform',
    tags: ['Next.js', 'NestJS', 'OpenAI', 'Claude', 'AI Engineering', 'Full-Stack'],
    excerpt:
      'A modern AI platform with chat, code generation, image creation, document processing and multi-language support.',
    date: 'August 2025',
    coverImage: {
      src: '/images/projects/idot-ai.png',
      alt: 'iDot AI dashboard showing the all-in-one AI assistant chat interface',
      width: 906,
      height: 429,
    },
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most teams end up juggling a separate tool for chat, code generation, image creation and document processing. iDot AI was built to put all of that behind one product and one login — a single platform for the AI tasks people actually reach for day to day.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'The frontend is a Next.js application talking to a NestJS backend, with a provider-abstraction layer in front of OpenAI and Claude so the UI never has to know which model is answering a given request. That separation made it possible to add or swap a provider without touching any frontend code.',
        ],
      },
      {
        heading: 'Key Features',
        paragraphs: [],
        bullets: [
          'Streaming chat interface with multi-turn conversations',
          'Code generation with syntax highlighting',
          'Image creation from text prompts',
          'Document upload and processing/summarization',
          'Multi-language support across the assistant experience',
        ],
      },
      {
        heading: 'Engineering Challenges',
        paragraphs: [
          'Different LLM providers stream and format responses differently, so normalizing that behind one consistent interface — without losing streaming responsiveness — was the core backend problem. Cost and rate limits across providers also had to be managed centrally rather than per feature.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'iDot AI is live and in production use today as the all-in-one AI assistant described on the My Work page, with chat, code generation, image creation and document processing all running on the same platform.',
        ],
      },
    ],
  },
  {
    slug: 'ag-appliance-services',
    title: 'AG Appliance Services: A Service Management Platform',
    tags: ['Next.js', 'NestJS', 'MongoDB', 'Redis', 'Service Management'],
    excerpt:
      'Service management platform for appliance repair (AMC, jobs, billing, stock & reports) built with Next.js and NestJS.',
    date: 'May 2025',
    coverImage: {
      src: '/images/projects/ag-appliance.png',
      alt: 'AG Appliance Services dashboard with job, revenue, and customer metrics',
      width: 957,
      height: 414,
    },
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'An appliance repair business was running AMC (annual maintenance contract) tracking, job scheduling, billing and stock entirely on spreadsheets. The goal was a single platform that could handle all of it without slowing the team down.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'Next.js powers the dashboards, with a NestJS API backing them. MongoDB was chosen for the data layer because job records, AMC contracts and billing line items all have slightly different shapes depending on the service type — a flexible schema avoided forcing every job into the same rigid structure. Redis handles caching and background processing so dashboards stay fast as job history grows.',
        ],
      },
      {
        heading: 'Key Features',
        paragraphs: [],
        bullets: [
          'AMC (annual maintenance contract) tracking',
          'Job assignment and status tracking',
          'Billing and invoicing',
          'Stock and inventory management',
          'Reporting dashboards with revenue and customer metrics',
        ],
      },
      {
        heading: 'Engineering Challenges',
        paragraphs: [
          'Modeling varied job and billing types without over-complicating the schema was the main data-design problem. As job history accumulated, keeping the reporting dashboards fast required pushing expensive aggregate queries behind Redis-backed caching rather than recomputing them on every page load.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'The platform is live and used to run day-to-day service operations — scheduling jobs, tracking contracts, billing customers and keeping stock levels visible in one place.',
        ],
      },
    ],
  },
  {
    slug: 'port-of-subs-ada-performance',
    title: 'Port Of Subs: ADA Compliance and Performance on WordPress',
    tags: ['WordPress', 'ADA', 'Accessibility', 'Performance'],
    excerpt:
      'WordPress platform with ADA compliance improvements, PageSpeed 90+, and ongoing enhancements.',
    date: 'February 2025',
    coverImage: {
      src: '/images/projects/port-of-subs.png',
      alt: 'Port Of Subs website homepage',
      width: 951,
      height: 417,
    },
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'The existing WordPress site needed ADA accessibility compliance and faster load times — not a rebuild. The work had to improve the site without disrupting an active, already-launched design.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'The theme and templates were audited for accessibility issues — color contrast, keyboard navigation, ARIA labeling and form labeling — and fixes were applied directly in place. On the performance side, assets, caching and images were optimized to bring PageSpeed scores up without changing how the site looked or behaved for visitors.',
        ],
      },
      {
        heading: 'Key Outcomes',
        paragraphs: [],
        bullets: [
          'ADA accessibility improvements implemented without visual regressions',
          'PageSpeed scores raised to 90+',
          'Ongoing maintenance and enhancements after launch',
        ],
      },
      {
        heading: 'Engineering Challenges',
        paragraphs: [
          'Improving accessibility and performance on a live, actively-used WordPress site — without downtime or breaking the existing design — meant every change had to be verified against the real production templates rather than a throwaway staging copy.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'The site remains live today with the compliance and performance work in place, and continues to receive ongoing enhancements.',
        ],
      },
    ],
  },
  {
    slug: 'ntooitive-ada-seo',
    title: 'Ntooitive: ADA, Performance, and SEO for a Business CMS Site',
    tags: ['WordPress', 'ACF', 'ADA', 'SEO'],
    excerpt:
      'ADA improvements, performance optimization and SEO enhancements for a business CMS site.',
    date: 'November 2024',
    coverImage: {
      src: '/images/projects/ntooitive.png',
      alt: 'Ntooitive website homepage with "Creative Digital Solutions for Growth" heading',
      width: 987,
      height: 390,
    },
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          "A business CMS site built on WordPress needed accessibility fixes, faster performance and better on-page SEO, while staying easy for the client's own team to keep editing day to day.",
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Advanced Custom Fields (ACF) kept the content model flexible for the editorial team, while ADA improvements were layered into the templates and on-page SEO — metadata, heading structure, and performance — was tightened up without disturbing that editorial flexibility.',
        ],
      },
      {
        heading: 'Key Outcomes',
        paragraphs: [],
        bullets: [
          'Improved accessibility across the site templates',
          'Faster load times',
          'Stronger on-page SEO positioning',
        ],
      },
      {
        heading: 'Engineering Challenges',
        paragraphs: [
          'Balancing a flexible, ACF-driven content model — one non-developers could keep editing — with the clean, consistent markup SEO and accessibility both depend on was the main tension to resolve.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'The site is live with the accessibility, performance and SEO improvements in place as part of its ongoing creative digital solutions work.',
        ],
      },
    ],
  },
];
