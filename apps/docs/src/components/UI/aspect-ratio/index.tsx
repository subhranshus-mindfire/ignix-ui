import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: '1:1' | '4:3' | '16:9' | '21:9' | string;
  maxWidth?: string | number;
  children: React.ReactNode;
}

const parseRatio = (ratio: string) => {
  const [w, h] = ratio.split(':').map(Number);
  return w && h ? { w, h } : { w: 1, h: 1 };
};

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = '1:1', maxWidth, children, className, style, ...props }, ref) => {
    const { w, h } = parseRatio(ratio);

    const isAspectRatioSupported =
      typeof CSS !== 'undefined' && CSS.supports('aspect-ratio', '1/1');

    const containerStyle: React.CSSProperties = {
      width: '100%',
      maxWidth,
      ...style,
    };

    if (isAspectRatioSupported) {
      containerStyle.aspectRatio = `${w} / ${h}`;
    } else {
      containerStyle.position = 'relative';
      containerStyle.paddingBottom = `${(h / w) * 100}%`;
    }

    const contentStyle: React.CSSProperties = isAspectRatioSupported
      ? { width: '100%', height: '100%' }
      : {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        };

    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === 'img') {
        return React.cloneElement(child, {
          className: cn(child.props.className, 'object-cover w-full h-full'),
        });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn('aspect-ratio-container', className)}
        style={containerStyle}
        {...props}
      >
        <div style={contentStyle}>{enhancedChildren}</div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
