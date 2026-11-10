import { SectionContainer } from '../layout/section-container';

import { skills } from '@/data/skills';

/** Presentational grouping of the existing tool list into the mockup's "Tech Stack" categories. */
const SKILL_CATEGORIES: { label: string; toolNames: string[] }[] = [
  { label: 'Frontend Engineering', toolNames: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
  { label: 'Backend & Systems', toolNames: ['Node.js', 'NestJS'] },
  { label: 'Databases & Caching', toolNames: ['MongoDB'] },
  { label: 'Cloud & DevOps', toolNames: ['Docker', 'AWS', 'GitHub'] },
  { label: 'Core Tools', toolNames: ['WordPress', 'Figma'] },
];

export function SkillsSection() {
  const byName = new Map(skills.map((skill) => [skill.name, skill]));

  return (
    <SectionContainer id="skills" className="py-20 md:py-28">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-muted-foreground font-mono text-xs">—</span>
        <span className="text-muted-foreground font-mono text-xs tracking-wide">What I Do</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl leading-tight font-medium sm:text-4xl">
            My Skills
            <br />
            <span className="text-primary">&amp; Expertise.</span>
          </h2>
          <p className="text-muted-foreground font-body mt-5 max-w-md text-[15px] leading-relaxed">
            I am a versatile engineer specializing in scalable system architecture, production-grade
            applications, and seamless frontend experiences.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Specialties">
            {skills.slice(0, 5).map((skill) => (
              <li
                key={skill.name}
                className="border-border bg-surface text-foreground/70 font-body rounded-full border px-3 py-1 text-xs"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-xl border border-black/80 bg-[#0e0d0c] text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-mono text-xs text-white/50">Tech Stack</span>
            <span className="font-mono text-xs text-white/30">×</span>
          </div>
          <ul className="divide-y divide-white/10">
            {SKILL_CATEGORIES.map((category, index) => (
              <li key={category.label} className="px-5 py-4">
                <p
                  className={
                    index === 1
                      ? 'font-body text-sm font-semibold text-white'
                      : 'font-body text-sm text-white/70'
                  }
                >
                  {category.label}
                </p>
                <p className="mt-1.5 font-mono text-xs text-white/40">
                  {category.toolNames
                    .map((name) => byName.get(name)?.name)
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
