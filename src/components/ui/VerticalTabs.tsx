import { useState, useId, useCallback, Children, isValidElement, cloneElement, type ReactNode, type ReactElement, type KeyboardEvent } from 'react';
import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';

export interface VerticalTab {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface VerticalTabsProps {
  /** Array of tab definitions */
  tabs: VerticalTab[];
  /** Default selected tab ID (uncontrolled mode) */
  defaultValue?: string;
  /** Current selected tab ID (controlled mode) */
  value?: string;
  /** Callback when tab changes */
  onChange?: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Tab panel content - use data-tab-content="id" attribute on children */
  children: ReactNode;
}

/**
 * VerticalTabs Component
 *
 * Responsive vertical tabs with:
 * - Desktop (lg+): Vertical sidebar with tabs on left, content on right
 * - Mobile (< lg): Select dropdown to choose tabs, full-width content below
 *
 * @example
 * <VerticalTabs tabs={[{ id: 'a', label: 'Tab A' }, { id: 'b', label: 'Tab B' }]}>
 *   <div data-tab-content="a">Content A</div>
 *   <div data-tab-content="b">Content B</div>
 * </VerticalTabs>
 */
export function VerticalTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  className,
  children,
}: VerticalTabsProps) {
  const generatedId = useId();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.id ?? '');

  const activeTab = isControlled ? value : internalValue;

  const handleTabChange = useCallback((id: string) => {
    if (!isControlled) {
      setInternalValue(id);
    }
    onChange?.(id);
  }, [isControlled, onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowDown':
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    const newTab = tabs[newIndex];
    if (newTab) {
      handleTabChange(newTab.id);
      // Focus the new tab button
      const tabButton = document.getElementById(`vtab-${generatedId}-${newTab.id}`);
      tabButton?.focus();
    }
  }, [tabs, generatedId, handleTabChange]);

  // Process children to add visibility control - render only once
  const contentPanels = Children.map(children, (child) => {
    if (!isValidElement(child)) return null;

    const tabContentId = (child.props as Record<string, unknown>)?.['data-tab-content'] as string | undefined;
    if (!tabContentId) return child;

    const isActive = tabContentId === activeTab;

    return cloneElement(child as ReactElement<Record<string, unknown>>, {
      role: 'tabpanel',
      id: `vtab-panel-${generatedId}-${tabContentId}`,
      'aria-labelledby': `vtab-${generatedId}-${tabContentId}`,
      tabIndex: 0,
      style: { display: isActive ? undefined : 'none' },
      className: cn(
        (child.props as Record<string, string | undefined>)?.className,
        'outline-none rounded-md',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      ),
    });
  });

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Select Dropdown (hidden on lg+) */}
      <div className="lg:hidden mb-6">
        <label htmlFor={`vtab-select-${generatedId}`} className="sr-only">
          Select tab
        </label>
        <div className="relative">
          <select
            id={`vtab-select-${generatedId}`}
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value)}
            className={cn(
              'w-full rounded-lg border border-border bg-background appearance-none cursor-pointer',
              'px-4 py-3 pr-10 text-sm font-medium',
              'transition-colors duration-[--transition-fast]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}{tab.description ? ` — ${tab.description}` : ''}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-foreground-muted"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid layout: stacked on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        {/* Desktop Tab List Sidebar (hidden on mobile) */}
        <div
          className="hidden lg:flex lg:col-span-4 flex-col gap-1"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Vertical tabs"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                id={`vtab-${generatedId}-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`vtab-panel-${generatedId}-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  'group flex flex-col items-start rounded-md p-4 text-left transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-secondary ring-border shadow-sm ring-1'
                    : 'hover:bg-background-secondary hover:pl-5'
                )}
              >
                <span
                  className={cn(
                    'font-display flex items-center gap-2 text-base font-bold',
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400'
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        'h-5 w-5',
                        isActive
                          ? 'text-brand-500'
                          : 'text-foreground-subtle group-hover:text-brand-500'
                      )}
                      strokeWidth={2}
                    />
                  )}
                  {tab.label}
                </span>
                {tab.description && (
                  <span className={cn(
                    'text-foreground-muted mt-1 text-sm',
                    Icon ? 'pl-7' : ''
                  )}>
                    {tab.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area - single render, works for both mobile and desktop */}
        <div className="col-span-1 lg:col-span-8">
          {contentPanels}
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;
