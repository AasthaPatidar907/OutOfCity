import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
}

export default function StarRating({ rating, size = 16, showValue = true, reviews }: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const half = i === full && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={
                filled || half
                  ? "text-amber-400 fill-amber-400"
                  : "text-slate-300 fill-slate-300"
              }
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-slate-600">
          {rating.toFixed(1)}
          {reviews !== undefined && (
            <span className="text-slate-400"> ({reviews})</span>
          )}
        </span>
      )}
    </div>
  );
}
