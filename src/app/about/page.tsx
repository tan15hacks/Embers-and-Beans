import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Leaf, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn the story, values, and daily rhythm behind ${siteConfig.name}.`,
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    icon: Flame,
    title: "Small-batch craft",
    text: "We roast and brew with patience, keeping every cup balanced, warm, and personal.",
  },
  {
    icon: Leaf,
    title: "Thoughtful sourcing",
    text: "Our menu is shaped by quality ingredients, careful suppliers, and a respect for everyday rituals.",
  },
  {
    icon: Users,
    title: "Community warmth",
    text: "Ember & Bean is made for slow mornings, thoughtful work, friendly catchups, and familiar faces.",
  },
];

const timeline = [
  {
    year: "Morning",
    title: "Fresh brews and quiet starts",
    text: "Doors open early for guests who want a peaceful cup before the day gets loud.",
  },
  {
    year: "Midday",
    title: "Comfort between errands",
    text: "The counter fills with iced coffee, pastries, and the soft buzz of conversation.",
  },
  {
    year: "Evening",
    title: "Warm lights, slower pace",
    text: "We end the day with cozy tables, gentle service, and drinks made to linger over.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#FFFDFB] pt-36">
        <Container className="grid gap-12 py-24 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
              Our Story
            </p>
            <h1 className="mt-5 font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
              Coffee that feels like coming home.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4A342A]/75">
              Ember & Bean was built around a simple belief: coffee should be more than a quick stop. It should feel like a pause, a ritual, and a warm corner in the middle of a busy day.
            </p>
            <Link
              href="/menu"
              className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#2B1E18] px-8 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
            >
              Explore the Menu <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-[#2B1E18] p-8 text-[#FFFDFB] shadow-[0_30px_100px_rgba(43,30,24,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,#B7793C_0%,transparent_35%),linear-gradient(145deg,#2B1E18_0%,#4A342A_55%,#1f140f_100%)]" />
            <div className="absolute inset-0 noise opacity-20" />
            <div className="relative flex h-full flex-col justify-end">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
                Ember & Bean Coffee Co.
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight">
                Slow mornings, golden cups, familiar faces.
              </h2>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#2B1E18] py-24 text-[#F8F4EF]">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur"
              >
                <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/20 text-[#E5C7A1]">
                  <item.icon size={24} />
                </div>
                <h2 className="font-[var(--font-display)] text-3xl font-semibold">
                  {item.title}
                </h2>
                <p className="mt-4 leading-7 text-[#F8F4EF]/70">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
                Daily Rhythm
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold md:text-7xl">
                Made for every part of your day.
              </h2>
            </div>

            <div className="space-y-5">
              {timeline.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_20px_80px_rgba(43,30,24,0.06)]"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B7793C]">
                    {item.year}
                  </p>
                  <h3 className="mt-3 font-[var(--font-display)] text-4xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#4A342A]/70">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
