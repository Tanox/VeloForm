import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-zinc-800 rounded-xl p-4',
        'transition-all duration-200 hover:border-zinc-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
