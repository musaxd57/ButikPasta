'use client';

import { useEffect } from 'react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">Atelier Cake</p>
      <h1 className="mt-4 font-serif text-4xl text-charcoal">
        Bir şeyler ters gitti
      </h1>
      <p className="mt-3 text-charcoal/60">Something went wrong.</p>
      <button onClick={reset} className="btn-gold mt-8">
        Tekrar Dene
      </button>
    </div>
  );
}
