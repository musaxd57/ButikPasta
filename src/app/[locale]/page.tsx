import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import {
  BrandStory,
  FeaturedCarousel,
  InstaGrid,
  Testimonials,
} from '@/components/home/Sections';

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
      <FeaturedCarousel />
      <InstaGrid />
      <Testimonials />
    </>
  );
}
