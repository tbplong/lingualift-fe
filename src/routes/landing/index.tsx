import { Header } from "@/components/Header";
import { createFileRoute } from "@tanstack/react-router";
import Hero from "../../pages/landing/Hero";
import CoreValue from "../../pages/landing/CoreValue";
import WhyChoose from "../../pages/landing/WhyChoose";
import { Connect } from "../../pages/landing/Connect";
import { FooterBadgeRow } from "../../pages/landing/FooterBadge";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/landing/")({
  component: RouteComponent,
});

function RouteComponent() {
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
