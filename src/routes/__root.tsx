import { createRootRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import Hero from "../pages/Landing/Hero";
import { Connect } from "../pages/Landing/Connect";
import { FooterBadgeRow } from "../pages/Landing/FooterBadge";
import { Footer } from "../components/Footer";
import CoreValue from "../pages/Landing/CoreValue";
import WhyChoose from "../pages/Landing/WhyChoose";

// import DashboardSection from "../components/landingPage/Dashboard";

const RootLayout = () => (
  <div className="min-h-screen flex flex-col overflow-hidden">
    <Header />
    <Hero />
    {/* <DashboardSection/> */}
    <CoreValue />
    <WhyChoose />
    <Connect />
    <FooterBadgeRow />
    <Footer />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
