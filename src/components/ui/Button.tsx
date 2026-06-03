'use client';

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
      primary: 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40',
      secondary: 'bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white shadow-lg shadow-secondary/20 hover:shadow-secondary/40',
      accent: 'bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white shadow-lg shadow-accent/20 hover:shadow-accent/40',
      outline: 'border-2 border-zinc-600 text-foreground hover:bg-zinc-800 hover:border-zinc-500 hover:text-white',
      ghost: 'text-foreground hover:bg-zinc-800 hover:text-white',
      danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-6 py-2.5 text-base min-h-[44px]',
      lg: 'px-8 py-3.5 text-lg min-h-[52px]',
      icon: 'p-2.5 min-w-[44px] min-h-[44px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.96 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
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
