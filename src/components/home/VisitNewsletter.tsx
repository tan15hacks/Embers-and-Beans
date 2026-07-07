import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { siteConfig } from "@/data/site";

export function VisitNewsletter() {
  return (
    <section className="bg-[#2B1E18] py-24 text-[#FFFDFB]">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-[2.5rem] border border-[#F8F4EF]/10 bg-[#FFFDFB]/5 shadow-[0_30px_110px_rgba(0,0,0,0.25)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
                Plan Your Visit
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
                Your next slow morning starts here.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#F8F4EF]/75">
                Come in for a quiet table, order ahead for pickup, or ask the shop about pastries and seasonal drinks before you arrive.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#F8F4EF] px-8 text-sm font-semibold text-[#2B1E18] transition hover:bg-[#E5C7A1]"
                >
                  Order Ahead <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[#F8F4EF]/25 px-8 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#FFFDFB]/10"
                >
                  View Menu
                </Link>
              </div>

              <div className="mt-10 grid gap-5 text-sm text-[#F8F4EF]/70 md:grid-cols-3">
                <div className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-[#E5C7A1]" size={18} />
                  <span>{siteConfig.location}</span>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-1 shrink-0 text-[#E5C7A1]" size={18} />
                  <span>{siteConfig.hours}</span>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-1 shrink-0 text-[#E5C7A1]" size={18} />
                  <span>{siteConfig.email}</span>
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-[#E5C7A1] p-6 text-[#2B1E18]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,30,24,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(43,30,24,0.08)_1px,transparent_1px)] bg-[size:54px_54px]" />
              <div className="absolute left-[16%] top-[28%] h-28 w-[72%] rotate-[-8deg] rounded-full border-[18px] border-[#B7793C]/30" />
              <div className="absolute right-[10%] top-[18%] h-44 w-44 rounded-full border-[18px] border-[#6E7A5C]/25" />
              <div className="absolute bottom-[18%] left-[8%] h-40 w-[58%] rotate-[12deg] rounded-full border-[18px] border-[#2B1E18]/15" />

              <div className="relative flex h-full min-h-[372px] items-center justify-center">
                <div className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB]/85 p-6 text-center shadow-[0_24px_80px_rgba(43,30,24,0.18)] backdrop-blur">
                  <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-[#2B1E18] text-[#FFFDFB]">
                    <MapPin size={28} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793C]">
                    Map Preview
                  </p>
                  <h3 className="mt-3 font-[var(--font-display)] text-4xl font-semibold">
                    {siteConfig.shortName}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-[#4A342A]/75">
                    A warm coffee stop in {siteConfig.location}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
