import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Reveal } from "@/components/shared/Reveal";
import { featuredDrinks } from "@/data/menu";

export function FeaturedCoffee() {
  return (
    <section className="bg-[#FFFDFB] py-28 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
                House Favorites
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-[0.95] text-[#2B1E18] md:text-7xl">
                Signature sips,<br /> made slowly.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-[#4A342A]/75">
              Every drink begins with carefully roasted beans, warm service, and a sense of ritual.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {featuredDrinks.map((drink, index) => (
            <Reveal key={drink.name} delay={index * 0.06}>
              <ProductCard
                name={drink.name}
                description={drink.description}
                price={drink.price}
                image={drink.image}
                imageAlt={drink.imageAlt}
                priority={index === 0}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
