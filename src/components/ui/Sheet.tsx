import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Responsive: bottom sheet on mobile, centered dialog or side drawer on desktop */
  variant?: 'responsive' | 'side' | 'center';
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  variant = 'responsive',
  className = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc key listener & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Swipe-down to close handler on mobile
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 300) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Dialog'}
          className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center overflow-hidden"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            drag={variant !== 'center' ? 'y' : false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            initial={
              variant === 'side'
                ? { x: '100%', opacity: 1 }
                : variant === 'center'
                ? { scale: 0.95, opacity: 0 }
                : { y: '100%', opacity: 1 }
            }
            animate={
              variant === 'side'
                ? { x: 0, opacity: 1 }
                : variant === 'center'
                ? { scale: 1, opacity: 1 }
                : { y: 0, opacity: 1 }
            }
            exit={
              variant === 'side'
                ? { x: '100%', opacity: 1 }
                : variant === 'center'
                ? { scale: 0.95, opacity: 0 }
                : { y: '100%', opacity: 1 }
            }
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`relative z-10 w-full max-h-[90vh] md:max-h-[85vh] bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col ${
              variant === 'side'
                ? 'md:fixed md:top-0 md:right-0 md:h-full md:max-h-full md:w-[480px] md:rounded-l-3xl rounded-t-3xl'
                : variant === 'center'
                ? 'md:max-w-lg md:rounded-3xl rounded-t-3xl mx-auto'
                : 'md:max-w-xl md:rounded-3xl rounded-t-3xl mx-auto'
            } ${className}`}
          >
            {/* Mobile Drag Indicator Handle */}
            <div className="w-full flex items-center justify-center pt-3 pb-1 md:hidden cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div>
                {title && (
                  <h3 className="text-h3 font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-small text-slate-500 dark:text-slate-400 mt-0.5">
                    {description}
                  </p>
                )}
              </div>

              <IconButton
                aria-label="Close dialog"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </IconButton>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
