import { ArrowRight, Clock, Heart, Leaf, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stats = [
  { icon: Clock, value: "7:00 AM", label: "Doors open daily" },
  { icon: Leaf, value: "100%", label: "Ethically sourced" },
  { icon: Star, value: "4.9", label: "Guest rating" },
  { icon: Heart, value: "Local", label: "Community first" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2B1E18] pt-20 text-[#FFFDFB]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,#B7793C_0%,transparent_38%),linear-gradient(90deg,#1f140f_0%,#2B1E18_42%,#5b341e_100%)]" />
      <div className="absolute inset-0 noise opacity-20" />

      <Container className="relative z-10 grid min-h-[calc(100vh-5rem)] items-center py-20">
        <div className="max-w-3xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
            Small-batch coffee. Big-hearted hospitality.
          </p>

          <h1 className="font-[var(--font-display)] text-6xl font-semibold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            Crafted coffee for slow,{" "}
            <span className="italic text-[#B7793C]">golden</span> mornings.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#F8F4EF]/80">
            Specialty coffee, fresh pastries, and a space that feels like home.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/menu"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#E5C7A1]/40 bg-[#B7793C]/25 px-8 text-sm font-semibold text-white backdrop-blur transition hover:bg-[#B7793C]/40"
            >
              Explore the Menu <ArrowRight className="ml-2" size={18} />
            </a>

            <a
              href="/about"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Our Story
            </a>
          </div>

          <div className="mt-10 grid max-w-4xl gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.value} className="flex items-start gap-3">
                <item.icon className="mt-1 text-[#E5C7A1]" size={20} />
                <div>
                  <p className="text-xl font-semibold text-[#E5C7A1]">{item.value}</p>
                  <p className="mt-1 text-sm text-white/70">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}