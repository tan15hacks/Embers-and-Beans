export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F8F4EF] text-[#2B1E18]">
      <div className="text-center">
        <div className="mx-auto mb-6 size-12 animate-spin rounded-full border border-[#2B1E18]/10 border-t-[#B7793C]" />
        <p className="font-[var(--font-display)] text-4xl font-semibold">Ember & Bean</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-[#B7793C]">
          Brewing the page
        </p>
      </div>
    </main>
  );
}
