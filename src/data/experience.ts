import type { ExperienceEntry } from '@/types/experience';

/** Sourced from the approved mockup (design/mockup/AG-Portfolio-Fullpage-Mockup.png). */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'senior-fullstack-engineer',
    role: 'Senior Fullstack Engineer',
    company: 'Indus Net Technologies',
    dateRange: 'May 2014 – Present',
    current: true,
    logLines: [
      'Leading a fullstack development team, building scalable web applications and enterprise solutions.',
      'Working with Next.js, NestJS, MongoDB and AWS to deliver high-performance, production-ready systems.',
      'Driving architecture, code quality, performance and accessibility across multiple client projects.',
    ],
  },
  {
    id: 'fullstack-developer',
    role: 'Fullstack Developer',
    company: 'Freelance (Remote)',
    dateRange: 'Jan 2012 – Apr 2014',
    logLines: [
      'Built and shipped fullstack web applications independently for clients across multiple industries.',
    ],
  },
  {
    id: 'sde-intern',
    role: 'SDE Intern',
    company: 'Webkul Software Pvt. Ltd.',
    dateRange: 'Aug 2011 – Dec 2011',
    logLines: [
      'Contributed to core product features as part of the engineering team, working with production codebases.',
    ],
  },
  {
    id: 'frontend-developer',
    role: 'Frontend Developer',
    company: 'TechVision Solutions',
    dateRange: 'Jan 2011 – Jul 2011',
    logLines: [
      'Built and maintained frontend interfaces, focusing on responsive design and cross-browser compatibility.',
    ],
  },
  {
    id: 'web-developer',
    role: 'Web Developer',
    company: 'Self Employed',
    dateRange: 'Mar 2010 – Dec 2010',
    logLines: ['Built and maintained websites independently as a self-employed web developer.'],
  },
];
