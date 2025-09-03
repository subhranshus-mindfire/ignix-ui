import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' ;
  direction?: 'vertical' | 'horizontal' | 'both';
}

const spacerVariants = cva('', {
  variants: {
    size: {
      xs: 'h-1 w-1',
      sm: 'h-2 w-2',
      md: 'h-4 w-4',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    direction: {
      vertical: 'w-0',
      horizontal: 'h-0',
      both: '',
    },
  },
  defaultVariants: {
    size: 'md',
    direction: 'vertical',
  },
});

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, direction, style, ...props }, ref) => {
    // Handle custom numeric/string size (e.g., "12px", "2rem", "20")
    const isCustomSize =
      size && !['xs', 'sm', 'md', 'lg', 'xl'].includes(size);

    const dynamicStyle: React.CSSProperties = { ...style };
    if (isCustomSize) {
      const value = /^\d+$/.test(size as string) ? `${size}px` : size;
      if (direction === 'vertical') dynamicStyle.height = value;
      else if (direction === 'horizontal') dynamicStyle.width = value;
      else {
        dynamicStyle.height = value;
        dynamicStyle.width = value;
      }
    }

    return (
      <div
        ref={ref}
        className={cn(spacerVariants({ size, direction }), className)}
        style={dynamicStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export { Spacer, spacerVariants };
