"use client";

import { useEffect, useRef, useState, ElementType, HTMLAttributes } from "react";

function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  delayMs?: number;
}

export default function ScrollReveal({ as: Tag = "div", className = "", delayMs = 0, children, ...rest }: Props) {
  const [ref, visible] = useScrollAnimation();
  const TagComponent = Tag as ElementType;
  return (
    <TagComponent
      ref={ref}
      className={`dl-scroll-reveal ${visible ? "dl-scroll-reveal--visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
      {...rest}
    >
      {children}
    </TagComponent>
  );
}

export { useScrollAnimation };
