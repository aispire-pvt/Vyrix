"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks, contactCta } from "../models";

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY = y;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <header className={`dl-header ${hidden ? "dl-header--hidden" : ""}`.trim()}>
      <a href="#top" className="dl-header__logo">
        <Image src="/downloads/logo.png" alt="Vyrix" width={155} height={31} />
      </a>
      <nav className="dl-header__nav">
        {navLinks.map((link) => (
          <a key={link.id} href={link.href} className="dl-header__link">{link.label}</a>
        ))}
      </nav>
      <a href={contactCta.href} className="dl-header__cta">{contactCta.label}</a>
    </header>
  );
}
