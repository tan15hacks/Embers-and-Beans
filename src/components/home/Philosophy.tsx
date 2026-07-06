import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Leaf, Flame, Users } from "lucide-react";

const values = [
  {
    icon: Flame,
    title: "Roasted with intention",
    text: "Small batches let us highlight the depth, sweetness, and character of every bean.",
  },
  {
    icon: Leaf,
    title: "Sourced responsibly",
    text: "We work with ethical suppliers who care about growers, land, and long-term quality.",
  },
  {
    icon: Users,
    title: "Built for community",
    text: "A warm neighborhood space for slow mornings, thoughtful work, and good conversation.",
  },
];

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-[#2B1E18] py-28 text-[#F8F4EF]">
      <div className="absolute inset-0 noise opacity-10" />

      <Container className="relative">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
                Our Philosophy
              </p>

              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
                Coffee should feel personal.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-[#F8F4EF]/75">
              Ember & Bean was created for people who believe coffee is more than caffeine.
              It is a ritual, a pause, a conversation, and sometimes the best part of the day.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
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
  );
}
