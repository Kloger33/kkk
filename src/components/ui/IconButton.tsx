import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** Explicitly required for accessibility */
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      'aria-label': ariaLabel,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Min 44x44px touch target on mobile for WCAG touch accessibility
    const sizeStyles = {
      sm: 'w-11 h-11 sm:w-8 sm:h-8 p-1.5 rounded-md text-small',
      md: 'w-11 h-11 p-2.5 rounded-lg text-body',
      lg: 'w-12 h-12 p-3 rounded-xl text-h3',
    }[size];

    const variantStyles = {
      primary:
        'bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white shadow-xs focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2',
      secondary:
        'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs focus-visible:ring-2 focus-visible:ring-[#0F766E]',
      ghost:
        'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-[#0F766E]',
      gold:
        'bg-[#D4A017] hover:bg-[#B8870F] active:bg-[#92400E] text-amber-950 font-bold shadow-xs focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2',
    }[variant];

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        disabled={isDisabled}
        aria-busy={loading}
        className={`inline-flex items-center justify-center shrink-0 select-none transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
