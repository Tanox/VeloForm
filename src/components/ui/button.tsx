import { forwardRef } from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md',
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        danger:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient:
          'bg-gradient-to-r from-[#e85d2c] via-[#f0875a] to-[#f5a67f] bg-[length:200%_200%] bg-[position:0%_50%] text-white shadow-md hover:shadow-lg hover:shadow-primary/20 hover:bg-[position:100%_50%] border-0',
      },
      size: {
        default: 'h-10 min-h-[44px] px-5 py-2',
        xs: 'h-8 min-h-[36px] px-3 py-1 text-xs rounded-lg',
        sm: 'h-9 min-h-[40px] px-4 py-1.5 text-sm',
        lg: 'h-12 min-h-[48px] px-8 py-3 text-base',
        icon: 'h-10 w-10 min-w-[44px] min-h-[44px]',
        'icon-xs': 'h-8 w-8 min-w-[36px] min-h-[36px] [&_svg]:size-3.5',
        'icon-sm': 'h-9 w-9 min-w-[40px] min-h-[40px] [&_svg]:size-4',
        'icon-lg': 'h-12 w-12 min-w-[48px] min-h-[48px] [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = forwardRef<
  HTMLButtonElement,
  ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
>(function Button({ className, variant, size, ...props }, ref) {
  return (
    <ButtonPrimitive
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

export { Button, buttonVariants };
