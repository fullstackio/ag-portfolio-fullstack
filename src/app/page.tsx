import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { FeaturedProjectsSection } from '@/components/sections/featured-projects-section';
import { HeroSection } from '@/components/sections/hero-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { WorkExperienceSection } from '@/components/sections/work-experience-section';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <HeroSection />
        <FeaturedProjectsSection />
        <WorkExperienceSection />
        <SkillsSection />
      </main>
      <SiteFooter />
    </>
  );
}
