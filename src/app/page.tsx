






import { VisitNewsletter } from "@/components/home/VisitNewsletter";
import { Testimonials } from "@/components/home/Testimonials";
import { CafeExperience } from "@/components/home/CafeExperience";
import { FreshlyBaked } from "@/components/home/FreshlyBaked";
import { SeasonalCollection } from "@/components/home/SeasonalCollection";
import { Philosophy } from "@/components/home/Philosophy";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedCoffee } from "@/components/home/FeaturedCoffee";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F4EF] text-[#2B1E18]">
      <Navbar />
      <Hero />
      <FeaturedCoffee />
      <Philosophy />
      <SeasonalCollection />
      <FreshlyBaked />
      <CafeExperience />
      <Testimonials />
      <VisitNewsletter />
      <Footer />
    </main>
  );
}