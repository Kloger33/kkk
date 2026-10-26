import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Mobile touch target: min-height 44px ensures high touch accessibility
    const sizeStyles = {
      sm: 'text-small px-3 py-1.5 min-h-[44px] sm:min-h-[36px] gap-1.5 rounded-md',
      md: 'text-small px-4 py-2.5 min-h-[44px] gap-2 rounded-lg font-semibold',
      lg: 'text-body px-6 py-3 min-h-[48px] gap-2.5 rounded-xl font-bold',
    }[size];

    const variantStyles = {
      primary:
        'bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white shadow-sm hover:shadow transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2',
      secondary:
        'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#0F766E]',
      ghost:
        'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#0F766E]',
      gold:
        'bg-[#D4A017] hover:bg-[#B8870F] active:bg-[#92400E] text-amber-950 font-bold shadow-sm hover:shadow transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2',
    }[variant];

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        className={`inline-flex items-center justify-center select-none font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles} ${variantStyles} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
