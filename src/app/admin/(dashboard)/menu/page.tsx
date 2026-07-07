import { Coffee } from "lucide-react";

export default function AdminMenuPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
        Menu Manager
      </p>
      <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
        Menu editing is next.
      </h1>
      <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
        The database table is ready. The next sprint will add create, edit, activate, feature, and delete controls for drinks, pastries, and seasonal items.
      </p>

      <div className="mt-10 rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
        <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
          <Coffee size={26} />
        </div>
        <h2 className="font-[var(--font-display)] text-3xl font-semibold">
          Planned controls
        </h2>
        <div className="mt-6 grid gap-3 text-sm leading-6 text-[#4A342A]/75 sm:grid-cols-2">
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Add menu item</p>
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Edit name, description, price</p>
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Mark as featured</p>
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Hide or show item</p>
        </div>
      </div>
    </div>
  );
}
