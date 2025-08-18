import React from 'react';
import { cn } from '@site/src/utils/cn';

type ComponentSelectorProps = {
  components: Array<{
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ComponentSelector({
  components,
  activeIndex,
  onSelect,
}: ComponentSelectorProps) {
  return (
    <div className="lg:hidden mb-6 -mx-2 px-2">
      <div className="flex flex-wrap justify-center gap-2">
        {components.map((component, index) => (
          <button
            key={component.id}
            onClick={() => onSelect(index)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
              'transition-colors duration-200 flex items-center gap-2',
              activeIndex === index
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-muted-foreground hover:bg-muted/50',
            )}
          >
            <component.icon className="h-4 w-4" />
            <span>{component.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
