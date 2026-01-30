import { type HTMLAttributes, type Ref } from 'react';
import { cn } from '@/lib/cn';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardShadow = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'ref'> {
  ref?: Ref<HTMLDivElement>;
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

export function Card({ ref, padding = 'md', shadow = 'none', hover = false, className, children, ...props }: CardProps) {
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

// Card sub-components with refined spacing
interface CardSubComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'ref'> {
  ref?: Ref<HTMLDivElement>;
}

interface CardTitleProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'ref'> {
  ref?: Ref<HTMLHeadingElement>;
}

interface CardTextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'ref'> {
  ref?: Ref<HTMLParagraphElement>;
}

export function CardHeader({ ref, className, ...props }: CardSubComponentProps) {
  return <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />;
}

export function CardTitle({ ref, className, ...props }: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-base font-black leading-tight tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

export function CardByline({ ref, className, ...props }: CardTextProps) {
  return (
    <p
      ref={ref}
      className={cn('text-xs text-foreground-subtle mt-0.5 font-medium', className)}
      {...props}
    />
  );
}

export function CardDescription({ ref, className, ...props }: CardTextProps) {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-foreground-muted leading-relaxed mt-1.5', className)}
      {...props}
    />
  );
}

export function CardContent({ ref, className, ...props }: CardSubComponentProps) {
  return <div ref={ref} className={cn('mt-4', className)} {...props} />;
}

export function CardFooter({ ref, className, ...props }: CardSubComponentProps) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center mt-4 pt-4 border-t border-border', className)}
      {...props}
    />
  );
}

export default Card;
