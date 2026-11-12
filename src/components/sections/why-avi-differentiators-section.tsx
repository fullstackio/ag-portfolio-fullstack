import { Clock, Code2, Shield, Star, Users, Zap } from 'lucide-react';

import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

import { whyAviDifferentiators } from '@/data/why-avi';

const ICONS = {
  zap: Zap,
  code: Code2,
  shield: Shield,
  clock: Clock,
  users: Users,
  star: Star,
} as const;

export function WhyAviDifferentiatorsSection() {
  return (
    <SectionContainer className="py-24 lg:py-32">
      <Reveal className="mb-12">
        <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          The Difference
        </span>
        <h2 className="font-heading text-4xl tracking-tight lg:text-5xl">
          What makes Avi
          <br />
          <span className="text-muted-foreground">stand apart</span>
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whyAviDifferentiators.map((item, index) => {
          const Icon = ICONS[item.icon];

          return (
            <Reveal
              key={item.title}
              delayMs={60 * index}
              className="group bg-foreground/5 hover:bg-foreground/10 h-full rounded-2xl p-6 shadow-none transition-all duration-500 hover:-translate-y-1 hover:shadow-lg lg:p-7"
            >
              <div className="bg-background border-foreground/10 group-hover:border-foreground/20 mb-5 flex size-10 items-center justify-center rounded-lg border transition-colors">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading mb-3 text-lg tracking-tight lg:text-xl">{item.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
