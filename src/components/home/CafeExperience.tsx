import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function CafeExperience() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Inside Ember & Bean
            </p>

            <h2 className="mt-5 font-display text-6xl leading-tight">
              A quiet corner for conversation, work, and slow mornings.
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted">
              Warm walnut wood, soft morning light, leafy corners, and a bar
              designed around the rhythm of craft coffee.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
            <Image
              src="/images/cafe/interior.png"
              alt="Warm modern café interior"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}