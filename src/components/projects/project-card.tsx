import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { Reveal } from '../motion/reveal';

import { TechnologyTags } from './technology-tags';

import type { Project } from '@/types/project';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const sequence = String(index + 1).padStart(2, '0');

  return (
    <Reveal delayMs={60 * (index % 2)} className="group h-full">
      <article className="border-foreground/10 bg-surface hover:border-foreground/30 flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.previewImage.src}
            alt={project.previewImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <span className="bg-background/90 text-foreground absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[11px] backdrop-blur">
            {project.category}
          </span>
          <span className="bg-background/90 text-foreground absolute top-3 right-3 rounded-full px-2.5 py-1 font-mono text-[11px] backdrop-blur">
            {project.date}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
          <span className="text-muted-foreground block font-mono text-xs">{sequence}</span>
          <h3 className="font-heading text-xl leading-tight tracking-tight lg:text-2xl">
            {project.title}
          </h3>
          <p className="text-muted-foreground font-body flex-1 text-sm leading-relaxed lg:text-base">
            {project.description}
          </p>
          <TechnologyTags technologies={project.technologies} />
          {project.caseStudyHref ? (
            <a
              href={project.caseStudyHref}
              className="group/link font-body inline-flex items-center gap-2 pt-1 text-sm font-medium transition-all hover:gap-3"
            >
              <span>Read Case Study</span>
              <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-muted-foreground font-body inline-flex items-center gap-1 pt-1 text-sm">
              Case Study Coming Soon
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}
