"use client";

import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        gsap.to(progress.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "max",
            scrub: true,
          },
        });
      });
    },
    { scope: progress },
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div ref={progress} className="h-full origin-left scale-x-0 bg-[#4A9EFF]" />
    </div>
  );
}
