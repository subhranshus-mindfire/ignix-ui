import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideProps } from "../../types/animation";
import { slideVariants } from "./variants";
import { useAnimation } from "../../hooks/use-animation";

export const Slide: React.FC<SlideProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  easing = "easeOut",
  disabled = false,
  onComplete,
  className,
  direction = "up",
  distance = 50,
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
          animate={isAnimating ? "animate" : "initial"}
          exit="exit"
          variants={slideVariants}
          custom={{ duration, delay, easing, direction, distance }} // Pass custom props here
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
