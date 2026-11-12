import { Check, X } from 'lucide-react';

import { SectionContainer } from '../layout/section-container';
import { Reveal } from '../motion/reveal';

import { whyAviComparisons, type PlatformComparison } from '@/data/why-avi';
import { cn } from '@/lib/utils';

const MARKER_CLASS: Record<PlatformComparison['marker'], string> = {
  green: 'bg-emerald-500',
  blue: 'bg-sky-500',
  amber: 'bg-amber-500',
  neutral: 'bg-foreground/50',
};

function ComparisonBlock({
  comparison,
  index,
  total,
}: {
  comparison: PlatformComparison;
  index: number;
  total: number;
}) {
  const sequence = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <Reveal
      delayMs={60 * index}
      className="border-foreground/10 bg-surface rounded-2xl border p-6 lg:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn('size-2.5 shrink-0 rounded-full', MARKER_CLASS[comparison.marker])}
            aria-hidden="true"
          />
          <div>
            <h3 className="font-heading text-xl tracking-tight lg:text-2xl">{comparison.title}</h3>
            <p className="text-muted-foreground font-body text-sm">{comparison.tagline}</p>
          </div>
        </div>
        <span className="text-muted-foreground font-mono text-xs">{sequence}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-muted-foreground mb-4 font-mono text-xs tracking-wide uppercase">
            The problems
          </p>
          <ul className="space-y-3">
            {comparison.problems.map((problem) => (
              <li key={problem} className="font-body flex items-start gap-2.5 text-sm">
                <X className="text-destructive mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-muted-foreground mb-4 font-mono text-xs tracking-wide uppercase">
            Working with Avi
          </p>
          <ul className="space-y-3">
            {comparison.workingWithAvi.map((point) => (
              <li key={point} className="font-body flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function WhyAviComparisonSection() {
  return (
    <SectionContainer className="py-24 lg:py-32">
      <Reveal className="mb-12">
        <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
          <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
          Head to Head
        </span>
        <h2 className="font-heading text-4xl tracking-tight lg:text-5xl">Avi vs the platforms</h2>
      </Reveal>

      <div className="space-y-6">
        {whyAviComparisons.map((comparison, index) => (
          <ComparisonBlock
            key={comparison.title}
            comparison={comparison}
            index={index}
            total={whyAviComparisons.length}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
