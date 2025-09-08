import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  CallToActionSection,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Student Event Discovery & Management",
  description: "Zero fees for student organizations. Mobile-first design. Smart RSVP features. Discover and manage campus events the way students deserve.",
  openGraph: {
    title: "RSVP by Offbeats - Student Event Discovery & Management",
    description: "Zero fees for student organizations. Mobile-first design. Smart RSVP features.",
    images: ["/og-home.png"],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
