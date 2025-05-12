"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  options: string[];
  selected?: number;
  value?: (index: number) => void;
}

const tabsVariants = cva("relative flex items-center", {
  variants: {
    variant: {
      underline: "border-b-2 border-transparent border-blue-500",
      filled: "bg-blue-500 text-white",
      pill: "bg-blue-500 text-white rounded-full px-4 py-2",
      outline: "border border-blue-500 text-blue-500 rounded-md px-4 py-2",
      ghost:
        "bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2",
      shadow: "shadow-lg bg-white text-gray-900 rounded-md px-4 py-2",
      gradient:
        "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md px-4 py-2",
      glow: "bg-white text-gray-900 rounded-md px-4 py-2 shadow-lg shadow-blue-500/50",
      block: "border border-gray-300 rounded-md",
    },
    theme: {
      light: "bg-white text-gray-900",
      dark: "bg-gray-900 text-white",
      glass: "bg-white/10 backdrop-blur-lg text-white",
      glassDark: "bg-gray-900/10 backdrop-blur-lg text-white",
      glassLight: "bg-white/10 backdrop-blur-lg text-gray-900",
      glassGradient:
        "bg-gradient-to-r from-blue-500 to-purple-500/10 backdrop-blur-lg text-white",
      glassGradientDark:
        "bg-gradient-to-r from-blue-500 to-purple-500/10 backdrop-blur-lg text-gray-900",
    },

    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "underline",
    size: "md",
  },
});

export const Tabs: React.FC<TabsProps> = ({
  options,
  selected = 0,
  value,
  variant = "underline",
  size = "md",
  className,
  theme,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(selected);

  return (
    <div
      className={cn(
        "relative flex space-x-4",
        variant !== "ghost" ? tabsVariants({ variant, size, theme }) : "",
        className
      )}
      {...props}
    >
      {options.map((option, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveIndex(index);
              value && value(index);
            }}
            className={cn(
              "relative px-4 py-2 transition-all",
              isActive
                ? tabsVariants({ variant, size })
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            {option}
            {[
              "filled",
              "pill",
              "outline",
              "ghost",
              "shadow",
              "gradient",
              "glow",
              "block",
            ].includes(variant || "") &&
              isActive && (
                <motion.div
                  layoutId={`active-tab-bg-${variant}`}
                  className="absolute inset-0 z-[-1] rounded-md bg-[rgba(0,115,230,0.1)]"
                  transition={{ duration: 0.3 }}
                />
              )}
          </motion.button>
        );
      })}
    </div>
  );
};
