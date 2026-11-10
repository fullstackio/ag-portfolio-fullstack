import type { ExperienceLogLine } from '@/types/experience';

export function ExperienceTerminal({
  lines,
  currentPosition,
}: {
  lines: ExperienceLogLine[];
  currentPosition: string;
}) {
  return (
    <div className="border-background/10 overflow-hidden rounded-xl border">
      <div className="border-background/10 bg-background/5 flex items-center justify-between border-b px-6 py-4">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-red-500/50" />
          <span className="size-3 rounded-full bg-yellow-500/50" />
          <span className="size-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-background/40 font-mono text-xs">experience.log</span>
      </div>

      <div className="bg-background/5 min-h-[280px] p-8 font-mono text-sm">
        {lines.map((line) => (
          <p key={line.id} className="text-background/70 mb-2 leading-loose">
            <span className="text-background/40 mr-4 select-none">{line.id}</span>
            <span className="text-background/90">{line.text}</span>
          </p>
        ))}
      </div>

      <div className="border-background/10 bg-background/5 flex items-center gap-3 border-t px-6 py-4">
        <span className="size-2 animate-pulse rounded-full bg-green-400" aria-hidden="true" />
        <span className="text-background/40 font-mono text-xs">
          current_position: {currentPosition}
        </span>
      </div>
    </div>
  );
}
