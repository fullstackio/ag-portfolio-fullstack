import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { WorkCtaSection } from '@/components/sections/work-cta-section';
import { WorkHeroSection } from '@/components/sections/work-hero-section';
import { WorkProjectsGridSection } from '@/components/sections/work-projects-grid-section';

export const metadata: Metadata = {
  title: 'My Work',
  description:
    'A collection of production applications, service platforms, and performance-focused websites built by Avijit Ghosh.',
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <WorkHeroSection />
        <WorkProjectsGridSection />
        <WorkCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
