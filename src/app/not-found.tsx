import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#2B1E18] text-[#FFFDFB]">
      <Container className="flex min-h-screen flex-col justify-between py-10">
        <Logo light />

        <section className="max-w-3xl py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
            404 · Page not found
          </p>
          <h1 className="mt-6 font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            This cup is not on the menu.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#F8F4EF]/75">
            The page may have moved, or the link may be incorrect. Let’s get you back to a warmer place.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full border border-[#E5C7A1]/30 bg-[#F8F4EF] px-8 text-sm font-semibold text-[#2B1E18] transition hover:bg-[#E5C7A1]"
          >
            <ArrowLeft className="mr-2" size={18} /> Back home
          </Link>
        </section>

        <p className="text-sm text-[#F8F4EF]/45">© 2026 Ember & Bean Coffee Co.</p>
      </Container>
    </main>
  );
}
