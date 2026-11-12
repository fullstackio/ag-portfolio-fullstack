import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

export function FaqHeroSection() {
  return (
    <SectionContainer as="div" className="relative pt-40 pb-16 lg:pt-48 lg:pb-24">
      <Reveal>
        <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          FAQ
        </span>

        <h1 className="font-heading mb-6 max-w-3xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] tracking-tight">
          Common Questions
        </h1>

        <p className="text-muted-foreground font-body max-w-2xl text-lg leading-relaxed">
          Quick answers about process, stack, and how collaborations usually work.
        </p>
      </Reveal>
    </SectionContainer>
  );
}
