import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-[#2B1E18] py-16 text-[#F8F4EF]">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-4xl font-semibold">
              Ember & Bean
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#F8F4EF]/70">
              Specialty coffee, fresh pastries, and slow mornings crafted with care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E5C7A1]">
              Visit
            </h3>
            <p className="mt-4 flex gap-2 text-sm text-[#F8F4EF]/70">
              <MapPin size={18} /> Legazpi City, Albay, Philippines
            </p>
            <p className="mt-3 text-sm text-[#F8F4EF]/60">
              Open daily · 7:00 AM – 9:00 PM
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E5C7A1]">
              Connect
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#F8F4EF]/70">
              <Link href="tel:+639123456789" className="flex gap-2 hover:text-white">
                <Phone size={18} /> +63 912 345 6789
              </Link>
              <Link href="mailto:hello@emberandbean.com" className="flex gap-2 hover:text-white">
                <Mail size={18} /> hello@emberandbean.com
              </Link>
              <Link href="#" className="flex gap-2 hover:text-white">
                <Camera size={18} /> @emberandbean
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-[#F8F4EF]/50">
          © 2026 Ember & Bean Coffee Co. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
