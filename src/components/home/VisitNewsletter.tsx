import Link from "next/link";
import { MapPin, Clock3, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { siteConfig } from "@/data/site";

export function VisitNewsletter() {
  return (
    <Section className="bg-primary py-16 text-primary-foreground">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-4 lg:items-center">
            <div className="flex gap-4">
              <MapPin className="mt-1 text-secondary" />
              <div>
                <h3 className="font-semibold uppercase tracking-[0.18em]">
                  Visit
                </h3>
                <p className="mt-2 text-primary-foreground/70">
                  {siteConfig.location}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock3 className="mt-1 text-secondary" />
              <div>
                <h3 className="font-semibold uppercase tracking-[0.18em]">
                  Hours
                </h3>
                <p className="mt-2 text-primary-foreground/70">
                  {siteConfig.hours}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="mt-1 text-secondary" />
              <div>
                <h3 className="font-semibold uppercase tracking-[0.18em]">
                  Stay in the Loop
                </h3>
                <p className="mt-2 text-primary-foreground/70">
                  New drinks, seasonal menus, and special events.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-7 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Contact the Shop
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
