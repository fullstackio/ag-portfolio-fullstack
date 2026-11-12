import { SectionContainer } from '../layout/section-container';

import { FaqAccordionItem } from './faq-accordion-item';

import { faqItems } from '@/data/faq';

export function FaqListSection() {
  return (
    <SectionContainer as="div" className="pb-24 lg:pb-32">
      <div className="border-foreground/10 border-t">
        {faqItems.map((item, index) => (
          <FaqAccordionItem key={item.question} item={item} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}
