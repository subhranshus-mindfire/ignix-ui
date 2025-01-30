export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type EasingFunction = 
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'springLight'
  | 'springMedium'
  | 'springHeavy';

export interface BaseAnimationProps {
  duration?: AnimationDuration | number;
  delay?: number;
  easing?: EasingFunction;
  disabled?: boolean;
  onComplete?: () => void;
  className?: string;
}

