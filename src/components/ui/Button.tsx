'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white',
<<<<<<< HEAD
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-foreground hover:bg-card',
=======
    outline: 'border-2 border-zinc-700 text-foreground hover:bg-zinc-800 hover:text-white',
    ghost: 'text-foreground hover:bg-zinc-800',
>>>>>>> origin/main
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200',
<<<<<<< HEAD
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
=======
        'focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed',
>>>>>>> origin/main
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
