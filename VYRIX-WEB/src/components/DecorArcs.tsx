"use client";

import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

type Variant = "top" | "bottom-right" | "top-right" | "bottom-left" | "left";

const RINGS = [0, 1, 2, 3];

const PLACEMENT: Record<Variant, { cx: string; cy: string; r0: number; step: number }> = {
  top: { cx: "50%", cy: "-118%", r0: 1180, step: 52 },
  "bottom-right": { cx: "100%", cy: "100%", r0: 270, step: 75 },
  "top-right": { cx: "100%", cy: "0%", r0: 270, step: 75 },
  "bottom-left": { cx: "0%", cy: "100%", r0: 270, step: 75 },
  left: { cx: "0%", cy: "0%", r0: 270, step: 75 },
};

export default function DecorArcs({ variant }: { variant: Variant }) {
  const { cx, cy, r0, step } = PLACEMENT[variant];
  const arcs = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const circles = arcs.current!.querySelectorAll("circle");

        gsap.from(circles, {
          opacity: 0,
          scale: 0.96,
          transformOrigin: "center center",
          duration: 1.35,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: arcs.current,
            start: "top 95%",
            once: true,
          },
        });
      });
    },
    { scope: arcs },
  );

  return (
    <svg
      ref={arcs}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      {RINGS.map((i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r0 + i * step}
          fill="none"
          stroke="var(--color-arc)"
          strokeWidth="1"
          opacity={0.55}
        />
      ))}
    </svg>
  );
}
