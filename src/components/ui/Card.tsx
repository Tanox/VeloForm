'use client';

import { ReactNode, forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';

type ConflictingProps = 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag';
type SafeHTMLAttributes = Omit<HTMLAttributes<HTMLDivElement>, ConflictingProps>;

interface CardProps extends SafeHTMLAttributes {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hoverable?: boolean;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hoverable = false, className, ...props }, ref) => {
    const variants = {
      default: 'bg-surface-secondary border border-border-light',
      elevated: 'bg-surface-secondary border border-border-light shadow-apple',
      outlined: 'bg-background border border-border',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -6, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } } : {}}
        className={cn(
          'rounded-3xl p-8 transition-all duration-300',
          variants[variant],
          hoverable && 'cursor-pointer hover:shadow-apple-lg',
          className
        )}
        {...(props as MotionProps & SafeHTMLAttributes)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-6 pb-6 border-b border-border-light', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-6 pt-6 border-t border-border-light', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';