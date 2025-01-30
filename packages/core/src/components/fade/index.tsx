import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeProps } from '../../types/animation';
import { fadeVariants } from './variants';
import { useAnimation } from '../../hooks/use-animation';

export const Fade: React.FC<FadeProps> = ({
  children,
  duration = 'normal',
  delay = 0,
  easing = 'easeOut',
  disabled = false,
  onComplete,
  className,
  opacity = 1,
}) => {
  const { isAnimating, hasAnimated } = useAnimation({
    duration,
    delay,
    easing,
    disabled,
    onComplete,
  });

  return (
    <AnimatePresence>
      {!disabled && (
        <motion.div
          className={className}
          initial="initial"
          animate={isAnimating ? 'animate' : 'initial'}
          exit="exit"
          variants={fadeVariants}
          custom={{ duration, delay, easing, opacity }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
