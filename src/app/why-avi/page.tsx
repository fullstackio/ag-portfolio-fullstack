import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { WhyAviComparisonSection } from '@/components/sections/why-avi-comparison-section';
import { WhyAviCtaSection } from '@/components/sections/why-avi-cta-section';
import { WhyAviDifferentiatorsSection } from '@/components/sections/why-avi-differentiators-section';
import { WhyAviHeroSection } from '@/components/sections/why-avi-hero-section';
import { WhyAviHonestTakeSection } from '@/components/sections/why-avi-honest-take-section';
import { WhyAviProofSection } from '@/components/sections/why-avi-proof-section';

export const metadata: Metadata = {
  title: 'Why Avi',
  description:
    'Why hire Avi directly instead of a freelancer from Upwork, Fiverr, Toptal, Freelancer.com, or a GitHub search.',
};

export default function WhyAviPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <WhyAviHeroSection />
        <WhyAviDifferentiatorsSection />
        <WhyAviComparisonSection />
        <WhyAviHonestTakeSection />
        <WhyAviProofSection />
        <WhyAviCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
