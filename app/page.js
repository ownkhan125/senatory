import { Navbar } from "@/components/navbar/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { PoliciesSection } from "@/components/sections/policies-section";
import { EventsSection } from "@/components/sections/events-section";
import { VolunteerSection } from "@/components/sections/volunteer-section";
import { DonationSection } from "@/components/sections/donation-section";
import { Footer } from "@/components/footer/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <VolunteerSection />
        <DonationSection />
      </main>
      <Footer />
    </>
  );
}
