import { ArrowUpRight } from 'lucide-react';

import { ProjectPreview } from './project-preview';
import { TechnologyTags } from './technology-tags';

import type { Project } from '@/types/project';

import { cn } from '@/lib/utils';

export function ProjectRow({
  project,
  index,
  total,
  reverse,
}: {
  project: Project;
  index: number;
  total: number;
  reverse: boolean;
}) {
  const sequence = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <div className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-14">
      <div className={cn(reverse ? 'md:order-2' : 'md:order-1')}>
        <ProjectPreview project={project} />
      </div>

      <div className={cn(reverse ? 'md:order-1' : 'md:order-2')}>
        <p className="text-muted-foreground font-mono text-xs">{sequence}</p>
        <h3 className="font-heading mt-2 text-xl font-medium sm:text-2xl">{project.title}</h3>
        <p className="text-muted-foreground font-body mt-3 max-w-md text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4">
          <TechnologyTags technologies={project.technologies} />
        </div>
        <div className="mt-5">
          {project.caseStudyHref ? (
            <a
              href={project.caseStudyHref}
              className="text-foreground hover:text-primary font-body inline-flex items-center gap-1 text-sm transition-colors"
            >
              Read Case Study
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span
              className="text-muted-foreground font-body inline-flex items-center gap-1 text-sm"
              aria-disabled="true"
            >
              Case Study Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
