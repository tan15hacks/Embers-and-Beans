import { Logo } from "@/components/brand/Logo";
import Link from "next/link";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#2B1E18]/10 bg-[#F8F4EF]/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">

        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
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
          href="/menu"
          className="hidden rounded-full bg-[#2B1E18] px-6 py-3 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] md:inline-flex"
        >
          Order Ahead
        </Link>

      </Container>
    </header>
  );
}