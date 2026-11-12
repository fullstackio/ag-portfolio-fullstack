'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Reveal } from '../motion/reveal';

import type { FaqItem } from '@/data/faq';

export function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delayMs={Math.min(30 * index, 300)} className="border-foreground/10 border-b">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="font-heading flex w-full items-center justify-between gap-6 py-6 text-left text-lg tracking-tight lg:text-xl"
      >
        {item.question}
        <Plus
          className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <p className="text-muted-foreground font-body min-h-0 max-w-3xl text-sm leading-relaxed lg:text-base">
          {item.answer}
        </p>
      </div>
    </Reveal>
  );
}
