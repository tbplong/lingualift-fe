import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Connect } from "@/pages/landing/Connect";
import CoreValue from "@/pages/landing/CoreValue";
import { FooterBadgeRow } from "@/pages/landing/FooterBadge";
import Hero from "@/pages/landing/Hero";
import WhyChoose from "@/pages/landing/WhyChoose";
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
