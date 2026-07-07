import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Leaf, Sparkles, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
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
    image: "/images/drinks/honey-oat-latte.jpg",
    imageAlt: "Honey oat latte in warm morning café light",
  },
  {
    year: "Midday",
    title: "Comfort between errands",
    text: "The counter fills with iced coffee, pastries, and the soft buzz of conversation.",
    image: "/images/contacts/counter.png",
    imageAlt: "Warm café counter with handcrafted coffee service",
  },
  {
    year: "Evening",
    title: "Warm lights, slower pace",
    text: "We end the day with cozy tables, gentle service, and drinks made to linger over.",
    image: "/images/contacts/seating.png",
    imageAlt: "Cozy Ember and Bean seating area in soft light",
  },
];

const teamNotes = [
  "Baristas who know the rhythm of a good morning.",
  "Bakers who keep the pastry counter simple, fresh, and comforting.",
  "Hosts who make every visit feel unhurried and familiar.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#2B1E18] pt-36 text-[#FFFDFB]">
        <Image
          src="/images/cafe/interior.png"
          alt="Warm Scandinavian café interior with natural light and artisan coffee atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f140f]/95 via-[#2B1E18]/75 to-[#2B1E18]/25" />
        <div className="absolute inset-0 noise opacity-15" />

        <Container className="relative z-10 grid gap-12 py-24 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <Reveal>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
                <Sparkles size={18} /> Our Story
              </p>
              <h1 className="mt-5 font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
                Coffee that feels like coming home.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F8F4EF]/75">
                Ember & Bean was built around a simple belief: coffee should be more than a quick stop. It should feel like a pause, a ritual, and a warm corner in the middle of a busy day.
              </p>
              <Link
                href="/menu"
                className="mt-10 inline-flex h-14 items-center justify-center rounded-full border border-[#E5C7A1]/30 bg-[#F8F4EF] px-8 text-sm font-semibold text-[#2B1E18] transition hover:bg-[#E5C7A1]"
              >
                Explore the Menu <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-[2.5rem] border border-[#F8F4EF]/15 bg-[#FFFDFB]/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-md">
              <div className="relative h-80 overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/contacts/counter.png"
                  alt="Artisan coffee counter at Ember and Bean"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E18]/80 via-transparent to-transparent" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
                Ember & Bean Coffee Co.
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-4xl font-semibold leading-tight">
                Slow mornings, golden cups, familiar faces.
              </h2>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#2B1E18] py-24 text-[#F8F4EF]">
        <div className="absolute inset-0 noise opacity-10" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
                What Guides Us
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
                Warmth in every detail.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {values.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
                  <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/20 text-[#E5C7A1]">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-[var(--font-display)] text-3xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[#F8F4EF]/70">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#FFFDFB] py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
                  Daily Rhythm
                </p>
                <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-[0.98] md:text-7xl">
                  Made for every part of your day.
                </h2>
                <p className="mt-6 max-w-md leading-8 text-[#4A342A]/75">
                  From the first espresso of the morning to the last conversation before close, the shop is designed to feel calm, generous, and intentional.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="grid overflow-hidden rounded-[2rem] border border-[#2B1E18]/10 bg-[#F8F4EF] shadow-[0_20px_80px_rgba(43,30,24,0.06)] md:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-72 md:min-h-full">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8 sm:p-10">
                      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B7793C]">
                        {item.year}
                      </p>
                      <h3 className="mt-3 font-[var(--font-display)] text-4xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-4 leading-7 text-[#4A342A]/70">{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] bg-[#2B1E18] text-[#FFFDFB] shadow-[0_30px_100px_rgba(43,30,24,0.18)]">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-8 sm:p-12 lg:p-14">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
                    The People
                  </p>
                  <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
                    A small team with a careful hand.
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-[#F8F4EF]/75">
                    Behind every cup is a team focused on consistency, kindness, and the quiet details that make a café feel memorable.
                  </p>

                  <div className="mt-10 grid gap-4">
                    {teamNotes.map((note) => (
                      <div
                        key={note}
                        className="rounded-2xl border border-[#F8F4EF]/10 bg-white/[0.06] p-5 text-[#F8F4EF]/80"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[420px]">
                  <Image
                    src="/images/hero/hero-cafe.png"
                    alt="Warm Ember and Bean café space with espresso bar and morning light"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E18]/55 via-transparent to-transparent lg:bg-gradient-to-r" />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
