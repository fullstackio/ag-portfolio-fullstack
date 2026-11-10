export function TechnologyTags({ technologies }: { technologies: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {technologies.map((tech) => (
        <li
          key={tech}
          className="border-border bg-surface text-foreground/70 font-body rounded-full border px-3 py-1 text-xs"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
