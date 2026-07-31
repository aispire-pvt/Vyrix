import { reviewsIntro, reviews } from '../../models/reviewsModel';
import ReviewCard from '../ReviewCard/ReviewCard';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './ReviewsSection.css';

// Column assignment taken from Figma node 38:396 (updated Reviews layout).
const reviewColumns = [
  ['review-1', 'review-4', 'review-5'],
  ['review-2', 'review-3', 'review-6'],
];

export default function ReviewsSection() {
  const byId = Object.fromEntries(reviews.map((review) => [review.id, review]));

  return (
    <section id="reviews" className="reviews">
      <ScrollReveal as="h2" className="reviews__heading">
        {reviewsIntro.heading}
      </ScrollReveal>
      <ScrollReveal as="p" className="reviews__subheading" delayMs={100}>
        {reviewsIntro.subheading}
      </ScrollReveal>
      <div className="reviews__grid">
        {reviewColumns.map((column, columnIndex) => (
          <div className="reviews__column" key={columnIndex}>
            {column.map((id, rowIndex) => (
              <ReviewCard key={id} review={byId[id]} delayMs={rowIndex * 120} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
