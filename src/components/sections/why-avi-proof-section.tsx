import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

import { projects } from '@/data/projects';

export function WhyAviProofSection() {
  return (
    <SectionContainer className="py-24 lg:py-32">
      <Reveal className="mb-12 text-center">
        <span className="text-muted-foreground mb-6 inline-flex items-center justify-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          Proof, Not Promises
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
        </span>
        <h2 className="font-heading text-4xl tracking-tight lg:text-5xl">
          Real work. Real production.
        </h2>
        <p className="text-muted-foreground font-body mx-auto mt-4 max-w-xl text-base leading-relaxed lg:text-lg">
          Every project below is live, shipped, and maintained — not a throwaway mockup or a
          tutorial clone.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delayMs={60 * index} className="h-full">
            <Link
              href="/work"
              className="group border-foreground/10 hover:border-foreground/30 relative block aspect-video overflow-hidden rounded-2xl border transition-all duration-500"
            >
              <Image
                src={project.previewImage.src}
                alt={project.previewImage.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div
                className="from-background/90 via-background/20 absolute inset-0 bg-gradient-to-t to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-muted-foreground mb-1 block font-mono text-xs">
                  {project.category}
                </span>
                <h3 className="font-heading text-foreground text-base">{project.title}</h3>
              </div>
              <div className="bg-background/80 absolute top-4 right-4 flex size-8 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delayMs={120} className="mt-12 flex items-center justify-center">
        <Link
          href="/work"
          className="border-foreground/20 hover:bg-foreground/5 font-body inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all"
        >
          View all projects
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </Reveal>
    </SectionContainer>
  );
}
