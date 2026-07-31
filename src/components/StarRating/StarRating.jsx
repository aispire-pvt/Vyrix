import starIcon from '../../assets/images/star-rating.svg';
import './StarRating.css';

export default function StarRating({ rating, maxRating = 5 }) {
  return (
    <div className="star-rating" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      {Array.from({ length: rating }, (_, index) => (
        <img key={index} src={starIcon} alt="" aria-hidden="true" className="star-rating__star" />
      ))}
    </div>
  );
}
