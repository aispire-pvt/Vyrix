import StarRating from '../StarRating/StarRating';
import { useScrollAnimation } from '../../controllers/useScrollAnimation.jsx';
import './ReviewCard.css';

export default function ReviewCard({ review, delayMs = 0 }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <article
      ref={ref}
      className={`review-card ${isVisible ? 'review-card--visible' : ''}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <StarRating rating={review.rating} />
      <p className="review-card__text">{review.text}</p>
    </article>
  );
}
