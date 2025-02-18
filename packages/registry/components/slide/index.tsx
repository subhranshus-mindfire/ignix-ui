import { motion } from "framer-motion";
import { cn } from "../../utils/cn";


interface SlideProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

export const Slide = ({
  children,
  direction = "up",
  duration = 0.4,
  className
}: SlideProps) => {
  const slideVariants = {
    initial: {
      opacity: 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      y: direction === "up" ? -20 : direction === "down" ? 20 : 0
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideVariants}
      transition={{ duration }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};
