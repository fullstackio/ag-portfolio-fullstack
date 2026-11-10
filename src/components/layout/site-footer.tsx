import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { SiGithub, SiX, SiYoutube } from 'react-icons/si';

import { CopyrightYear } from './copyright-year';
import { SectionContainer } from './section-container';

const BUILD_YEAR = new Date().getFullYear();

/**
 * Real social URLs are not yet supplied by the owner (docs/tasks.md "Open questions").
 * `href="#"` is a visible placeholder rather than a working destination — replace once
 * confirmed. LinkedIn uses lucide-react's icon (deprecated upstream but functional) since
 * the installed simple-icons bundle ships no LinkedIn mark.
 */
const SOCIAL_LINKS = [
  { label: 'GitHub', href: '#', icon: SiGithub },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'YouTube', href: '#', icon: SiYoutube },
  { label: 'X (Twitter)', href: '#', icon: SiX },
];

const FOOTER_NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
];

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <SectionContainer className="flex flex-col items-center gap-5 py-16 text-center">
        <Link
          href="#top"
          className="border-border bg-surface font-heading flex size-12 items-center justify-center rounded-full border text-sm font-medium"
        >
          AG
        </Link>
        <div>
          <p className="font-body text-base font-medium">Avijit Ghosh</p>
          <p className="text-muted-foreground font-body mt-1 text-sm">Software Engineer</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <social.icon className="size-5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="border-border flex flex-col items-center justify-between gap-2 border-t py-6 sm:flex-row">
        <p className="text-muted-foreground font-body text-xs">
          ©{' '}
          <Suspense fallback={BUILD_YEAR}>
            <CopyrightYear />
          </Suspense>{' '}
          Avijit Ghosh. All rights reserved.
        </p>
        <span className="flex items-center gap-1.5">
          <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
          <span className="text-muted-foreground font-mono text-xs">Open to new projects</span>
        </span>
      </SectionContainer>
    </footer>
  );
}
