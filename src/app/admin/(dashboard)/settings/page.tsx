import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
        Shop Settings
      </p>
      <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
        Settings editor is next.
      </h1>
      <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
        The settings table is ready. The next sprint can move shop hours, phone, email, homepage promos, and social links from code into the database.
      </p>

      <div className="mt-10 rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
        <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
          <Settings size={26} />
        </div>
        <h2 className="font-[var(--font-display)] text-3xl font-semibold">
          Planned controls
        </h2>
        <div className="mt-6 grid gap-3 text-sm leading-6 text-[#4A342A]/75 sm:grid-cols-2">
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Shop hours</p>
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Phone and email</p>
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Homepage announcement</p>
          <p className="rounded-2xl bg-[#F8F4EF] p-4">Social links</p>
        </div>
      </div>
    </div>
  );
}
