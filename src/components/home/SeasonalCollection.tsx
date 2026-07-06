import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seasonalDrinks } from "@/data/seasonal";

export function SeasonalCollection() {
  return (
    <Section className="bg-background">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Seasonal Collection"
            title="Limited pours for the season."
            description="A rotating menu inspired by warm spices, golden mornings, and slow café rituals."
            align="center"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {seasonalDrinks.map((drink, index) => (
            <Reveal key={drink.name} delay={index * 0.06}>
              <article className="group h-full overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-accent">
                  <Image
                    src={drink.image}
                    alt={drink.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-primary/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground backdrop-blur">
                    {drink.tag}
                  </span>
                </div>

                <div className="p-3 pt-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-3xl font-semibold leading-tight">
                      {drink.name}
                    </h3>
                    <p className="rounded-full bg-background px-4 py-2 text-sm font-bold text-secondary">
                      {drink.price}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted/80">
                    {drink.notes}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
