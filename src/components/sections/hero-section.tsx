import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionContainer } from '../layout/section-container';

import { HeroDotSphere } from './hero-dot-sphere';

import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <SectionContainer
      as="div"
      className="relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-20"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[55%] md:block">
        <HeroDotSphere />
      </div>

      <div className="relative">
        <div className="mb-6 flex items-center gap-2.5">
          <span
            className="border-border bg-surface flex size-7 items-center justify-center rounded-full border text-[10px] font-medium"
            aria-hidden="true"
          >
            AG
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
            <span className="text-muted-foreground font-mono text-xs">Open to New Projects</span>
          </span>
        </div>

        <h1 className="font-heading text-4xl leading-[1.15] font-medium tracking-tight sm:text-5xl lg:text-[3.4rem]">
          Turning ideas into experiences that scale
        </h1>

        <p className="text-muted-foreground font-body mt-6 max-w-md text-[15px] leading-relaxed">
          I&apos;m a full-stack developer specializing in building exceptional digital experiences.
          With a focus on modern web technologies, AI, and scalable architecture, I craft
          high-performance solutions that help businesses and startups thrive.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="#contact">
              Get in touch
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="#projects">My work</Link>
          </Button>
        </div>
      </div>

      <div className="hidden md:block" />
    </SectionContainer>
  );
}
