"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextareaProps {
  placeholder: string;
  variant: string;
  textareaClassName?: string;
  labelClassName?: string;
  value: string;
  onChange: (value: string) => void;
}

interface TextareaVariant {
  label: Variants;
  textarea: Variants;
  extra?: Variants;
}

const AnimatedTextarea: React.FC<AnimatedTextareaProps> = ({
  placeholder,
  variant,
  textareaClassName = "",
  labelClassName = "",
  onChange,
  value,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [height, setHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    if (variant === "expandable" || variant === "smoothExpand") {
      setHeight("auto");
      setHeight(`${e.target.scrollHeight}px`);
    }
  };

  useEffect(() => {
    if (
      (variant === "expandable" || variant === "smoothExpand") &&
      textareaRef.current
    ) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [value, variant]);

  const variants = textareaVariants[variant as keyof typeof textareaVariants];

  return (
    <motion.div
      className="relative mb-4"
      initial="initial"
      animate={isFocused || value ? "animate" : "initial"}
    >
      <motion.label
        className={`absolute left-2 text-gray-600 pointer-events-none ${labelClassName}`}
        variants={variants.label}
      >
        {placeholder}
      </motion.label>
      <div className="relative">
        <motion.textarea
          ref={textareaRef}
          className={`w-full px-3 py-2 bg-white border-2 rounded-md focus:outline-none resize-none ${textareaClassName}`}
          style={{
            height:
              variant === "expandable" || variant === "smoothExpand"
                ? height
                : "auto",
            minHeight: "100px",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          variants={variants.textarea}
        />
        {variant === "particleField" && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            variants={variants.extra}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="particle absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        )}
        {variant === "characterCount" && (
          <motion.div
            className="absolute bottom-2 right-2 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {value.length} / 500
          </motion.div>
        )}
        {variant === "lineHighlight" && value && (
          <motion.div
            className="absolute left-0 w-full h-6 bg-blue-100 pointer-events-none"
            style={{
              top: `${Math.floor(value.length / 50) * 24}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

const textareaVariants: Record<string, TextareaVariant> = {
  clean: {
    label: {
      initial: { y: 0, scale: 1 },
      animate: { y: -24, scale: 0.8 },
    },
    textarea: {
      initial: { borderColor: "#e2e8f0" },
      animate: { borderColor: "#3b82f6" },
    },
  },
  expandable: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { height: "100px" },
      animate: { height: "auto" },
    },
  },
  smoothExpand: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { height: "100px" },
      animate: {
        height: "auto",
        transition: { duration: 0.3, ease: "easeOut" },
      },
    },
  },
  glowBorder: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
      animate: { boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" },
    },
  },
  characterCount: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { paddingBottom: "2rem" },
      animate: { borderColor: "#3b82f6" },
    },
  },
  lineHighlight: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { lineHeight: "24px" },
      animate: { borderColor: "#3b82f6" },
    },
  },
  typewriterSound: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { borderColor: "#e2e8f0" },
      animate: {
        borderColor: "#3b82f6",
        transition: { type: "spring", stiffness: 500 },
      },
    },
  },
  markdownPreview: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { borderRadius: "8px" },
      animate: { borderRadius: "16px" },
    },
  },
  autoComplete: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { backgroundColor: "#fff" },
      animate: { backgroundColor: "#f8fafc" },
    },
  },
  syntaxHighlight: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { fontFamily: "monospace" },
      animate: { borderColor: "#3b82f6" },
    },
  },
  rippleEffect: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { transform: "scale(1)" },
      animate: {
        transform: "scale(1)",
        transition: { type: "spring", stiffness: 300 },
      },
    },
  },
  gradientBorder: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { backgroundPosition: "0% 50%" },
      animate: { backgroundPosition: "100% 50%" },
    },
  },
  neonGlow: {
    label: {
      initial: { textShadow: "none" },
      animate: { textShadow: "0 0 8px rgba(59, 130, 246, 0.8)" },
    },
    textarea: {
      initial: { boxShadow: "none" },
      animate: {
        boxShadow:
          "0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
      },
    },
  },
  particleField: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { borderColor: "#e2e8f0" },
      animate: { borderColor: "#3b82f6" },
    },
  },
  elastic: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.02, 0.98, 1] },
    },
  },
  wave: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { y: 0 },
      animate: {
        y: [0, -2, 2, 0],
        transition: { repeat: Infinity, duration: 2 },
      },
    },
  },
  spotlight: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { filter: "brightness(1)" },
      animate: {
        filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
      },
    },
  },
  liquid: {
    label: {
      initial: { y: 0 },
      animate: { y: -24 },
    },
    textarea: {
      initial: { borderRadius: "8px" },
      animate: {
        borderRadius: ["8px", "12px", "16px", "12px", "8px"],
        transition: { repeat: Infinity, duration: 4 },
      },
    },
  },
  cosmic: {
    label: {
      initial: { y: 0, rotate: 0 },
      animate: { y: -24, rotate: 360, transition: { duration: 2 } },
    },
    textarea: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.02, 0.98, 1],
        transition: { repeat: Infinity, duration: 3 },
      },
    },
  },
  hologram: {
    label: {
      initial: { y: 0, opacity: 0.6 },
      animate: {
        y: -24,
        opacity: [0.6, 1, 0.6],
        transition: { repeat: Infinity, duration: 2 },
      },
    },
    textarea: {
      initial: { opacity: 0.8 },
      animate: {
        opacity: [0.8, 1, 0.8],
        transition: { repeat: Infinity, duration: 2 },
      },
    },
  },
};

export default AnimatedTextarea;
