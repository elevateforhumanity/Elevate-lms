"use client";

import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ACCORDION COMPONENT - 10/10
 *
 * Mobile collapse pattern.
 *
 * On mobile: Show title + 1-2 lines + "Expand"
 * On desktop: Show full section (or keep collapsed)
 *
 * This keeps "everything accessible" without making page endless.
 */

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  alwaysOpenOnDesktop?: boolean;
  className?: string;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
  alwaysOpenOnDesktop = false,
  className,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border-b border-slate-200', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between py-4 text-left',
          'hover:text-blue-600 transition-colors',
          alwaysOpenOnDesktop && 'md:cursor-default md:hover:text-black'
        )}
        disabled={alwaysOpenOnDesktop}
      >
        <span className="font-semibold text-lg">{title}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 transition-transform duration-200',
            isOpen && 'rotate-180',
            alwaysOpenOnDesktop && 'md:hidden'
          )}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen || (alwaysOpenOnDesktop && 'md:block')
            ? 'max-h-[2000px] pb-4'
            : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * ACCORDION GROUP
 *
 * For multiple accordions that should only have one open at a time
 */

interface AccordionGroupProps {
  items: Array<{
    title: string;
    content: ReactNode;
  }>;
  defaultOpenIndex?: number;
  className?: string;
}

export function AccordionGroup({
  items,
  defaultOpenIndex = 0,
  className,
}: AccordionGroupProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div className={cn('divide-y divide-slate-200', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full flex items-center justify-between py-4 text-left hover:text-blue-600 transition-colors"
          >
            <span className="font-semibold text-lg">{item.title}</span>
            <ChevronDown
              className={cn(
                'h-5 w-5 transition-transform duration-200',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>

          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              openIndex === index ? 'max-h-[2000px] pb-4' : 'max-h-0'
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
