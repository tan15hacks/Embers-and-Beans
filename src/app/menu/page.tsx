import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Reveal } from "@/components/shared/Reveal";
import {
  featuredDrinks as staticFeaturedDrinks,
  menuSections,
  type MenuItem,
  type MenuSection,
} from "@/data/menu";
import { siteConfig } from "@/data/site";
import { getPrisma } from "@/lib/db";
import { normalizePesoInput } from "@/lib/money";

export const metadata: Metadata = {
  title: "Menu",
  description: `Explore signature coffee, classic brews, chilled favorites, and pastries from ${siteConfig.name}.`,
  alternates: {
    canonical: "/menu",
  },
};

export const dynamic = "force-dynamic";

const staticMenuCategories = menuSections.filter(
  (section) => section.title !== "Signature Sips",
);

const categoryDetails: Record<string, Pick<MenuSection, "eyebrow" | "description">> = {
  "Signature Sips": {
    eyebrow: "House Favorites",
    description: "Coffee-forward drinks with the warm, slow-crafted Ember & Bean character.",
  },
  Seasonal: {
    eyebrow: "Limited Pour",
    description: "Seasonal drinks and short-run specials from the café counter.",
  },
  Pastries: {
    eyebrow: "Fresh From The Counter",
    description: "Simple, comforting bakes that pair beautifully with every cup.",
  },
  "Coffee Bar": {
    eyebrow: "Daily Rituals",
    description: "Comforting espresso and brewed coffee staples for everyday visits.",
  },
  "Non-Coffee": {
    eyebrow: "Beyond Espresso",
    description: "Smooth, cozy drinks for guests taking a break from coffee.",
  },
};

type PublicMenuData = {
  featuredDrinks: MenuItem[];
  menuCategories: MenuSection[];
  source: "database" | "static";
};

async function getPublicMenuData(): Promise<PublicMenuData> {
  try {
    const prisma = getPrisma();
    const items = await prisma.menuItem.findMany({
      where: {
        active: true,
      },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (items.length === 0) {
      return {
        featuredDrinks: staticFeaturedDrinks,
        menuCategories: staticMenuCategories,
        source: "static",
      };
    }

    const mappedItems = items.map((item) => ({
      name: item.name,
      description: item.description,
      price: normalizePesoInput(item.price),
      image: item.image ?? undefined,
      imageAlt: item.imageAlt ?? undefined,
      category: item.category,
      featured: item.featured,
    }));

    const featuredDrinks = mappedItems
      .filter((item) => item.featured)
      .slice(0, 3)
      .map(({ category: _category, featured: _featured, ...item }) => item);

    const categories = Array.from(
      mappedItems.reduce((grouped, item) => {
        const current = grouped.get(item.category) ?? [];
        current.push(item);
        grouped.set(item.category, current);
        return grouped;
      }, new Map<string, typeof mappedItems>()),
    ).map(([title, categoryItems]) => {
      const details = categoryDetails[title] ?? {
        eyebrow: "From The Counter",
        description: "Freshly prepared items available from the Ember & Bean menu.",
      };

      return {
        title,
        eyebrow: details.eyebrow,
        description: details.description,
        items: categoryItems.map(({ category: _category, featured: _featured, ...item }) => item),
      };
    });

    return {
      featuredDrinks: featuredDrinks.length > 0 ? featuredDrinks : staticFeaturedDrinks,
      menuCategories: categories.filter((section) => section.title !== "Signature Sips"),
      source: "database",
    };
  } catch (error) {
    console.error("Public menu database fallback", error);

    return {
      featuredDrinks: staticFeaturedDrinks,
      menuCategories: staticMenuCategories,
      source: "static",
    };
  }
}

export default async function MenuPage() {
  const { featuredDrinks, menuCategories, source } = await getPublicMenuData();

  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#2B1E18] pt-36 text-[#FFFDFB]">
        <Image
          src="/images/drinks/honey-oat-latte.jpg"
          alt="Honey oat latte styled on a warm café table"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f140f]/95 via-[#2B1E18]/75 to-[#2B1E18]/30" />
        <div className="absolute inset-0 noise opacity-15" />

        <Container className="relative z-10 py-24">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
                <Sparkles size={18} /> Menu
              </p>

              <h1 className="font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
                Slow-crafted drinks, warm bites.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F8F4EF]/75">
                Explore signature coffee, everyday brews, chilled favorites,
                and pastries made for quiet mornings and long conversations.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#FFFDFB] py-24 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
                  House Favorites
                </p>
                <h2 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-[0.95] md:text-7xl">
                  Signature sips,
                  <br /> photographed beautifully.
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-lg leading-8 text-[#4A342A]/75">
                  Our featured drinks carry the same warm editorial image language as the homepage.
                </p>
                {source === "database" && (
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#B7793C]">
                    Updated from admin
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {featuredDrinks.map((drink, index) => (
              <Reveal key={`${drink.name}-${index}`} delay={index * 0.06}>
                <ProductCard
                  name={drink.name}
                  description={drink.description}
                  price={drink.price}
                  image={drink.image}
                  imageAlt={drink.imageAlt}
                  priority={index === 0}
                  className="h-full bg-[#FFFDFB]"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <Reveal>
              <aside className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_20px_80px_rgba(43,30,24,0.08)] lg:sticky lg:top-28">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                  <Coffee size={26} />
                </div>

                <h2 className="mt-8 font-[var(--font-display)] text-4xl font-semibold">
                  Order ahead, pick up fresh.
                </h2>

                <p className="mt-4 leading-7 text-[#4A342A]/75">
                  Prices are listed in Philippine pesos. For advance orders, use
                  the order page and we will confirm availability, pickup
                  time, and total before preparing your drinks.
                </p>

                <Link
                  href="/order"
                  className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
                >
                  Order Ahead <ArrowRight className="ml-2" size={18} />
                </Link>
              </aside>
            </Reveal>

            <div className="space-y-8">
              {menuCategories.map((section, sectionIndex) => (
                <Reveal key={section.title} delay={sectionIndex * 0.04}>
                  <section className="overflow-hidden rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] shadow-[0_20px_80px_rgba(43,30,24,0.06)]">
                    <div className="border-b border-[#2B1E18]/10 p-7 sm:p-10">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793C]">
                        {section.eyebrow}
                      </p>

                      <div className="mt-3">
                        <h2 className="font-[var(--font-display)] text-4xl font-semibold md:text-5xl">
                          {section.title}
                        </h2>

                        <p className="mt-3 max-w-xl leading-7 text-[#4A342A]/70">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-[#2B1E18]/10 px-7 sm:px-10">
                      {section.items.map((item, itemIndex) => (
                        <article
                          key={`${section.title}-${item.name}-${itemIndex}`}
                          className="grid gap-4 py-7 sm:grid-cols-[1fr_auto] sm:items-start"
                        >
                          <div>
                            <h3 className="font-[var(--font-display)] text-3xl font-semibold">
                              {item.name}
                            </h3>

                            <p className="mt-2 leading-7 text-[#4A342A]/70">
                              {item.description}
                            </p>
                          </div>

                          <span className="w-fit rounded-full bg-[#2B1E18] px-4 py-2 text-sm font-semibold text-[#FFFDFB]">
                            {item.price}
                          </span>
                        </article>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
