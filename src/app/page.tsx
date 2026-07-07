import { CafeExperience } from "@/components/home/CafeExperience";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedCoffee } from "@/components/home/FeaturedCoffee";
import { FreshlyBaked } from "@/components/home/FreshlyBaked";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { SeasonalCollection } from "@/components/home/SeasonalCollection";
import { Testimonials } from "@/components/home/Testimonials";
import { VisitNewsletter } from "@/components/home/VisitNewsletter";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

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
      <FAQSection />
      <VisitNewsletter />
      <Footer />
    </main>
  );
}
