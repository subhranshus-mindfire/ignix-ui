import React from "react";
import { motion, Variants} from "framer-motion";
import { cn } from "../../../utils/cn";

interface BadgeProps {
    text: string;
    type?: "primary" | "secondary" | "success" | "warning" | "error";
    variant?: "pulse" | "bounce" | "tinypop";
    className?: string;
    children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
    text,
    type = "primary",
    className,
    variant = "tinypop",
    children
}) => {
    const types = {
        primary: cn(
            "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
            "dark:from-blue-600 dark:to-blue-700",
            "shadow-lg shadow-blue-500/25 dark:shadow-blue-600/20",
            "ring-2 ring-blue-400/20 dark:ring-blue-500/30"
        ),
        secondary: cn(
            "bg-gradient-to-br from-slate-500 to-slate-600 text-white",
            "dark:from-slate-600 dark:to-slate-700", 
            "shadow-lg shadow-slate-500/25 dark:shadow-slate-600/20",
            "ring-2 ring-slate-400/20 dark:ring-slate-500/30"
        ),
        success: cn(
            "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
            "dark:from-emerald-600 dark:to-emerald-700",
            "shadow-lg shadow-emerald-500/25 dark:shadow-emerald-600/20",
            "ring-2 ring-emerald-400/20 dark:ring-emerald-500/30"
        ),
        warning: cn(
            "bg-gradient-to-br from-amber-400 to-amber-500 text-amber-900",
            "dark:from-amber-500 dark:to-amber-600 dark:text-amber-950",
            "shadow-lg shadow-amber-400/25 dark:shadow-amber-500/20",
            "ring-2 ring-amber-300/30 dark:ring-amber-400/30"
        ),
        error: cn(
            "bg-gradient-to-br from-red-500 to-red-600 text-white",
            "dark:from-red-600 dark:to-red-700",
            "shadow-lg shadow-red-500/25 dark:shadow-red-600/20",
            "ring-2 ring-red-400/20 dark:ring-red-500/30"
        ),
    };

    const getAnimationShadows = (type: string) => {
        const shadowColors = {
            primary: "59, 130, 246", // blue-500 RGB
            secondary: "100, 116, 139", // slate-500 RGB
            success: "16, 185, 129", // emerald-500 RGB
            warning: "245, 158, 11", // amber-500 RGB
            error: "239, 68, 68", // red-500 RGB
        };
        return shadowColors[type as keyof typeof shadowColors] || shadowColors.primary;
    };

    const animationVariants: {'pulse': Variants, 'bounce': Variants, tinypop: Variants} = {
        pulse: {
            initial: {
                scale: 1,
                boxShadow: `0 0 0 0 rgba(${getAnimationShadows(type)}, 0.7)`,
            },
            animate: {
                scale: [1, 1.1, 1],
                boxShadow: [
                    `0 0 0 0 rgba(${getAnimationShadows(type)}, 0.7)`,
                    `0 0 0 8px rgba(${getAnimationShadows(type)}, 0.1)`,
                    `0 0 0 12px rgba(${getAnimationShadows(type)}, 0)`
                ],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.5, 1]
                },
            },
        },
        bounce: {
            initial: { 
                y: -50, 
                opacity: 0,
                rotate: -15,
                scale: 0.5 
            },
            animate: {
                y: [-50, 0, -20, 0, -8, 0, -3, 0],
                opacity: 1,
                rotate: [-15, 0, -5, 0, -2, 0],
                scale: [0.5, 1.2, 0.9, 1.1, 0.95, 1],
                transition: {
                    duration: 1.5,
                    ease: "easeOut",
                    times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 1]
                },
            },
        },
        tinypop: {
            initial: { scale: 1 },
            animate: { 
                scale: [1, 1.15, 1],
                rotate: [0, 2, -2, 0],
                transition: { 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.3, 1]
                }
            },           
        }
    };

    return (
        <div className="relative inline-flex items-center">
            {children}
            <motion.div
                variants={animationVariants[variant]}
                initial="initial"
                animate="animate"
                className={cn(
                    // Position and size - responsive
                    "absolute -top-1 -right-1 sm:-top-2 sm:-right-2",
                    "min-w-5 h-5 sm:min-w-6 sm:h-6",
                    // Shape and layout
                    "rounded-full flex items-center justify-center",
                    // Typography - responsive
                    "text-xs sm:text-sm font-bold tracking-tight",
                    // Visual enhancements
                    "backdrop-blur-sm",
                    "border border-white/20 dark:border-black/20",
                    // Smooth transitions for theme changes
                    "transition-all duration-200",
                    // Ensure content is centered and properly sized
                    "px-1.5 sm:px-2",
                    // Z-index to ensure it's above other content
                    "z-10",
                    // Hover effects
                    "hover:scale-105 active:scale-95",
                    "hover:shadow-xl transition-transform duration-200",
                    // Apply type-specific styling
                    types[type],
                    className
                )}
                // Add whileHover and whileTap for additional interactivity
                whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                }}
            >
                <span className="relative z-10 leading-none">
                    {text}
                </span>
                
                {/* Subtle inner highlight for depth */}
                <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 dark:to-white/10 pointer-events-none" 
                    aria-hidden="true"
                />
            </motion.div>
        </div>
    );
};

Badge.displayName = "Badge";
export { Badge };
