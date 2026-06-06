import Section from '@/components/ui/Section';
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function GalleryLoading() {
  return (
    <div className="pt-24">
      <Section tone="ivory">
        <div className="mx-auto mb-10 h-10 w-48 animate-pulse rounded-lg bg-charcoal/10" />
        <SkeletonGrid count={9} />
      </Section>
    </div>
  );
}
