import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { BlogsGridSection } from '@/components/sections/blogs-grid-section';
import { BlogsHeroSection } from '@/components/sections/blogs-hero-section';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'A deep dive into my process, technical decisions, and the outcomes of my recent projects.',
};

export default function BlogsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <BlogsHeroSection />
        <BlogsGridSection />
      </main>
      <SiteFooter />
    </>
  );
}
