import { useScrollAnimation } from '../../controllers/useScrollAnimation.jsx';
import heroScreenshot from '../../assets/images/hero-screenshot.png';
import './AppPreview.css';

export default function AppPreview() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="app-preview">
      <div
        ref={ref}
        className={`app-preview__card ${isVisible ? 'app-preview__card--visible' : ''}`.trim()}
      >
        <img src={heroScreenshot} alt="Vyrix Beta 2 workspace preview" />
      </div>
    </section>
  );
}
