'use client';

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ConflictingProps = 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag';

type SafeButtonHTMLAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps>;

interface ButtonProps extends SafeButtonHTMLAttributes {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, isLoading, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-primary/20',
      secondary: 'bg-surface-secondary text-foreground hover:bg-surface-tertiary border border-border-light',
      accent: 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20',
      outline: 'border-2 border-border text-foreground hover:border-primary hover:text-primary bg-transparent',
      ghost: 'text-secondary hover:text-foreground hover:bg-surface',
      danger: 'bg-error text-white hover:bg-error/90 shadow-lg shadow-error/20',
    };

    const sizes = {
      sm: 'px-5 py-2 text-sm min-h-[40px]',
      md: 'px-7 py-3 text-base min-h-[48px]',
      lg: 'px-9 py-4 text-lg min-h-[56px]',
      icon: 'p-3 min-w-[48px] min-h-[48px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: -1 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-3xl font-medium transition-all duration-300',
          'focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          'touch-target tap-scale',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...(props as MotionProps & SafeButtonHTMLAttributes)}
      >
        {isLoading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-4 h-4" />
          </motion.span>
        )}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span className="tracking-tight">{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';