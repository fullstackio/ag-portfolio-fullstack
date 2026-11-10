import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionContainer } from '../layout/section-container';
import { ProjectRow } from '../projects/project-row';

import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

export function FeaturedProjectsSection() {
  return (
    <SectionContainer id="projects" className="py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-muted-foreground font-mono text-xs">—</span>
            <span className="text-muted-foreground font-mono text-xs tracking-wide">
              Selected Work
            </span>
          </div>
          <h2 className="font-heading text-3xl leading-tight font-medium sm:text-4xl">
            My featured
            <br />
            <span className="text-primary">projects</span>
          </h2>
        </div>
        <Link
          href="#all-projects"
          className="border-border bg-surface hover:bg-secondary font-body inline-flex items-center gap-1 rounded-full border px-4 py-2 text-xs transition-colors"
        >
          View all projects
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="divide-border mt-10 divide-y">
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

      <div className="mt-6 flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="#all-projects">
            See all {projects.length}+ projects
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </SectionContainer>
  );
}
