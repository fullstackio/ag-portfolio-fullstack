import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionContainer } from '../layout/section-container';
import { ProjectRow } from '../projects/project-row';

import { projects } from '@/data/projects';

export function FeaturedProjectsSection() {
  return (
    <SectionContainer id="projects" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mb-4">
        <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          Selected Work
        </span>
        <div className="border-foreground/10 flex flex-wrap items-end justify-between gap-4 border-b pb-8">
          <h2 className="font-heading text-4xl tracking-tight lg:text-6xl">
            My featured
            <br />
            <span className="text-muted-foreground">projects</span>
          </h2>
          <Link
            href="#all-projects"
            className="border-foreground/20 hover:bg-foreground/5 font-body mb-1 inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all"
          >
            View all projects
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center">
        <Link
          href="#all-projects"
          className="bg-foreground text-background hover:bg-foreground/90 group font-body inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all"
        >
          See all {projects.length}+ projects
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </SectionContainer>
  );
}
