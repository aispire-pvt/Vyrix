import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import AppPreview from '../components/AppPreview/AppPreview';
import WhatsNewSection from '../components/WhatsNewSection/WhatsNewSection';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import PlatformSection from '../components/PlatformSection/PlatformSection';
import Footer from '../components/Footer/Footer';
import './LandingPageView.css';

export default function LandingPageView() {
  return (
    <div id="top" className="landing-page">
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
