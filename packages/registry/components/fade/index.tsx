import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface FadeProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export const Fade = ({
  children,
  duration = 0.4,
  className
}: FadeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};
