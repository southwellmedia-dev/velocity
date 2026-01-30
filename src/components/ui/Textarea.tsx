import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/cn';

type TextareaSize = 'sm' | 'md' | 'lg';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  textareaSize?: TextareaSize;
}

const sizes: Record<TextareaSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm',
  lg: 'px-4 py-3 text-base',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, textareaSize = 'md', className, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    const textareaStyles = cn(
      'w-full rounded-lg border bg-background resize-y min-h-[80px]',
      'transition-colors duration-[--transition-fast]',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      error ? 'border-destructive focus-visible:ring-destructive' : 'border-border',
      sizes[textareaSize]
    );

    return (
      <div className={cn('space-y-1.5', className)}>
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium leading-none">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={textareaStyles}
          rows={rows}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />

        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
