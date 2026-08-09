import Image from "next/image";

export default function StarRating({ rating, maxRating = 5 }: { rating: number; maxRating?: number }) {
  return (
    <div className="dl-star-rating" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      {Array.from({ length: rating }, (_, i) => (
        <Image key={i} src="/downloads/star-rating.svg" alt="" aria-hidden width={17} height={17} className="dl-star-rating__star" />
      ))}
    </div>
  );
}
