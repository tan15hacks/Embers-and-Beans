import Link from "next/link";
import { ArrowRight, Coffee, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { menuSections } from "@/data/menu";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#2B1E18] pt-36 text-[#FFFDFB]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#B7793C_0%,transparent_34%),linear-gradient(120deg,#1f140f_0%,#2B1E18_52%,#5b341e_100%)]" />
        <div className="absolute inset-0 noise opacity-20" />

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
              <Sparkles size={18} /> Menu
            </p>
            <h1 className="font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
              Slow-crafted drinks, warm bites.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F8F4EF]/75">
              Explore our signature coffee, everyday brews, chilled favorites, and pastries made for quiet mornings and long conversations.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <aside className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_20px_80px_rgba(43,30,24,0.08)] lg:sticky lg:top-28">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                <Coffee size={26} />
              </div>
              <h2 className="mt-8 font-[var(--font-display)] text-4xl font-semibold">
                Order ahead, pick up fresh.
              </h2>
              <p className="mt-4 leading-7 text-[#4A342A]/75">
                Prices are listed in Philippine pesos. For advance orders, call or message the shop and we will prepare your drinks close to pickup time.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
              >
                Contact the Shop <ArrowRight className="ml-2" size={18} />
              </Link>
            </aside>

            <div className="space-y-10">
              {menuSections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-7 shadow-[0_20px_80px_rgba(43,30,24,0.06)] sm:p-10"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793C]">
                    {section.eyebrow}
                  </p>
                  <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <h2 className="font-[var(--font-display)] text-4xl font-semibold md:text-5xl">
                        {section.title}
                      </h2>
                      <p className="mt-3 max-w-xl leading-7 text-[#4A342A]/70">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 divide-y divide-[#2B1E18]/10">
                    {section.items.map((item) => (
                      <article
                        key={item.name}
                        className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start"
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
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
