"use client";

import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface NavbarProps
  extends Omit<HTMLMotionProps<"nav">, "ref">,
    VariantProps<typeof navbarVariants> {
  animationType?:
    | "slide"
    | "glow"
    | "basic"
    | "spotlight"
    | "hoverSubmenu"
    | "clickSubmenu";
  direction?: "horizontal" | "vertical";
  children?: React.ReactNode;
  submenuContent?: React.ReactNode;
  header?: string;
}

const navbarVariants = cva(
  "flex items-center justify-between px-4 py-3 shadow-md transition-all",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        dark: "bg-gray-900 text-white",
        transparent: "bg-transparent text-transparent",
        glass: "bg-white/10 backdrop-blur-lg text-blue-200",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
        primary: "bg-blue-400 text-white",
      },
      size: {
        sm: "h-12",
        md: "h-16",
        lg: "h-20",
        xl: "h-24",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      textColor: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
        white: "text-white",
      },
      direction: {
        horizontal: "flex-row",
        vertical: "flex-col items-start space-y-4 p-4",
      },
    },
    defaultVariants: {
      weight: "semibold",
      align: "left",
      direction: "horizontal",
    },
  }
);
const submenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const animationVariants: Record<string, Partial<HTMLMotionProps<"nav">>> = {
  slide: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { repeat: Infinity, duration: 6 },
  },
  glow: {
    whileHover: {
      boxShadow: "0 0 25px 8px rgba(0, 123, 255, 0.7)",
      transition: { duration: 0.5 },
    },
  },
  theme: {
    initial: { backgroundColor: "#fff" },
    animate: { backgroundColor: "#000", color: "#fff" },
    transition: { repeat: Infinity, duration: 4 },
  },
  shake: {
    whileHover: {
      x: [0, -10, 10, -10, 10, -6, 6, -4, 4, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },
  spotlight: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  Basic: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
};

const Navbar: React.FC<NavbarProps> = ({
  className,
  variant,
  size,
  direction = "horizontal",
  children,
  animationType = "slide",
  ...props
}) => {
  const animation = animationVariants[animationType] || {};
  const [, setIsHovered] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  direction =
    animationType === "hoverSubmenu" || animationType === "clickSubmenu"
      ? "vertical"
      : direction;
  const [clicked, setClicked] = React.useState(false);
  const handleToggle = () => {
    if (animationType === "clickSubmenu") {
      setClicked((prev) => !prev);
    }
  };

  const showSubmenu =
    (animationType === "hoverSubmenu" && hovered) ||
    (animationType === "clickSubmenu" && clicked);

  return (
    <motion.nav
      className={cn(
        navbarVariants({ variant, size, direction }),
        "[&_input]:text-black [&_input]:border [&_input]:border-gray-300 [&_input]:rounded [&_input]:px-2 [&_input]:py-1",
        className
      )}
      {...animation}
      {...props}
      onMouseEnter={() => [
        setIsHovered(true),
        animationType === "hoverSubmenu" && setHovered(true),
      ]}
      onMouseLeave={() => [
        setIsHovered(false),
        animationType === "hoverSubmenu" && setHovered(false),
      ]}
      onClick={handleToggle}
    >
      {animationType === "spotlight" &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 80%)",
                  transition: { duration: 0.3 },
                }}
                className="rounded-full p-3"
              >
                {child}
              </motion.div>
            );
          }
          return null;
        })}
      {animationType === "basic" &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                className="flex items-center space-x-2 p-3"
              >
                {child}
              </motion.div>
            );
          }
          return null;
        })}
      {animationType === "hoverSubmenu" || animationType === "clickSubmenu" ? (
        <>
          <div className="flex justify-between w-full space-x-2">
            <span className="text-lg font-bold float-left">{props.header}</span>
            {showSubmenu ? (
              <span className="float-right">
                <ChevronUp size={20} />{" "}
              </span>
            ) : (
              <span className="float-right">
                {" "}
                <ChevronDown size={20} />
              </span>
            )}
          </div>
        </>
      ) : animationType !== "spotlight" && animationType !== "basic" ? (
        children
      ) : null}
      {(animationType === "hoverSubmenu" ||
        animationType === "clickSubmenu") && (
        <AnimatePresence>
          {showSubmenu && (
            <motion.div
              key="hoverMenu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={submenuVariants}
              transition={{ duration: 0.3 }}
              className={cn(
                "top-full left-0 right-0 bg-white  w-full px-6 py-4 border-t z-50",
                variant === "dark" ? "bg-gray-900 text-white" : "",
                variant === "primary" ? "bg-blue-400 text-white" : ""
              )}
            >
              {props.submenuContent}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.nav>
  );
};

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants };
