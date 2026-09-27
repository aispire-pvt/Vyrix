import Navbar from "@/components/upes/Navbar";
import Hero from "@/components/upes/Hero";
import AppShowcase from "@/components/upes/AppShowcase";
import WhatsNew from "@/components/upes/WhatsNew";
import Reviews from "@/components/upes/Reviews";
import Platform from "@/components/upes/Platform";
import Footer from "@/components/upes/Footer";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-cream">
      <Navbar />
      <main>
        <Hero />
        <AppShowcase />
        <WhatsNew />
        <Reviews />
        <Platform />
      </main>
      <Footer />
    </div>
  );
}
