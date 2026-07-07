"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/data/site";
import { Container } from "./Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#2B1E18]/10 bg-[#F8F4EF]/85 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#2B1E18]/70 transition hover:text-[#2B1E18]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-[#2B1E18] px-6 py-3 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] md:inline-flex"
        >
          Order Ahead
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-[#2B1E18]/10 text-[#2B1E18] transition hover:bg-[#2B1E18]/5 md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-[#2B1E18]/10 bg-[#F8F4EF] md:hidden">
          <Container className="flex flex-col gap-3 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#2B1E18]/75 transition hover:bg-[#2B1E18]/5 hover:text-[#2B1E18]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#2B1E18] px-6 py-3 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]"
            >
              Order Ahead
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
