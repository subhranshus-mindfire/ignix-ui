import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type Gap = "none" | "small" | "normal" | "large" | string;
type Animation = "none" | "fade-in" | "scale-in" | "slide-up";

interface MasonryProps {
  children: ReactNode[];
  columns?: number; // desktop
  mobile?: number; // mobile
  gap?: Gap;
  balanced?: boolean;
  animation?: Animation;
  className?: string;
}

const gapMap: Record<Exclude<Gap, string>, string> = {
  none: "0",
  small: "0.5rem",
  normal: "1rem",
  large: "2rem",
};

const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  mobile = 1,
  gap = "normal",
  balanced = true,
  animation = "none",
  className = "",
}) => {
  const computedGap = gapMap[gap as keyof typeof gapMap] || gap;

  // compute balanced layout directly
  let columnItems: ReactNode[][] = [];
  if (balanced) {
    const colHeights = new Array(columns).fill(0);
    columnItems = Array.from({ length: columns }, () => []);
    React.Children.forEach(children, (child) => {
      const shortest = colHeights.indexOf(Math.min(...colHeights));
      columnItems[shortest].push(child);
      colHeights[shortest] += 1;
    });
  }

  const variants = {
    initial: {
      opacity: 0,
      y: animation === "slide-up" ? 20 : 0,
      scale: animation === "scale-in" ? 0.95 : 1,
    },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  if (balanced) {
    return (
      <div className={`flex w-full ${className}`} style={{ gap: computedGap }} data-testid="masonry-root"
      >
        {columnItems.map((col, i) => (
          <div
            key={i}
            className="flex flex-col"
            style={{ gap: computedGap, flex: 1 }}
          >
            {col.map((child, j) =>
              animation === "none" ? (
                <div key={j}>{child}</div>
              ) : (
                <motion.div
                  key={j}
                  initial="initial"
                  animate="animate"
                  variants={variants}
                  transition={{ duration: 0.3, delay: j * 0.05 }}
                >
                  {child}
                </motion.div>
              )
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-testid="masonry-root"
      className={`masonry ${className}`}
      style={{
        columnCount: mobile,
        columnGap: computedGap,
      }}
    >
      <style>
        {`
          @media (min-width: 768px) {
            .masonry {
              column-count: ${columns};
              column-gap: ${computedGap};
            }
          }
        `}
      </style>

      {React.Children.map(children, (child, idx) =>
        animation === "none" ? (
          <div style={{ breakInside: "avoid", marginBottom: computedGap }}>
            {child}
          </div>
        ) : (
          <motion.div
            key={idx}
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            style={{ breakInside: "avoid", marginBottom: computedGap }}
          >
            {child}
          </motion.div>
        )
      )}
    </div>
  );
};

export default Masonry;
