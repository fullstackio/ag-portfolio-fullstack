import type { ExperienceEntry } from '@/types/experience';

import { cn } from '@/lib/utils';

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div>
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className={cn(
            'border-background/10 group border-b py-8 transition-all duration-500',
            entry.current ? 'opacity-100' : 'opacity-40 hover:opacity-70',
          )}
        >
          <div className="flex items-start gap-6">
            <span className="font-heading text-background/30 text-3xl" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <h3 className="font-heading mb-3 text-2xl transition-transform duration-300 group-hover:translate-x-2 lg:text-3xl">
                {entry.role}
                {entry.current ? (
                  <span className="text-background/50 ml-2 align-middle font-mono text-[10px] tracking-widest uppercase">
                    Current
                  </span>
                ) : null}
              </h3>
              <p className="text-background/60 font-body leading-relaxed">
                {entry.company} · {entry.dateRange}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
