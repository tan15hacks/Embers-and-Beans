import { Container } from "@/components/layout/Container";
import { featuredDrinks } from "@/data/menu";

export function FeaturedCoffee() {
  return (
    <section className="bg-[#FFFDFB] py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
              House Favorites
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-5xl font-semibold text-[#2B1E18] md:text-7xl">
              Signature sips,
              <br /> made slowly.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-[#4A342A]/75">
            Our menu changes with the season, but every drink begins with carefully
            roasted beans and thoughtful craft.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {featuredDrinks.map((drink) => (
            <article
              key={drink.name}
              className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#F8F4EF] p-8 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(43,30,24,0.1)]"
            >
              <div className="mb-8 h-56 rounded-[1.5rem] bg-gradient-to-br from-[#E5C7A1] via-[#B7793C] to-[#2B1E18]" />
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-[var(--font-display)] text-3xl font-semibold">
                  {drink.name}
                </h3>
                <span className="rounded-full bg-[#2B1E18] px-4 py-2 text-sm font-semibold text-[#FFFDFB]">
                  {drink.price}
                </span>
              </div>
              <p className="mt-4 leading-7 text-[#4A342A]/75">{drink.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}