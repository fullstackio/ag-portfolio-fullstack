import { SectionContainer } from '../layout/section-container';

import { skills } from '@/data/skills';
import { cn } from '@/lib/utils';

/** Presentational grouping of the existing tool list into the reference's "Tech Stack" categories. */
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
    <SectionContainer id="skills" className="relative overflow-hidden py-24 lg:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <span className="text-muted-foreground mb-6 inline-flex items-center gap-3 font-mono text-sm">
            <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
            What I do
          </span>
          <h2 className="font-heading mb-8 text-4xl tracking-tight lg:text-6xl">
            My Skills
            <br />
            &amp; Expertise.
          </h2>
          <p className="text-muted-foreground font-body mb-8 text-xl leading-relaxed">
            I am a versatile engineer specializing in scalable system architecture, production-grade
            applications, and seamless frontend experiences.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Specialties">
            {skills.slice(0, 5).map((skill) => (
              <li
                key={skill.name}
                className="bg-foreground/5 font-body rounded-full px-3 py-1 text-sm font-medium"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-foreground/10 bg-background overflow-hidden rounded-2xl border">
          <div className="border-foreground/10 bg-foreground/5 flex items-center justify-between border-b px-6 py-4">
            <span className="text-muted-foreground font-mono text-sm">Tech Stack</span>
            <div className="flex gap-1.5">
              <div className="bg-foreground/20 size-2.5 rounded-full" />
              <div className="bg-foreground/20 size-2.5 rounded-full" />
            </div>
          </div>
          <div>
            {SKILL_CATEGORIES.map((category, index) => (
              <div
                key={category.label}
                className={cn(
                  'border-foreground/5 flex flex-col justify-center border-b px-6 py-5 last:border-b-0',
                  index === 0 && 'bg-foreground/[0.03]',
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      'mt-2 size-2 shrink-0 rounded-full',
                      index === 0 ? 'bg-foreground' : 'bg-foreground/20',
                    )}
                  />
                  <div>
                    <div className="font-body text-lg font-semibold">{category.label}</div>
                    <div className="text-muted-foreground font-body mt-1 text-sm leading-relaxed">
                      {category.toolNames
                        .map((name) => byName.get(name)?.name)
                        .filter(Boolean)
                        .join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
