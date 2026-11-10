import Image from 'next/image';

import type { Project } from '@/types/project';

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="border-foreground/10 group-hover:border-foreground/30 relative aspect-video w-full overflow-hidden rounded-2xl border shadow-lg transition-all duration-500">
      <Image
        src={project.previewImage.src}
        alt={project.previewImage.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}
