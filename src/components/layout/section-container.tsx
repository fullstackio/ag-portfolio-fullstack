import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function SectionContainer({
  children,
  className,
  as: Component = 'section',
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div';
  id?: string;
}) {
  return (
    <Component id={id} className={cn('mx-auto w-full max-w-[1400px] px-6 lg:px-12', className)}>
      {children}
    </Component>
  );
}
