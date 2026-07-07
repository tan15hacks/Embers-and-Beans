import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OrderForm, type OrderMenuItem } from "@/components/order/OrderForm";
import { Reveal } from "@/components/shared/Reveal";
import { siteConfig } from "@/data/site";
import { getPrisma } from "@/lib/db";
import { normalizePesoInput, parsePesoAmount } from "@/lib/money";

export const metadata: Metadata = {
  title: "Order Ahead",
  description: `Order drinks and pastries ahead for pickup from ${siteConfig.name}.`,
  alternates: {
    canonical: "/order",
  },
};

export const dynamic = "force-dynamic";

async function getOrderMenuItems(): Promise<OrderMenuItem[]> {
  try {
    const prisma = getPrisma();
    const items = await prisma.menuItem.findMany({
      where: {
        active: true,
      },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return items.map((item) => {
      const price = normalizePesoInput(item.price);

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price,
        category: item.category,
        unitPrice: parsePesoAmount(price),
      };
    });
  } catch (error) {
    console.error("Order page menu load error", error);
    return [];
  }
}

export default async function OrderPage() {
  const items = await getOrderMenuItems();

  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#2B1E18] pt-36 text-[#FFFDFB]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(183,121,60,0.32),transparent_35%),radial-gradient(circle_at_75%_10%,rgba(229,199,161,0.18),transparent_30%)]" />
        <div className="absolute inset-0 noise opacity-15" />

        <Container className="relative z-10 py-24">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
                <ShoppingBag size={18} /> Order Ahead
              </p>
              <h1 className="font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
                Build a pickup order in a few clicks.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F8F4EF]/75">
                Choose drinks and pastries, add your pickup time, and we’ll confirm availability before preparing your order fresh.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          {items.length === 0 ? (
            <div className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_20px_80px_rgba(43,30,24,0.08)]">
              <h2 className="font-[var(--font-display)] text-4xl font-semibold">
                Ordering is almost ready.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-[#4A342A]/75">
                Add active menu items from the admin dashboard first. Use the Import Starter Menu button inside Admin → Menu to load the current café menu into Neon.
              </p>
              <Link
                href="/menu"
                className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
              >
                View Menu <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          ) : (
            <OrderForm items={items} />
          )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}
