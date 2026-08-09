"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const card = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const rotationX = gsap.quickTo(card.current, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        const rotationY = gsap.quickTo(card.current, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        const lift = gsap.quickTo(card.current, "z", { duration: 0.5, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const bounds = card.current!.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          rotationX(y * -5);
          rotationY(x * 5);
          lift(10);
        };
        const onLeave = () => {
          rotationX(0);
          rotationY(0);
          lift(0);
        };

        card.current!.addEventListener("pointermove", onMove, { passive: true });
        card.current!.addEventListener("pointerleave", onLeave, { passive: true });
        return () => {
          card.current?.removeEventListener("pointermove", onMove);
          card.current?.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: card },
  );

  return (
    <div ref={card} className={className} style={{ perspective: "900px", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
