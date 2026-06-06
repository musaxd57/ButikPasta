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
import JsonLd, { organizationSchema, websiteSchema } from '@/components/seo/JsonLd';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return (
    <>
      <JsonLd data={organizationSchema(siteUrl)} />
      <JsonLd data={websiteSchema(siteUrl)} />
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
