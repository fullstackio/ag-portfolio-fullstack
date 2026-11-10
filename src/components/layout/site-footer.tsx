import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { CopyrightYear } from './copyright-year';
import { SectionContainer } from './section-container';

const BUILD_YEAR = new Date().getFullYear();

/**
 * Real social URLs are not yet supplied by the owner (docs/tasks.md "Open questions").
 * `href="#"` is a visible placeholder rather than a working destination — replace once
 * confirmed.
 */
const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'YouTube', href: '#' },
];

export function SiteFooter() {
  return (
    <footer className="border-foreground/10 relative border-t" id="contact">
      <SectionContainer className="flex flex-col items-center py-16 text-center lg:py-24">
        <div className="mb-6 flex flex-col items-center gap-4">
          <span
            className="border-foreground/10 bg-surface font-heading flex size-20 items-center justify-center rounded-full border text-xl"
            aria-hidden="true"
          >
            AG
          </span>
          <p className="font-heading mt-2 text-3xl">Avijit Ghosh</p>
        </div>
        <p className="text-muted-foreground font-body mb-8 max-w-md text-xl leading-relaxed">
          Software Engineer
        </p>

        <nav aria-label="Social media links">
          <ul className="flex list-none justify-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  className="text-foreground/70 hover:text-foreground group font-body flex items-center gap-1 text-sm transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SectionContainer>

      <SectionContainer className="border-foreground/10 flex flex-col items-center justify-between gap-4 border-t py-8 md:flex-row">
        <p className="text-muted-foreground font-body text-sm">
          ©{' '}
          <Suspense fallback={BUILD_YEAR}>
            <CopyrightYear />
          </Suspense>{' '}
          Avijit Ghosh. All rights reserved.
        </p>
        <span className="text-muted-foreground font-body flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-green-500" aria-hidden="true" />
          Open to new projects
        </span>
      </SectionContainer>
    </footer>
  );
}
