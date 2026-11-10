import Image from 'next/image';

import type { Project } from '@/types/project';

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="border-border bg-surface overflow-hidden rounded-xl border">
      <Image
        src={project.previewImage.src}
        alt={project.previewImage.alt}
        width={project.previewImage.width}
        height={project.previewImage.height}
        className="h-auto w-full"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    </div>
  );
}
