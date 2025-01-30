import { useState, useEffect } from 'react';
import { AnimationDuration, EasingFunction } from '../types/common';
import { getDuration, getEasing } from '../utils/animation';

interface UseAnimationProps {
  duration?: AnimationDuration | number;
  delay?: number;
  easing?: EasingFunction;
  disabled?: boolean;
  onComplete?: () => void;
}

export const useAnimation = ({
  duration = 'normal',
  delay = 0,
  easing = 'easeOut',
  disabled = false,
  onComplete,
}: UseAnimationProps = {}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const animationDuration = getDuration(duration);
    const timeoutId = setTimeout(() => {
      setIsAnimating(true);
      
      const completeTimeoutId = setTimeout(() => {
        setHasAnimated(true);
        onComplete?.();
      }, animationDuration);

      return () => clearTimeout(completeTimeoutId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [disabled, delay, duration, onComplete]);

  return {
    isAnimating,
    hasAnimated,
    duration: getDuration(duration),
    easing: getEasing(easing),
  };
};
