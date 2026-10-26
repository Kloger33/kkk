import React, { forwardRef, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, helperText, error, required, id, className = '', disabled, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-small font-semibold text-slate-800 dark:text-slate-200 select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {/* Critical: text-[16px] (1rem) prevents iOS Safari auto-zoom on select focus */}
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full min-h-[44px] text-[16px] text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border rounded-xl pl-3.5 pr-10 py-2.5 transition-all duration-150 outline-hidden appearance-none cursor-pointer disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed ${
              error
                ? 'border-red-400 ring-2 ring-red-400/20 focus:border-red-600 focus:ring-red-500/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            {error ? <AlertCircle className="w-4 h-4 text-red-500" /> : <ChevronDown className="w-4 h-4" />}
          </div>
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

Select.displayName = 'Select';
