import type { ExperienceEntry } from '@/types/experience';

import { cn } from '@/lib/utils';

export function ExperienceTimeline({
  entries,
  activeIndex,
  onSelect,
}: {
  entries: ExperienceEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      {entries.map((entry, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'border-background/10 group w-full border-b py-8 text-left transition-all duration-500',
              isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70',
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
                {isActive ? (
                  <div
                    key={entry.id}
                    className="bg-background/20 mt-4 h-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="bg-background h-full w-0 animate-[progress_6s_linear_forwards]" />
                  </div>
                ) : null}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
