"use client";

import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

export default function Reveal({
  children,
  stagger = false,
  delay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  stagger?: boolean;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const targets = stagger ? Array.from(root.current!.children) : root.current;
        const offset =
          direction === "left"
            ? { x: -28, y: 0 }
            : direction === "right"
              ? { x: 28, y: 0 }
              : { x: 0, y: 26 };

        gsap.from(targets, {
          opacity: 0,
          x: offset.x,
          y: stagger ? Math.min(offset.y, 12) : offset.y,
          filter: "blur(7px)",
          duration: 0.85,
          ease: "power3.out",
          delay,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: {
            trigger: root.current,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
