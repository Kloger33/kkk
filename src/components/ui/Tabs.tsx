import React from 'react';
import { motion } from 'motion/react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  variant = 'pills',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-caption py-1.5 px-3 min-h-[36px] gap-1.5',
    md: 'text-small py-2 px-4 min-h-[44px] gap-2',
  }[size];

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`inline-flex items-center gap-1.5 ${
        variant === 'pills'
          ? 'p-1 bg-slate-100 dark:bg-slate-800 rounded-xl'
          : 'border-b border-slate-200 dark:border-slate-800'
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={`relative inline-flex items-center justify-center font-semibold rounded-lg select-none cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles} ${
              variant === 'underline'
                ? isActive
                  ? 'text-[#0F766E] dark:text-teal-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                : isActive
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {/* Sliding Pill Background or Underline Indicator */}
            {isActive && variant === 'pills' && (
              <motion.div
                layoutId="activeTabPill"
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-xs"
              />
            )}

            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="activeTabUnderline"
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F766E] dark:bg-teal-400"
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.badge !== 'undefined' && (
                <span
                  className={`text-caption font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
