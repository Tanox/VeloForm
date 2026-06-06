'use client';

import { ReactNode, forwardRef, ComponentProps, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';

type SafeHTMLAttributes = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>;

interface CardProps extends SafeHTMLAttributes {
  children: ReactNode;
  variant?: 'default' | 'stat' | 'component' | 'glass';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', hover = true, padding = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-card/80 backdrop-blur-sm border border-zinc-800',
      stat: 'bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-xl border border-zinc-700/50 shadow-lg shadow-black/20',
      component: 'bg-card/60 backdrop-blur-md border border-zinc-800/50 hover:border-primary/20',
      glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { scale: 1.02, y: -2 } : {}}
        transition={{ duration: 0.2 }}
        className={cn(
          'rounded-2xl',
          variants[variant],
          paddings[padding],
          'transition-all duration-300 ease-out',
          hover && 'hover:shadow-xl hover:shadow-primary/5',
          className
        )}
        {...(props as unknown as MotionProps & React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-display font-bold text-foreground', className)} {...props}>
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted mt-1', className)} {...props}>
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
