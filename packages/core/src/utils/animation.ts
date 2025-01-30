import { EasingFunction, AnimationDuration } from '../types/common';

export const easings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  springLight: [0.34, 1.56, 0.64, 1],
  springMedium: [0.28, 2.1, 0.63, 1],
  springHeavy: [0.2, 2.5, 0.6, 1],
};

export const durations = {
  fast: 150,
  normal: 300,
  slow: 450,
};

export const getDuration = (duration: AnimationDuration | number): number => {
  if (typeof duration === 'number') return duration;
  return durations[duration];
};

export const getEasing = (easing: EasingFunction): number[] => {
  return easings[easing];
};
