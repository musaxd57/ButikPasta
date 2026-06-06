// Global 404 — renders within the root layout's <html>/<body>.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6 text-center text-ivory">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">404</p>
      <h1 className="mt-4 font-serif text-5xl">Sayfa Bulunamadı</h1>
      <p className="mt-3 text-ivory/60">Page not found</p>
      <a href="/" className="btn-gold mt-8">
        Atelier Cake
      </a>
    </main>
  );
}
