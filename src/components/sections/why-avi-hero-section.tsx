import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

import { whyAviStats } from '@/data/why-avi';

export function WhyAviHeroSection() {
  return (
    <SectionContainer as="div" className="relative pt-40 pb-16 lg:pt-48 lg:pb-24">
      <Reveal>
        <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          Avi vs The Rest
        </span>

        <h1 className="font-heading mb-6 max-w-4xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] tracking-tight">
          Why hire Avi instead of a freelancer from{' '}
          <span className="text-muted-foreground">Upwork or Fiverr?</span>
        </h1>

        <p className="text-muted-foreground font-body max-w-2xl text-lg leading-relaxed">
          Freelance marketplaces exist to fill a gap. But working directly with a senior engineer
          who has a track record of shipping production systems is simply better — better quality,
          better communication, better outcomes, and no platform cut eating into your budget.
        </p>
      </Reveal>

      <Reveal
        delayMs={120}
        className="border-foreground/10 mt-16 grid grid-cols-2 gap-8 border-t pt-10 lg:grid-cols-4"
      >
        {whyAviStats.map((stat) => (
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
