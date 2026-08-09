import type { Metadata } from "next";
import "./downloads.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AppPreview from "./components/AppPreview";
import WhatsNewSection from "./components/WhatsNewSection";
import ReviewsSection from "./components/ReviewsSection";
import PlatformSection from "./components/PlatformSection";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export const metadata: Metadata = {
  title: "Vyrix Beta 2 — Download",
  description:
    "Vyrix Beta 2 has landed on campus. Download the latest version with integrated AI, Workspaces, and a fresh UI. Available for Windows and Mac.",
};

export default function DownloadsUpesPage() {
  return (
    <div id="top" className="dl-page">
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <AppPreview />
        <WhatsNewSection />
        <ReviewsSection />
        <PlatformSection />
      </main>
      <Footer />
    </div>
  );
}
