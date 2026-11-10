import { ExperienceTerminal } from '../experience/experience-terminal';
import { ExperienceTimeline } from '../experience/experience-timeline';
import { SectionContainer } from '../layout/section-container';

import { experienceEntries, experienceLogLines } from '@/data/experience';

export function WorkExperienceSection() {
  const current = experienceEntries.find((entry) => entry.current);

  return (
    <div id="experience" className="bg-[#0e0d0c] py-20 text-white md:py-28">
      <SectionContainer>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-white/40">—</span>
              <span className="font-mono text-xs tracking-wide text-white/40">Experience</span>
            </div>
            <h2 className="font-heading text-3xl font-medium text-white sm:text-4xl">
              Work Experience
            </h2>

            <div className="mt-8">
              <ExperienceTimeline entries={experienceEntries} />
            </div>
          </div>

          <div className="md:pt-24">
            <ExperienceTerminal lines={experienceLogLines} currentPosition={current?.role ?? ''} />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
