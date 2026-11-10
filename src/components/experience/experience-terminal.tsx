import type { ExperienceLogLine } from '@/types/experience';

export function ExperienceTerminal({
  lines,
  currentPosition,
}: {
  lines: ExperienceLogLine[];
  currentPosition: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-500/80" />
          <span className="size-2.5 rounded-full bg-yellow-500/80" />
          <span className="size-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-xs text-white/40">experience.log</span>
      </div>

      <div className="space-y-5 px-5 py-6 font-mono text-sm">
        {lines.map((line) => (
          <p key={line.id} className="leading-relaxed text-white/70">
            <span className="mr-3 text-white/30">{line.id}</span>
            {line.text}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3">
        <span className="size-2 rounded-full bg-green-500" aria-hidden="true" />
        <span className="font-mono text-xs text-white/40">current_position: {currentPosition}</span>
      </div>
    </div>
  );
}
