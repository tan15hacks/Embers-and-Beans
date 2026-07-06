import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit ${siteConfig.name} in ${siteConfig.location}, or contact the shop for pickup orders and table questions.`,
  alternates: {
    canonical: "/contact",
  },
};

const contactItems = [
  {
    icon: MapPin,
    title: "Visit",
    text: siteConfig.location,
  },
  {
    icon: Phone,
    title: "Call",
    text: siteConfig.phone,
  },
  {
    icon: Mail,
    title: "Email",
    text: siteConfig.email,
  },
  {
    icon: Clock3,
    title: "Hours",
    text: siteConfig.hours,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#2B1E18] pt-36 text-[#FFFDFB]">
        <Image
          src="/images/contacts/store-front.png"
          alt="Warm Ember and Bean storefront in soft morning light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f140f]/95 via-[#2B1E18]/75 to-[#2B1E18]/25" />
        <div className="absolute inset-0 noise opacity-15" />

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E5C7A1]">
              Contact
            </p>
            <h1 className="mt-5 font-[var(--font-display)] text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
              Let us save you a seat and a cup.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F8F4EF]/75">
              Planning a visit, ordering ahead, or asking about today’s pastries? Reach out and we’ll help make your coffee stop feel easy.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_20px_80px_rgba(43,30,24,0.06)]"
              >
                <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                  <item.icon size={24} />
                </div>
                <h2 className="font-[var(--font-display)] text-3xl font-semibold">
                  {item.title}
                </h2>
                <p className="mt-4 leading-7 text-[#4A342A]/70">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="overflow-hidden rounded-[2.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] shadow-[0_30px_100px_rgba(43,30,24,0.12)]">
              <div className="relative min-h-[620px] p-8 text-[#FFFDFB]">
                <Image
                  src="/images/contacts/seating.png"
                  alt="Cozy seating area inside Ember and Bean"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E18]/90 via-[#2B1E18]/30 to-transparent" />
                <div className="relative flex min-h-[556px] flex-col justify-end">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E5C7A1]">
                    Find Us
                  </p>
                  <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-tight">
                    A warm corner in Albay.
                  </h2>
                  <p className="mt-5 max-w-sm leading-7 text-[#F8F4EF]/75">
                    Visit for quiet mornings, unhurried conversations, and coffee prepared with care.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Link
                      href={siteConfig.phoneHref}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#F8F4EF] px-5 text-sm font-semibold text-[#2B1E18] transition hover:bg-[#E5C7A1]"
                    >
                      <Phone className="mr-2" size={17} /> Call
                    </Link>
                    <Link
                      href="mailto:hello@emberandbean.com"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-[#F8F4EF]/30 px-5 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#FFFDFB]/10"
                    >
                      <Mail className="mr-2" size={17} /> Email
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 shadow-[0_30px_100px_rgba(43,30,24,0.1)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
                Send a Message
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-semibold md:text-6xl">
                Tell us what to prepare.
              </h2>
              <p className="mt-5 leading-8 text-[#4A342A]/75">
                Use the form for pickup orders, event boxes, visit questions, or general inquiries. We’ll respond through email as soon as the shop can confirm availability.
              </p>

              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
