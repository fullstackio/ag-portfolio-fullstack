import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

export function WhyAviCtaSection() {
  return (
    <div className="bg-secondary">
      <SectionContainer as="div" className="py-24 text-center lg:py-32">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <span className="text-muted-foreground inline-flex items-center gap-3 font-mono text-sm">
            <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
            Ready to Skip the Platforms?
          </span>
          <h2 className="font-heading text-3xl tracking-tight lg:text-5xl">
            Let&apos;s build something
            <br />
            worth shipping.
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed lg:text-lg">
            No bidding wars. No platform fees. No middlemen. Just direct engineering and results you
            can deploy.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="bg-foreground text-background hover:bg-foreground/90 group font-body inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition-all"
            >
              Start a Conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/work"
              className="border-foreground/20 hover:bg-foreground/5 font-body inline-flex h-14 items-center justify-center rounded-full border px-8 text-base font-medium transition-all"
            >
              See My Work First
            </Link>
          </div>
        </Reveal>
      </SectionContainer>
    </div>
  );
}
