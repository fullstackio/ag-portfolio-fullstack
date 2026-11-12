import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

export function FaqCtaSection() {
  return (
    <div className="bg-secondary">
      <SectionContainer as="div" className="py-24 text-center lg:py-32">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <h2 className="font-heading text-3xl tracking-tight lg:text-5xl">
            Still have a question?
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed lg:text-lg">
            Send a note and I&apos;ll get back with a clear next step.
          </p>
          <Link
            href="/#contact"
            className="bg-foreground text-background hover:bg-foreground/90 group font-body inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition-all"
          >
            Contact me
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </SectionContainer>
    </div>
  );
}
