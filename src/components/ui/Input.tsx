import React, { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      required,
      id,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-small font-semibold text-slate-800 dark:text-slate-200 select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500 shrink-0">
              {leftIcon}
            </div>
          )}

          {/* Critical: text-[16px] (1rem) prevents iOS Safari auto-zoom on input focus */}
          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full min-h-[44px] text-[16px] text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border rounded-xl py-2.5 transition-all duration-150 outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed ${
              leftIcon ? 'pl-11' : 'pl-3.5'
            } ${rightIcon || error ? 'pr-11' : 'pr-3.5'} ${
              error
                ? 'border-red-400 ring-2 ring-red-400/20 focus:border-red-600 focus:ring-red-500/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20'
            } ${className}`}
            {...props}
          />

          {error ? (
            <div className="absolute right-3.5 text-red-500 pointer-events-none">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : (
            rightIcon && (
              <div className="absolute right-3.5 pointer-events-none text-slate-400">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {error ? (
          <p id={errorId} className="text-caption font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-caption text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
