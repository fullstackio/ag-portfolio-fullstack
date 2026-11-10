import { ExperienceTerminal } from '../experience/experience-terminal';
import { ExperienceTimeline } from '../experience/experience-timeline';

import { experienceEntries, experienceLogLines } from '@/data/experience';

export function WorkExperienceSection() {
  const current = experienceEntries.find((entry) => entry.current);

  return (
    <section
      id="experience"
      className="bg-foreground text-background relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mb-16 lg:mb-24">
          <span className="text-background/50 mb-6 inline-flex items-center gap-3 font-mono text-sm">
            <span className="bg-background/30 h-px w-8" aria-hidden="true" />
            Experience
          </span>
          <h2 className="font-heading text-4xl tracking-tight lg:text-6xl">Work Experience</h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <ExperienceTimeline entries={experienceEntries} />

          <div className="self-start lg:sticky lg:top-32">
            <ExperienceTerminal lines={experienceLogLines} currentPosition={current?.role ?? ''} />
          </div>
        </div>
      </div>
    </section>
  );
}
