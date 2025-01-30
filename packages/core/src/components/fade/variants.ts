import { FadeProps } from '../../types/animation';

export const fadeVariants = {
  initial: (props: FadeProps) => ({
    opacity: 0,
  }),
  animate: (props: FadeProps) => ({
    opacity: props.opacity ?? 1,
    transition: {
      duration: props.duration,
      delay: props.delay,
      ease: props.easing,
    },
  }),
  exit: (props: FadeProps) => ({
    opacity: 0,
    transition: {
      duration: props.duration,
      ease: props.easing,
    },
  }),
};
