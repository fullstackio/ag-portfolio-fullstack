import { Cloud } from 'lucide-react';
import {
  SiDocker,
  SiFigma,
  SiGithub,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si';

import type { Skill } from '@/types/skill';

/** Sourced from the approved mockup (design/mockup/AG-Portfolio-Fullpage-Mockup.png). */
export const skills: Skill[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact, iconColorClassName: 'text-[#61DAFB]' },
  { name: 'TypeScript', icon: SiTypescript, iconColorClassName: 'text-[#3178C6]' },
  { name: 'Node.js', icon: SiNodedotjs, iconColorClassName: 'text-[#5FA04E]' },
  { name: 'NestJS', icon: SiNestjs, iconColorClassName: 'text-[#E0234E]' },
  { name: 'MongoDB', icon: SiMongodb, iconColorClassName: 'text-[#00ED64]' },
  { name: 'WordPress', icon: SiWordpress },
  { name: 'Tailwind', icon: SiTailwindcss, iconColorClassName: 'text-[#06B6D4]' },
  { name: 'Docker', icon: SiDocker, iconColorClassName: 'text-[#2496ED]' },
  // simple-icons ships no AWS mark in this bundle; Cloud is a neutral stand-in until a
  // real AWS asset is sourced (see docs/tasks.md).
  { name: 'AWS', icon: Cloud },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Figma', icon: SiFigma },
];
