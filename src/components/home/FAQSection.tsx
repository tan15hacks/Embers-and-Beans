import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { faqs } from "@/data/faq";

export function FAQSection() {
  return (
    <section className="bg-[#FFFDFB] py-24 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                <HelpCircle size={26} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
                Good to Know
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-[0.98] text-[#2B1E18] md:text-7xl">
                A few answers before you visit.
              </h2>
              <p className="mt-6 max-w-md leading-8 text-[#4A342A]/75">
                From pickup orders to seating questions, here are the simple details guests usually ask before stopping by.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
              >
                Ask the Shop <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04}>
                <details className="group rounded-[2rem] border border-[#2B1E18]/10 bg-[#F8F4EF] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.05)] open:bg-[#FFFDFB]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-[var(--font-display)] text-2xl font-semibold leading-tight text-[#2B1E18] [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2B1E18] text-lg leading-none text-[#FFFDFB] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
