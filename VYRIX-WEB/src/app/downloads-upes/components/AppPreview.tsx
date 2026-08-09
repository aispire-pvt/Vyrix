"use client";

import Image from "next/image";
import { useScrollAnimation } from "./ScrollReveal";

export default function AppPreview() {
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="dl-app-preview">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`dl-app-preview__card ${visible ? "dl-app-preview__card--visible" : ""}`.trim()}
      >
        <Image src="/downloads/hero-screenshot.png" alt="Vyrix Beta 2 workspace preview" width={1457} height={900} />
      </div>
    </section>
  );
}
