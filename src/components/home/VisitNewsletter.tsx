import { MapPin, Clock3, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function VisitNewsletter() {
  return (
    <Section className="bg-primary text-primary-foreground py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-4 lg:items-center">

          <div className="flex gap-4">
            <MapPin className="mt-1 text-secondary" />
            <div>
              <h3 className="font-semibold uppercase tracking-[0.18em]">
                Visit
              </h3>
              <p className="mt-2 text-primary-foreground/70">
                123 Maple Street
                <br />
                Vancouver, BC
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
                Mon–Fri · 7AM–6PM
                <br />
                Sat–Sun · 8AM–6PM
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

          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 outline-none placeholder:text-white/50"
            />

            <button
              className="h-12 rounded-full bg-secondary px-7 font-semibold text-white transition hover:opacity-90"
            >
              Subscribe
            </button>
          </form>

        </div>
      </Container>
    </Section>
  );
}