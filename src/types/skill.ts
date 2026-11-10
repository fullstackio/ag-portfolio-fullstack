import type { ComponentType } from 'react';

export interface Skill {
  name: string;
  /** Accepts both react-icons and lucide-react components — their prop shapes are compatible enough. */
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  /** Tailwind text-color utility applied to the icon, matching the mockup's per-brand colors. */
  iconColorClassName?: string;
}
