import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { FaqCtaSection } from '@/components/sections/faq-cta-section';
import { FaqHeroSection } from '@/components/sections/faq-hero-section';
import { FaqListSection } from '@/components/sections/faq-list-section';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Quick answers about process, stack, and how collaborations usually work.',
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <FaqHeroSection />
        <FaqListSection />
        <FaqCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
