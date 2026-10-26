import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'gold' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-caption px-2 py-0.5 gap-1 rounded-full font-medium',
    md: 'text-small px-2.5 py-1 gap-1.5 rounded-full font-semibold',
  }[size];

  const variantStyles = {
    default:
      'bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-950/70 dark:text-teal-300 dark:border-teal-800',
    secondary:
      'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    gold:
      'bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
    success:
      'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
    warning:
      'bg-yellow-50 text-yellow-900 border border-yellow-200 dark:bg-yellow-950/70 dark:text-yellow-300 dark:border-yellow-800',
    danger:
      'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/70 dark:text-red-300 dark:border-red-800',
    outline:
      'bg-transparent text-slate-700 border border-slate-300 dark:text-slate-300 dark:border-slate-700',
  }[variant];

  const dotColors = {
    default: 'bg-teal-500',
    secondary: 'bg-slate-400',
    gold: 'bg-amber-500',
    success: 'bg-emerald-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    outline: 'bg-slate-500',
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none tracking-tight transition-colors ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors}`} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
