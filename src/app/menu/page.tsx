import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { featuredDrinks, pastries } from "@/data/menu";

const menuItems = [
  ...featuredDrinks.map((item) => ({
    name: item.name,
    description: item.description,
    price: item.price,
    category: "Coffee",
  })),
  ...pastries.map((name) => ({
    name,
    description: "Freshly baked in-house every morning.",
    price: "$4.50",
    category: "Bakery",
  })),
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="bg-primary pt-32 text-primary-foreground">
        <Container className="py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Made with care. Served with heart.
          </p>
          <h1 className="mt-5 font-display text-7xl font-semibold md:text-8xl">
            Our Menu
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">
            Thoughtfully crafted drinks and fresh baked goods made with quality
            ingredients and a passion for exceptional coffee.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <article
                key={item.name}
                className="rounded-[2rem] border border-[color:var(--border)] bg-surface p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {item.category}
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold">
                  {item.name}
                </h2>
                <p className="mt-3 leading-7 text-muted/80">
                  {item.description}
                </p>
                <p className="mt-6 text-lg font-bold text-secondary">
                  {item.price}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}