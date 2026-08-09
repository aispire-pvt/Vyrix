"use client";

import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const el = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const counter = { n: 0 };

        gsap.to(counter, {
          n: value,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.current!.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
          },
          scrollTrigger: { trigger: el.current, start: "top 90%", once: true },
        });
      });
    },
    { scope: el },
  );

  return (
    <p ref={el} className={className}>
      {prefix}
      {value}
      {suffix}
    </p>
  );
}
