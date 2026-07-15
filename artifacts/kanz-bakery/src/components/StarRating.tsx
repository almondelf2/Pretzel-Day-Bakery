import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export function StarRating({ rating, maxRating = 5, size = 'md', showValue = false }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= Math.round(rating);

        return (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              filled ? 'fill-primary text-primary' : 'fill-muted text-muted'
            }`}
          />
        );
      })}
      {showValue && (
        <span className={`ml-1 font-medium text-muted-foreground ${textSizeClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
