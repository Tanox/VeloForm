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
        'bg-card/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5',
        'transition-all duration-300 ease-out hover:border-zinc-700 hover:shadow-xl hover:shadow-primary/5',
        'hover:translate-y-[-2px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
