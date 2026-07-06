import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function FreshlyBaked() {
  return (
    <Section className="bg-[#FFFDFB]">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/pastries/croissant.jpg"
              alt="Fresh butter croissant"
              width={900}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Fresh Every Morning
            </p>

            <h2 className="mt-5 font-display text-6xl leading-tight">
              Baked before the first cup is poured.
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted">
              Every morning begins before sunrise with pastries prepared fresh
              for the day's first guests—from buttery croissants to seasonal
              morning buns.
            </p>

            <div className="mt-10">
              <Button href="/menu">
                See Today's Bakery
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}