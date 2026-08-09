"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { heroContent } from "../models";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (hero.offsetHeight || 1), 0), 1);
      hero.style.setProperty("--hero-progress", progress.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const MAX_SHIFT = 26;
    let frame = 0;
    let nx = 0, ny = 0;
    const apply = () => {
      frame = 0;
      hero.style.setProperty("--hero-px", `${(nx * MAX_SHIFT).toFixed(1)}px`);
      hero.style.setProperty("--hero-py", `${(ny * MAX_SHIFT).toFixed(1)}px`);
    };
    const onMove = (e: MouseEvent) => {
      nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ny = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <section id="product" className="dl-hero" ref={sectionRef}>
      <Image className="dl-hero__backdrop" src="/downloads/hero-circles.svg" alt="" aria-hidden width={1100} height={1100} />
      <div className="dl-hero__content">
        <ScrollReveal as="h1" className="dl-hero__heading">
          {heroContent.headingLines[0]}<br />
          <span className="dl-hero__heading-accent">{heroContent.headingLines[1]}</span>
        </ScrollReveal>
        <ScrollReveal as="p" className="dl-hero__subheading" delayMs={100}>{heroContent.subheading}</ScrollReveal>
        <ScrollReveal className="dl-hero__actions" delayMs={200}>
          <a href={heroContent.primaryCta.href} className="dl-hero__button dl-hero__button--primary">{heroContent.primaryCta.label}</a>
          <a href={heroContent.secondaryCta.href} className="dl-hero__button dl-hero__button--secondary">{heroContent.secondaryCta.label}</a>
        </ScrollReveal>
      </div>
    </section>
  );
}
