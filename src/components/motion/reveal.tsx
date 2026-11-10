'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const DIRECTION_CLASS: Record<'up' | 'left' | 'right', string> = {
  up: 'translate-y-10',
  left: '-translate-x-8',
  right: 'translate-x-8',
};

/**
 * Fades/slides children in the first time they scroll into view, matching the reference site's
 * per-section reveal (IntersectionObserver, threshold 0.15, disconnects after first trigger).
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delayMs = 0,
  as: Component = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delayMs?: number;
  as?: 'div' | 'span';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `opacity-0 ${DIRECTION_CLASS[direction]}`,
        className,
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </Component>
  );
}
