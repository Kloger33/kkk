import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-xl',
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-slate-200/80 dark:bg-slate-800 ${variantStyles} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};
