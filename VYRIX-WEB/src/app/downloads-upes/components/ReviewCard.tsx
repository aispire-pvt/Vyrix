"use client";

import { useScrollAnimation } from "./ScrollReveal";
import StarRating from "./StarRating";

interface Review { id: string; rating: number; text: string; }

export default function ReviewCard({ review, delayMs = 0 }: { review: Review; delayMs?: number }) {
  const [ref, visible] = useScrollAnimation();
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`dl-review-card ${visible ? "dl-review-card--visible" : ""}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <StarRating rating={review.rating} />
      <p className="dl-review-card__text">{review.text}</p>
    </article>
  );
}
