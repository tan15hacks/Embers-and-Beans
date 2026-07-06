import { Container } from "@/components/layout/Container";
import { team } from "@/data/team";

export function TeamSection() {
  return (
    <section className="bg-background py-24">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Meet the Team
          </p>

          <h2 className="mt-5 font-display text-5xl md:text-6xl">
            The faces behind your favorite coffee.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted">
            We're a small team with big hearts and a shared love for
            great coffee, warm hospitality, and thoughtful craftsmanship.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-surface"
            >
              <div className="aspect-square bg-gradient-to-br from-[#E5C7A1] via-[#B7793C] to-[#4A342A]" />

              <div className="p-6">
                <h3 className="font-display text-3xl">
                  {member.name}
                </h3>

                <p className="mt-2 text-secondary">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}