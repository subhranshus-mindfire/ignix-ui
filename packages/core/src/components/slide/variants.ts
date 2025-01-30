import { SlideProps } from '../../types/animation';

const getSlideOffset = (direction: string, distance: number | string): string | number => {
  if (typeof distance === 'string') return distance;

  switch (direction) {
    case 'up':
      return `-${distance}px`;
    case 'down':
      return `${distance}px`;
    case 'left':
      return `-${distance}px`;
    case 'right':
      return `${distance}px`;
    default:
      return 0;
  }
};

export const slideVariants = {
  initial: ({ direction, distance = 50 }: SlideProps) => ({
    opacity: 0,
    x: direction === 'left' || direction === 'right' ? getSlideOffset(direction, distance) : 0,
    y: direction === 'up' || direction === 'down' ? getSlideOffset(direction, distance) : 0,
  }),

  animate: ({ duration = 0.5, delay = 0, easing = 'easeOut' }: SlideProps) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: easing,
    },
  }),

  exit: ({ direction, distance = 50, duration = 0.5, easing = 'easeOut' }: SlideProps) => ({
    opacity: 0,
    x: direction === 'left' || direction === 'right' ? getSlideOffset(direction, distance) : 0,
    y: direction === 'up' || direction === 'down' ? getSlideOffset(direction, distance) : 0,
    transition: {
      duration,
      ease: easing,
    },
  }),
};
