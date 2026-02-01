import { type InputHTMLAttributes, type Ref, type ReactNode, useId } from 'react';
import { cn } from '@/lib/cn';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref' | 'size'> {
  ref?: Ref<HTMLInputElement>;
  label?: string;
  error?: string;
  hint?: string;
  /** Icon to display at the start of the input */
  leadingIcon?: ReactNode;
  /** Icon to display at the end of the input */
  trailingIcon?: ReactNode;
  /** @deprecated Use `size` instead */
  inputSize?: InputSize;
  size?: InputSize;
}

const sizes: Record<InputSize, { input: string; iconWrapper: string; leadingPadding: string; trailingPadding: string }> = {
  sm: {
    input: 'h-8 text-sm',
    iconWrapper: 'w-8',
    leadingPadding: 'pl-8',
    trailingPadding: 'pr-8',
  },
  md: {
    input: 'h-10 text-sm',
    iconWrapper: 'w-10',
    leadingPadding: 'pl-10',
    trailingPadding: 'pr-10',
  },
  lg: {
    input: 'h-12 text-base',
    iconWrapper: 'w-12',
    leadingPadding: 'pl-12',
    trailingPadding: 'pr-12',
  },
};

const basePadding: Record<InputSize, string> = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-4',
};

export function Input({ ref, label, error, hint, leadingIcon, trailingIcon, inputSize, size = 'md', className, id, ...props }: InputProps) {
  const resolvedSize = inputSize ?? size;
  const generatedId = useId();
  const inputId = id || generatedId;
  const sizeConfig = sizes[resolvedSize];

  const inputStyles = cn(
    'w-full rounded-lg border bg-background',
    'transition-colors duration-[--transition-fast]',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error ? 'border-destructive focus-visible:ring-destructive' : 'border-border',
    sizeConfig.input,
    leadingIcon ? sizeConfig.leadingPadding : basePadding[resolvedSize].split(' ')[0],
    trailingIcon ? sizeConfig.trailingPadding : basePadding[resolvedSize]
  );

  const iconStyles = cn(
    'absolute top-0 flex items-center justify-center h-full pointer-events-none',
    'text-foreground-muted',
    sizeConfig.iconWrapper
  );

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium leading-none">
          {label}
        </label>
      )}

      <div className="relative">
        {leadingIcon && (
          <div className={cn(iconStyles, 'left-0')}>
            {leadingIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputStyles}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />

        {trailingIcon && (
          <div className={cn(iconStyles, 'right-0')}>
            {trailingIcon}
          </div>
        )}
      </div>

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
