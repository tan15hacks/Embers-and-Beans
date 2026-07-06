"use client";


import { Mail, MapPin, Phone, Clock3 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

const contactItems = [
  {
    icon: MapPin,
    title: "Visit",
    text: "123 Roastery Lane, Brewtown",
  },
  {
    icon: Phone,
    title: "Call",
    text: "(555) 123-4567",
  },
  {
    icon: Mail,
    title: "Email",
    text: "hello@emberandbean.com",
  },
  {
    icon: Clock3,
    title: "Hours",
    text: "Mon–Fri 7AM–6PM · Sat–Sun 8AM–6PM",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32">
        <Container className="py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
            Contact
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-7xl leading-tight md:text-8xl">
            Come by for coffee. Stay awhile.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Whether you’re stopping in for your morning ritual, meeting a friend,
            or asking about catering, we’d love to hear from you.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[color:var(--border)] bg-surface p-8"
              >
                <item.icon className="text-secondary" size={28} />
                <h2 className="mt-6 font-display text-3xl">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <form
                className="rounded-[2rem] border border-[color:var(--border)] bg-surface p-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    alert("Message sending will be connected soon!");
                }}
                >
              <h2 className="font-display text-4xl">Send a message</h2>

              <div className="mt-8 grid gap-4">
                <input
                  placeholder="Your name"
                  className="h-14 rounded-full border border-[color:var(--border)] bg-background px-5 outline-none"
                />
                <input
                  placeholder="Email address"
                  type="email"
                  className="h-14 rounded-full border border-[color:var(--border)] bg-background px-5 outline-none"
                />
                <textarea
                  placeholder="How can we help?"
                  rows={6}
                  className="rounded-[1.5rem] border border-[color:var(--border)] bg-background p-5 outline-none"
                />
                <button className="h-14 rounded-full bg-primary font-semibold text-primary-foreground">
                  Send Message
                </button>
              </div>
            </form>

            <div className="rounded-[2rem] border border-[color:var(--border)] bg-primary p-8 text-primary-foreground">
              <h2 className="font-display text-4xl">Find us</h2>
              <p className="mt-4 leading-7 text-primary-foreground/70">
                Located in the heart of Brewtown, just off the main street near
                local shops, studios, and morning markets.
              </p>

                <iframe
                    title="Ember & Bean Location"
                    className="mt-8 h-80 w-full rounded-[1.5rem] border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Vancouver&output=embed"
                    />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}