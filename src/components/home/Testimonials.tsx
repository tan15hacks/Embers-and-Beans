import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="What Our Guests Say"
          title="Loved by our community."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[2rem] border border-[color:var(--border)] bg-background p-8 shadow-sm"
            >
              <div className="flex gap-1 text-secondary">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="mt-8 text-lg leading-8 text-foreground">
                “{item.quote}”
              </p>

              <div className="mt-10">
                <p className="font-semibold uppercase tracking-[0.18em]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-secondary">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}