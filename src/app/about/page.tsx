import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="relative h-[70vh] min-h-[560px] overflow-hidden">
        <Image
          src="/images/about/about-hero.png"
          alt="Barista crafting latte art"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1F140F]/90 via-[#2B1E18]/70 to-transparent" />

        <Container className="relative flex h-full items-center">
          <div className="max-w-2xl text-white">
            <p className="uppercase tracking-[0.3em] text-accent font-semibold">
              Our Story
            </p>

            <h1 className="mt-6 font-display text-6xl md:text-8xl leading-tight">
              Coffee made with intention.
            </h1>

            <p className="mt-8 text-xl leading-9 text-white/80">
              Ember & Bean began with a simple belief:
              great coffee should slow your day down,
              not speed it up.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-4xl">
          <h2 className="font-display text-5xl">
            More than a coffee shop.
          </h2>

          <p className="mt-8 text-lg leading-9 text-muted">
            Every drink is prepared with care, every pastry is baked fresh,
            and every guest is welcomed like a regular. Our goal isn't simply
            to serve coffee—it's to create a place where mornings feel a little
            slower and conversations last a little longer.
          </p>
        </Container>
      </section>
        <section className="bg-primary py-24 text-primary-foreground">
            <Container>
                <div className="grid gap-8 md:grid-cols-3">
                {[
                    {
                    title: "Sourced with care",
                    text: "We choose beans from ethical growers and roasters who value quality, sustainability, and long-term relationships.",
                    },
                    {
                    title: "Roasted for warmth",
                    text: "Our coffee profile leans rich, smooth, and balanced — made for comforting daily rituals.",
                    },
                    {
                    title: "Served with heart",
                    text: "Hospitality is part of the recipe. Every guest should feel noticed, welcomed, and at home.",
                    },
                ].map((item) => (
                    <article
                    key={item.title}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8"
                    >
                    <h3 className="font-display text-3xl font-semibold">
                        {item.title}
                    </h3>
                    <p className="mt-4 leading-7 text-primary-foreground/70">
                        {item.text}
                    </p>
                    </article>
                ))}
                </div>
            </Container>
            </section>
      <Footer />
    </main>
  );
}