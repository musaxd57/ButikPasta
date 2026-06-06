import Section from '@/components/ui/Section';
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="pt-24">
      <Section tone="ivory">
        <div className="mx-auto mb-10 h-9 w-56 animate-pulse rounded-lg bg-charcoal/10" />
        <SkeletonGrid count={6} />
      </Section>
    </div>
  );
}
