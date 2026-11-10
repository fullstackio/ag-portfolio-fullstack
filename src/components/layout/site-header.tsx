'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ThemeToggle } from './theme-toggle';

import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed z-50 transition-all duration-500',
        isScrolled ? 'top-4 right-4 left-4' : 'top-0 right-0 left-0',
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto transition-all duration-500',
          isScrolled || isMenuOpen
            ? 'bg-background/80 border-foreground/10 max-w-[1200px] rounded-2xl border shadow-lg backdrop-blur-xl'
            : 'max-w-[1400px] bg-transparent',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between px-6 transition-all duration-500 lg:px-8',
            isScrolled ? 'h-14' : 'h-20',
          )}
        >
          <Link
            href="#top"
            className={cn(
              'font-heading tracking-tight transition-all duration-500',
              isScrolled ? 'text-xl' : 'text-2xl',
            )}
          >
            Avijit Ghosh
          </Link>

          <div className="hidden items-center gap-12 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-foreground group font-body relative text-sm transition-colors duration-300"
              >
                {link.label}
                <span className="bg-foreground absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href="#contact"
              className={cn(
                'bg-foreground text-background hover:bg-foreground/90 font-body inline-flex h-8 items-center justify-center rounded-full font-medium transition-all duration-500',
                isScrolled ? 'px-4 text-xs' : 'px-6 text-sm',
              )}
            >
              Get in touch
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen ? (
        <div
          id="mobile-nav"
          className="bg-background fixed inset-0 top-20 z-40 flex flex-col px-8 pt-12 pb-8 md:hidden"
        >
          <div className="flex flex-1 flex-col justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-foreground hover:text-muted-foreground text-5xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-foreground/10 flex gap-4 border-t pt-8">
            <Link
              href="#contact"
              className="bg-foreground text-background font-body flex-1 rounded-full py-3.5 text-center text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
