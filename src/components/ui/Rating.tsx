import React from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number;
  max?: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  reviewsCount,
  size = 'md',
  showScore = true,
  interactive = false,
  onChange,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const textSizes = {
    sm: 'text-caption',
    md: 'text-small',
    lg: 'text-body font-bold',
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      {/* Stars row */}
      <div className="flex items-center gap-0.5" role={interactive ? 'radiogroup' : undefined}>
        {Array.from({ length: max }).map((_, index) => {
          const starNumber = index + 1;
          const isFilled = value >= starNumber;
          const isPartiallyFilled = !isFilled && value > index && value < starNumber;
          const fillPercentage = isPartiallyFilled ? Math.round((value - index) * 100) : 0;

          if (interactive) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => onChange && onChange(starNumber)}
                className="cursor-pointer hover:scale-110 transition-transform p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded"
                aria-label={`Rate ${starNumber} of ${max} stars`}
              >
                <Star
                  className={`${iconSizes} ${
                    isFilled ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                  }`}
                />
              </button>
            );
          }

          if (isPartiallyFilled) {
            return (
              <div key={index} className="relative inline-block">
                <Star className={`${iconSizes} text-slate-200`} />
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star className={`${iconSizes} fill-amber-400 text-amber-500`} />
                </div>
              </div>
            );
          }

          return (
            <Star
              key={index}
              className={`${iconSizes} ${
                isFilled ? 'fill-amber-400 text-amber-500' : 'text-slate-200 dark:text-slate-700'
              }`}
            />
          );
        })}
      </div>

      {/* Numeric Score */}
      {showScore && (
        <span className={`font-bold text-slate-800 dark:text-slate-200 font-sans ${textSizes}`}>
          {value.toFixed(1)}
        </span>
      )}

      {/* Reviews count badge */}
      {typeof reviewsCount === 'number' && (
        <span className="text-caption text-slate-400 dark:text-slate-500 font-normal">
          ({reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};
