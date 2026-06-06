import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import {
  BrandStory,
  FeaturedCarousel,
  InstaGrid,
  Testimonials,
} from '@/components/home/Sections';
import {
  ProcessSection,
  IngredientsSection,
  StatsSection,
  WhyUsSection,
  NewsletterSection,
} from '@/components/home/MoreSections';
import CtaBand from '@/components/marketing/CtaBand';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);

  return (
    <>
      <Hero />
      <BrandStory />
      <ProcessSection />
      <FeaturedCarousel />
      <IngredientsSection />
      <StatsSection />
      <WhyUsSection />
      <InstaGrid />
      <Testimonials />
      <NewsletterSection />
      <CtaBand />
    </>
  );
}
