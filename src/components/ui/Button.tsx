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
      primary: 'bg-primary text-white hover:bg-[var(--primary-hover)]',
      secondary: 'bg-surface-tertiary text-foreground hover:bg-border/50 border border-border',
      accent: 'bg-accent text-white hover:bg-accent/90',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-secondary hover:text-foreground hover:bg-surface-tertiary',
      danger: 'bg-error text-white hover:bg-error/90',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-2.5 text-base min-h-[44px]',
      lg: 'px-8 py-3.5 text-lg min-h-[52px]',
      icon: 'p-2.5 min-w-[44px] min-h-[44px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
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
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-4 h-4" />
          </motion.span>
        )}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';