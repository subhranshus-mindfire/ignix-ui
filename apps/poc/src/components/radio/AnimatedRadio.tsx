'use client';

import type React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { motion, Variants } from 'framer-motion';

interface Option {
  value: string;
  label: string;
}

interface AnimatedRadioProps {
  options: Option[];
  variant?: string;
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

interface RadioVariant {
  container: Variants;
  radio: Variants;
  indicator: Variants;
  label: Variants;
}

const defaultVariant: RadioVariant = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { x: 5 },
  },
  radio: {
    initial: { scale: 1 },
    animate: { scale: 1 },
    hover: { scale: 1.1 },
  },
  indicator: {
    initial: { scale: 0 },
    animate: { scale: 1 },
  },
  label: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
};

const AnimatedRadio: React.FC<AnimatedRadioProps> = ({
  options,
  variant = 'clean',
  defaultValue,
  className = '',
  onValueChange,
}) => {
  const currentVariant = radioVariants[variant as keyof typeof radioVariants] || defaultVariant;

  return (
    <RadioGroup.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={`flex flex-col gap-4 ${className}`}
    >
      {options.map((option, index) => (
        <motion.div
          key={option.value}
          className="flex items-center"
          variants={currentVariant.container}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={index}
        >
          <RadioGroup.Item
            value={option.value}
            id={`${option.value}-${variant}`}
            className="relative w-6 h-6 rounded-full border-2 border-blue-500"
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              variants={currentVariant.radio}
              initial="initial"
              animate="animate"
              whileHover="hover"
            />
            <RadioGroup.Indicator>
              <motion.div
                className="w-3 h-3 bg-blue-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                variants={currentVariant.indicator}
                initial="initial"
                animate="animate"
              />
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          <motion.label
            htmlFor={`${option.value}-${variant}`}
            className="pl-2 text-gray-700 cursor-pointer"
            variants={currentVariant.label}
            initial="initial"
            animate="animate"
            custom={index}
          >
            {option.label}
          </motion.label>
        </motion.div>
      ))}
    </RadioGroup.Root>
  );
};

const radioVariants: Record<string, RadioVariant> = {
  clean: {
    container: {
      initial: { opacity: 0, x: -20 },
      animate: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1 },
      }),
      hover: { x: 5 },
    },
    radio: {
      initial: { scale: 1 },
      animate: { scale: 1 },
      hover: { scale: 1.1 },
    },
    indicator: {
      initial: { scale: 0 },
      animate: { scale: 1 },
    },
    label: {
      initial: { opacity: 0 },
      animate: (i) => ({
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
    },
  },

  bounce: {
    container: {
      initial: { y: 20, opacity: 0 },
      animate: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          delay: i * 0.1,
          stiffness: 300,
          damping: 20,
        },
      }),
      hover: { y: -5 },
    },
    radio: {
      initial: { scale: 0.8 },
      animate: { scale: 1 },
      hover: {
        scale: 1.2,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      },
    },
    indicator: {
      initial: { scale: 0 },
      animate: {
        scale: 1,
        transition: { type: 'spring', stiffness: 500 },
      },
    },
    label: {
      initial: { x: -10, opacity: 0 },
      animate: (i) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
    },
  },

  elastic: {
    container: {
      initial: { scale: 0.9, opacity: 0 },
      animate: (i) => ({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          delay: i * 0.1,
          stiffness: 300,
          damping: 15,
        },
      }),
    },
    radio: {
      initial: { scale: 1 },
      animate: { scale: 1 },
      hover: {
        scale: 1.2,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      },
    },
    indicator: {
      initial: { scale: 0 },
      animate: {
        scale: 1,
        transition: { type: 'spring', stiffness: 500 },
      },
    },
    label: {
      initial: { x: -20, opacity: 0 },
      animate: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 },
      },
    },
  },

  wave: {
    container: {
      initial: { y: 0, opacity: 0 },
      animate: (i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
      hover: {
        y: -5,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      },
    },
    radio: {
      initial: { scale: 1 },
      animate: { scale: 1 },
      hover: { scale: 1.1 },
    },
    indicator: {
      initial: { scale: 0 },
      animate: { scale: 1 },
    },
    label: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  },

  ripple: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    radio: {
      initial: { scale: 1, boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
      animate: { scale: 1 },
      hover: {
        boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)',
        transition: { duration: 0.3 },
      },
    },
    indicator: {
      initial: { scale: 0 },
      animate: { scale: 1 },
    },
    label: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  },

  pulse: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    radio: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.1, 1],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
      },
    },
    indicator: {
      initial: { scale: 0 },
      animate: { scale: 1 },
    },
    label: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  },

  rotate3D: {
    container: {
      initial: { opacity: 0, rotateX: -30 },
      animate: (i) => ({
        opacity: 1,
        rotateX: 0,
        transition: {
          delay: i * 0.1,
          type: 'spring',
          stiffness: 100,
        },
      }),
    },
    radio: {
      initial: { rotateY: 0 },
      animate: { rotateY: 0 },
      hover: {
        rotateY: 180,
        transition: { duration: 0.3 },
      },
    },
    indicator: {
      initial: { scale: 0 },
      animate: { scale: 1 },
    },
    label: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  },

  magnetic: {
    container: {
      initial: { x: 0, opacity: 0 },
      animate: (i) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
      hover: { x: 10, transition: { type: 'spring', stiffness: 300 } },
    },
    radio: {
      initial: { scale: 1 },
      animate: { scale: 1 },
      hover: { scale: 1.2 },
    },
    indicator: {
      initial: { scale: 0 },
      animate: { scale: 1 },
    },
    label: {
      initial: { opacity: 0 },
      animate: (i) => ({
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
    },
  },
};

export default AnimatedRadio;
