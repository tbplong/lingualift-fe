import { createRootRoute } from "@tanstack/react-router";
// import { Header } from "../components/landingPage/Header";
// import { Footer } from "../components/landingPage/Footer";
// import { Connect } from "../components/landingPage/Body";
// import { FooterBadgeRow } from "../components/landingPage/FooterBadge";
// import DashboardSection from "../components/landingPage/Dashboard";

const RootLayout = () => (
  <div className="min-h-screen flex flex-col">
    {/* <Header/> */}
    {/* <DashboardSection/> */}
    {/* <Connect  />
      <FooterBadgeRow />
      <Footer /> */}
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
