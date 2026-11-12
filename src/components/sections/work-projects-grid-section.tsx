import { SectionContainer } from '../layout/section-container';
import { ProjectCard } from '../projects/project-card';

import { projects } from '@/data/projects';

export function WorkProjectsGridSection() {
  return (
    <SectionContainer className="pb-24 lg:pb-32">
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}
