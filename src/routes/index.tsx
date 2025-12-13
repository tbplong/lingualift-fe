import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Connect } from "@/pages/Landing/Connect";
import CoreValue from "@/pages/Landing/CoreValue";
import { FooterBadgeRow } from "@/pages/Landing/FooterBadge";
import Hero from "@/pages/Landing/Hero";
import WhyChoose from "@/pages/Landing/WhyChoose";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Header />
      <Hero />
      <CoreValue />
      <WhyChoose />
      <Connect />
      <FooterBadgeRow />
      <Footer />
    </div>
  );
}
