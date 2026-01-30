import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardShadow = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  shadow?: CardShadow;
  hover?: boolean;
}

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const shadows: Record<CardShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', shadow = 'none', hover = false, className, children, ...props }, ref) => {
    const cardStyles = cn(
      'rounded-xl border border-border bg-card',
      'transition-all duration-200 ease-out',
      paddings[padding],
      shadows[shadow],
      hover && [
        'cursor-pointer',
        'hover:border-border-strong',
        'hover:shadow-md',
        'hover:-translate-y-0.5',
      ],
      className
    );

    return (
      <div ref={ref} className={cardStyles} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components with refined spacing
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-base font-semibold leading-tight tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-foreground-muted leading-relaxed', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center mt-4 pt-4 border-t border-border', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
