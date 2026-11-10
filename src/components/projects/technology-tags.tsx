export function TechnologyTags({ technologies }: { technologies: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {technologies.map((tech) => (
        <li
          key={tech}
          className="bg-foreground/5 border-foreground/10 text-foreground/80 rounded-md border px-2.5 py-1 font-mono text-xs"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
