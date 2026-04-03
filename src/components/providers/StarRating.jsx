import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 'sm', showNumber = true }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-accent text-accent'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-foreground ml-0.5">
          {rating?.toFixed(1)}
        </span>
      )}
    </div>
  );
}
