export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

/** Sourced from the approved mockup (design/mockup/AG-Portfolio-Fullpage-Mockup.png). */
export const processSteps: ProcessStep[] = [
  { id: '01', title: 'Discover', description: 'Understand goals, users and problems.' },
  { id: '02', title: 'Design', description: 'Plan the solution, architecture and UX.' },
  { id: '03', title: 'Build', description: 'Develop, test and iterate with feedback.' },
  { id: '04', title: 'Deliver', description: 'Deploy, optimize and ensure long-term stability.' },
];
