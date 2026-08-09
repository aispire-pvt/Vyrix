"use client";

import Image from "next/image";
import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

export default function HeroIllustration() {
  const enter = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        gsap.from(enter.current, {
          opacity: 0,
          y: 28,
          scale: 0.97,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.to(float.current, {
          y: -12,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const x = gsap.quickTo(tilt.current, "x", { duration: 0.7, ease: "power3" });
        const y = gsap.quickTo(tilt.current, "y", { duration: 0.7, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          x(((e.clientX - cx) / cx) * 14);
          y(((e.clientY - cy) / cy) * 10);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      });
    },
    { scope: enter },
  );

  return (
    <div ref={enter} className="w-full max-w-[430px]">
      <div ref={float}>
        <div ref={tilt}>
          <Image
            src="/hero-illustration.png"
            alt="A design student working in Vyrix, surrounded by organised research, insights and a mind map"
            width={1086}
            height={1044}
            priority
            className="h-auto w-full select-none"
          />
        </div>
      </div>
    </div>
  );
}
