import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

import { whyAviClosingStatement, whyAviHonestTake } from '@/data/why-avi';

export function WhyAviHonestTakeSection() {
  return (
    <SectionContainer className="py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
            <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
            The Honest Take
          </span>
          <h2 className="font-heading text-4xl tracking-tight lg:text-5xl">
            Why working with Avi
            <br />
            <span className="text-muted-foreground">beats most freelancers online</span>
          </h2>
        </Reveal>

        <Reveal delayMs={120} className="space-y-5">
          {whyAviHonestTake.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground font-body text-base leading-relaxed lg:text-lg"
            >
              {paragraph}
            </p>
          ))}
          <p className="font-body text-foreground text-base leading-relaxed font-medium lg:text-lg">
            {whyAviClosingStatement}
          </p>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
