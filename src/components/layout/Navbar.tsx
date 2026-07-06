"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "./Container";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[color:var(--border)] bg-background/85 shadow-sm backdrop-blur-xl"
          : "bg-background/70 backdrop-blur-md"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-semibold text-muted transition hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/menu"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-muted"
          >
            Order Ahead <ArrowRight className="ml-2" size={17} />
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-surface md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm md:hidden">
          <div className="ml-auto h-screen w-[82%] max-w-sm bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-surface"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl font-semibold text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="mt-12 inline-flex h-14 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              Order Ahead <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}