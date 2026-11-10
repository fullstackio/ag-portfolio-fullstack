import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '../motion/reveal';

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
    <Reveal
      delayMs={80 * index}
      className="group border-foreground/10 grid items-center gap-8 border-b py-16 last:border-b-0 lg:grid-cols-2 lg:gap-16 lg:py-24"
    >
      <div className={cn(reverse ? 'lg:order-last' : '')}>
        <ProjectPreview project={project} />
      </div>

      <div className="space-y-6">
        <span className="text-muted-foreground block font-mono text-xs">{sequence}</span>
        <h3 className="font-heading text-3xl leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-1 lg:text-[2.6rem]">
          {project.title}
        </h3>
        <p className="text-muted-foreground font-body text-base leading-relaxed lg:text-lg">
          {project.description}
        </p>
        <TechnologyTags technologies={project.technologies} />
        {project.caseStudyHref ? (
          <a
            href={project.caseStudyHref}
            className="group/link font-body inline-flex items-center gap-2 pt-2 text-sm font-medium transition-all hover:gap-3"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        ) : (
          <span className="text-muted-foreground font-body inline-flex items-center gap-1 pt-2 text-sm">
            Case Study Coming Soon
          </span>
        )}
      </div>
    </Reveal>
  );
}
