import { type InputHTMLAttributes, type Ref, useId } from 'react';
import { cn } from '@/lib/cn';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  ref?: Ref<HTMLInputElement>;
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
}

const sizes: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-base',
};

export function Input({ ref, label, error, hint, inputSize = 'md', className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const inputStyles = cn(
    'w-full rounded-lg border bg-background',
    'transition-colors duration-[--transition-fast]',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error ? 'border-destructive focus-visible:ring-destructive' : 'border-border',
    sizes[inputSize]
  );

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium leading-none">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        className={inputStyles}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export default Input;
