import Section from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';

export default function JournalLoading() {
  return (
    <div className="pt-24">
      <Section tone="ivory">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
              <Skeleton className="mt-4 h-3 w-1/3" />
              <Skeleton className="mt-2 h-5 w-3/4" />
              <Skeleton className="mt-2 h-3 w-full" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
