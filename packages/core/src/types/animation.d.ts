import { BaseAnimationProps, AnimationDirection } from './common';

export interface FadeProps extends BaseAnimationProps {
  children?: ReactNode;
  opacity?: number;
}

export interface ScaleProps extends BaseAnimationProps {
  scale?: number;
}

export interface SlideProps extends BaseAnimationProps {
  children?: React.ReactNode;
  duration?: number;
  delay?: number;
  easing?: "easeIn" | "easeOut" | "linear" | "easeInOut";
  disabled?: boolean;
  onComplete?: () => void;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}
