import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'gold' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-xs ${className}`}
    >
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800 flex items-center justify-center text-[#0F766E] dark:text-teal-400 shadow-xs">
        {icon}
      </div>

      <div className="max-w-md space-y-1.5">
        <h3 className="text-h3 font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h3>
        <p className="text-small text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {action && (
            <Button
              variant={action.variant || 'primary'}
              size="md"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              variant="secondary"
              size="md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
