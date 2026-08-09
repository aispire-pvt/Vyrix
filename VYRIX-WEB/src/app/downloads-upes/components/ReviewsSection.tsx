import { reviewsIntro, reviews } from "../models";
import ReviewCard from "./ReviewCard";
import ScrollReveal from "./ScrollReveal";

const reviewColumns = [
  ["review-1", "review-4", "review-5"],
  ["review-2", "review-3", "review-6"],
];

export default function ReviewsSection() {
  const byId = Object.fromEntries(reviews.map((r) => [r.id, r]));
  return (
    <section id="reviews" className="dl-reviews">
      <ScrollReveal as="h2" className="dl-reviews__heading">{reviewsIntro.heading}</ScrollReveal>
      <ScrollReveal as="p" className="dl-reviews__subheading" delayMs={100}>{reviewsIntro.subheading}</ScrollReveal>
      <div className="dl-reviews__grid">
        {reviewColumns.map((col, ci) => (
          <div className="dl-reviews__column" key={ci}>
            {col.map((id, ri) => <ReviewCard key={id} review={byId[id]} delayMs={ri * 120} />)}
          </div>
        ))}
      </div>
    </section>
  );
}
