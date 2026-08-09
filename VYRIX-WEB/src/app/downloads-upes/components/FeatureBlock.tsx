"use client";

import Image from "next/image";
import { useScrollAnimation } from "./ScrollReveal";

const featureIcons: Record<string, string> = {
  "ai-integration": "/downloads/icon-ai-integration.svg",
  "reworked-repository": "/downloads/icon-reworked-repository.svg",
  "fresh-look": "/downloads/icon-fresh-look.svg",
  "other-features": "/downloads/icon-other-features.svg",
};

interface Feature {
  id: string;
  heading: string;
  intro: string | null;
  items: string[];
}

export default function FeatureBlock({ feature, index = 0 }: { feature: Feature; index?: number }) {
  const [ref, visible] = useScrollAnimation();
  const isReverse = index % 2 !== 0;

  const className = [
    "dl-feature-block",
    isReverse ? "dl-feature-block--reverse" : "",
    visible ? "dl-feature-block--visible" : "",
  ].filter(Boolean).join(" ");

  return (
    <article ref={ref as React.RefObject<HTMLElement>} className={className} style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="dl-feature-block__icon">
        <Image src={featureIcons[feature.id]} alt="" aria-hidden width={212} height={212} />
      </div>
      <div className="dl-feature-block__text">
        <h3 className="dl-feature-block__heading">{feature.heading}</h3>
        {feature.intro && <p className="dl-feature-block__intro">{feature.intro}</p>}
        <ol className="dl-feature-block__list">
          {feature.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </div>
    </article>
  );
}
