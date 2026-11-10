'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ThemeToggle } from './theme-toggle';

import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-border/60 bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="#top" className="font-heading text-sm font-medium">
          Avijit Ghosh
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 hover:text-foreground font-body text-xs transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full">
            <Link href="#contact">
              Get in touch
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-border/60 bg-background flex flex-col gap-1 border-t px-6 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-foreground/70 hover:text-foreground py-2 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="mt-2 w-fit rounded-full">
            <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
              Get in touch
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
