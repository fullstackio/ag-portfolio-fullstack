import type { ExperienceEntry } from '@/types/experience';

import { cn } from '@/lib/utils';

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="divide-y divide-white/10">
      {entries.map((entry, index) => (
        <li key={entry.id} className="flex items-start gap-4 py-5">
          <span
            className={cn(
              'w-8 shrink-0 font-mono text-sm',
              entry.current ? 'text-primary' : 'text-white/30',
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p
              className={cn(
                'font-body text-base',
                entry.current ? 'font-semibold text-white' : 'text-white/50',
              )}
            >
              {entry.role}
              {entry.current ? (
                <span className="text-primary ml-2 align-middle text-[10px] tracking-widest uppercase">
                  Current
                </span>
              ) : null}
            </p>
            <p
              className={cn(
                'font-body mt-1 text-xs',
                entry.current ? 'text-white/50' : 'text-white/30',
              )}
            >
              {entry.company} / {entry.dateRange}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
