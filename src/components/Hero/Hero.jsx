import { useEffect, useRef } from 'react';
import heroCircles from '../../assets/images/hero-circles.svg';
import { heroContent } from '../../models/heroModel';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const height = hero.offsetHeight || 1;
      // 0 while the hero is at the top of the viewport, 1 once it has
      // scrolled a full hero-height out of view.
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);
      hero.style.setProperty('--hero-progress', progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Mouse parallax: the ring cluster drifts gently toward the cursor.
  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const MAX_SHIFT = 26; // px the rings can drift from centre
    let frame = 0;
    let nx = 0;
    let ny = 0;

    const apply = () => {
      frame = 0;
      hero.style.setProperty('--hero-px', `${(nx * MAX_SHIFT).toFixed(1)}px`);
      hero.style.setProperty('--hero-py', `${(ny * MAX_SHIFT).toFixed(1)}px`);
    };

    const onMove = (event) => {
      // -1 (left/top) .. 1 (right/bottom), relative to the viewport centre.
      nx = (event.clientX / window.innerWidth - 0.5) * 2;
      ny = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="product" className="hero" ref={sectionRef}>
      <img className="hero__backdrop" src={heroCircles} alt="" aria-hidden="true" />
      <div className="hero__content">
        <ScrollReveal as="h1" className="hero__heading">
          {heroContent.headingLines[0]}
          <br />
          <span className="hero__heading-accent">{heroContent.headingLines[1]}</span>
        </ScrollReveal>
        <ScrollReveal as="p" className="hero__subheading" delayMs={100}>
          {heroContent.subheading}
        </ScrollReveal>
        <ScrollReveal className="hero__actions" delayMs={200}>
          <a href={heroContent.primaryCta.href} className="hero__button hero__button--primary">
            {heroContent.primaryCta.label}
          </a>
          <a href={heroContent.secondaryCta.href} className="hero__button hero__button--secondary">
            {heroContent.secondaryCta.label}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
