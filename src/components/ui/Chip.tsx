import React from 'react';
import { Check, X } from 'lucide-react';

export interface ChipProps {
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  selected = false,
  onToggle,
  size = 'md',
  icon,
  removable = false,
  onRemove,
  disabled = false,
  children,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-caption px-2.5 py-1 min-h-[36px] sm:min-h-[30px] gap-1.5 rounded-full',
    md: 'text-small px-3.5 py-1.5 min-h-[44px] sm:min-h-[36px] gap-2 rounded-full font-medium',
  }[size];

  const handleClick = () => {
    if (disabled) return;
    if (onToggle) onToggle(!selected);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (onToggle) onToggle(!selected);
    }
  };

  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center justify-center select-none cursor-pointer transition-all duration-150 border focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles} ${
        selected
          ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold shadow-xs ring-1 ring-teal-600/30'
          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
      } ${className}`}
    >
      {selected ? (
        <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
      ) : (
        icon && <span className="shrink-0 text-slate-500">{icon}</span>
      )}

      <span>{children}</span>

      {removable && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove filter"
          onClick={(e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-3 h-3" />
        </span>
      )}
    </button>
  );
};
