import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

import { projects } from '@/data/projects';

const STATS = [
  { value: `${projects.length}+`, label: 'Featured Projects' },
  { value: '100%', label: 'Production Grade' },
  { value: 'Full-Stack', label: 'Web, AI & WordPress' },
  { value: '2', label: 'AI-Powered Builds' },
];

export function WorkHeroSection() {
  return (
    <SectionContainer as="div" className="relative pt-40 pb-16 lg:pt-48 lg:pb-24">
      <Reveal>
        <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          Portfolio Showcase
        </span>

        <h1 className="font-heading mb-6 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-tight">
          Selected Work &amp;
          <br />
          <span className="text-muted-foreground">Engineering Projects</span>
        </h1>

        <p className="text-muted-foreground font-body max-w-2xl text-lg leading-relaxed">
          A collection of production applications, service platforms, and performance-focused
          websites built with modern full-stack and WordPress technologies.
        </p>
      </Reveal>

      <Reveal
        delayMs={120}
        className="border-foreground/10 mt-16 grid grid-cols-2 gap-8 border-t pt-10 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-3xl tracking-tight lg:text-4xl">{stat.value}</p>
            <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </SectionContainer>
  );
}
