import type { ExperienceEntry, ExperienceLogLine } from '@/types/experience';

/** Sourced from the approved mockup (design/mockup/AG-Portfolio-Fullpage-Mockup.png). */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'senior-fullstack-engineer',
    role: 'Senior Fullstack Engineer',
    company: 'Indus Net Technologies',
    dateRange: 'May 2014 – Present',
    current: true,
  },
  {
    id: 'fullstack-developer',
    role: 'Fullstack Developer',
    company: 'Freelance (Remote)',
    dateRange: 'Jan 2012 – Apr 2014',
  },
  {
    id: 'sde-intern',
    role: 'SDE Intern',
    company: 'Webkul Software Pvt. Ltd.',
    dateRange: 'Aug 2011 – Dec 2011',
  },
  {
    id: 'frontend-developer',
    role: 'Frontend Developer',
    company: 'TechVision Solutions',
    dateRange: 'Jan 2011 – Jul 2011',
  },
  {
    id: 'web-developer',
    role: 'Web Developer',
    company: 'Self Employed',
    dateRange: 'Mar 2010 – Dec 2010',
  },
];

export const experienceLogLines: ExperienceLogLine[] = [
  {
    id: '01',
    text: 'Leading a fullstack development team, building scalable web applications and enterprise solutions.',
  },
  {
    id: '02',
    text: 'Working with Next.js, NestJS, MongoDB and AWS to deliver high-performance, production-ready systems.',
  },
  {
    id: '03',
    text: 'Driving architecture, code quality, performance and accessibility across multiple client projects.',
  },
];
