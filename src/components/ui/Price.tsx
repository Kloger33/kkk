import React from 'react';

export interface PriceProps {
  amount: number;
  currency?: string;
  period?: string;
  originalAmount?: number;
  khrEquivalent?: number | boolean;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  currency = '$',
  period,
  originalAmount,
  khrEquivalent = true,
  size = 'md',
  highlight = false,
  className = '',
}) => {
  const KHR_RATE = 4100; // Standard NBC / ABA settlement rate (KHR per USD)
  const computedKhr =
    typeof khrEquivalent === 'number'
      ? khrEquivalent
      : khrEquivalent
      ? Math.round(amount * KHR_RATE)
      : null;

  const sizeStyles = {
    sm: {
      amount: 'text-body font-bold',
      currency: 'text-small font-semibold',
      period: 'text-caption text-slate-500',
      khr: 'text-caption text-slate-400',
    },
    md: {
      amount: 'text-h2 font-extrabold',
      currency: 'text-body font-bold',
      period: 'text-small text-slate-500',
      khr: 'text-caption text-slate-400',
    },
    lg: {
      amount: 'text-h1 font-black',
      currency: 'text-h3 font-bold',
      period: 'text-small text-slate-500',
      khr: 'text-small text-slate-400',
    },
  }[size];

  const formattedAmount = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);

  return (
    <div className={`inline-flex flex-col select-none leading-none ${className}`}>
      <div className="inline-flex items-baseline gap-1">
        {/* Original strikethrough if discounted */}
        {originalAmount && (
          <span className="text-small text-slate-400 line-through mr-1 font-medium">
            {currency}
            {originalAmount}
          </span>
        )}

        {/* Currency symbol */}
        <span
          className={`${sizeStyles.currency} ${
            highlight ? 'text-teal-700 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {currency}
        </span>

        {/* Main Amount */}
        <span
          className={`font-mono tracking-tight ${sizeStyles.amount} ${
            highlight ? 'text-teal-700 dark:text-teal-400' : 'text-slate-900 dark:text-slate-100'
          }`}
        >
          {formattedAmount}
        </span>

        {/* Period (e.g., /hr, /lesson) */}
        {period && <span className={`font-normal ${sizeStyles.period}`}>{period}</span>}
      </div>

      {/* Khmer Riel (KHR) approximate conversion */}
      {computedKhr && (
        <span className={`font-sans mt-0.5 ${sizeStyles.khr}`} title="Approximate exchange rate">
          ≈ ៛{computedKhr.toLocaleString()}
        </span>
      )}
    </div>
  );
};
