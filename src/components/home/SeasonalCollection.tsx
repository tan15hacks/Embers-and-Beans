import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seasonalDrinks } from "@/data/seasonal";

export function SeasonalCollection() {
  return (
    <Section className="bg-background">
      <Container>
        <SectionHeading
          eyebrow="Seasonal Collection"
          title="Limited pours for the season."
          description="A rotating menu inspired by warm spices, golden mornings, and slow café rituals."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {seasonalDrinks.map((drink) => (
            <article
              key={drink.name}
              className="group overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-72 rounded-[1.5rem] bg-gradient-to-br from-accent via-secondary to-primary">
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
          ))}
        </div>
      </Container>
    </Section>
  );
}