import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-[#2B1E18] py-16 text-[#F8F4EF]">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-4xl font-semibold">
              {siteConfig.shortName}
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
              <MapPin size={18} /> {siteConfig.location}
            </p>
            <p className="mt-3 text-sm text-[#F8F4EF]/60">{siteConfig.hours}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E5C7A1]">
              Connect
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#F8F4EF]/70">
              <Link href={siteConfig.phoneHref} className="flex gap-2 hover:text-white">
                <Phone size={18} /> {siteConfig.phone}
              </Link>
              <Link href={`mailto:${siteConfig.email}`} className="flex gap-2 hover:text-white">
                <Mail size={18} /> {siteConfig.email}
              </Link>
              <Link
                href={siteConfig.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 hover:text-white"
                aria-label="Open Ember and Bean on Instagram"
              >
                <Camera size={18} /> {siteConfig.instagram}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-[#F8F4EF]/50">
          © 2026 {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
