'use client';

import type React from 'react';
import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface Option {
  value: string;
  label: string;
}

interface AnimatedSelectProps {
  options: Option[];
  placeholder: string;
  variant: string;
  selectClassName?: string;
}

interface SelectVariant {
  trigger: Variants;
  content: Variants;
  item: Variants;
  icon: Variants;
}

const defaultIconAnimation = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const AnimatedSelect: React.FC<AnimatedSelectProps> = ({
  options,
  placeholder,
  variant,
  selectClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const variants = selectVariants[variant as keyof typeof selectVariants];

  return (
    <Select.Root open={open} onOpenChange={setOpen} value={value} onValueChange={setValue}>
      <motion.div className="relative">
        <Select.Trigger
          className={`w-full px-3 py-2 bg-white border-2 rounded-md flex items-center justify-between ${selectClassName}`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDownIcon />
            </motion.div>
          </Select.Icon>
        </Select.Trigger>

        <AnimatePresence>
          {open && (
            <Select.Portal>
              <Select.Content>
                <motion.div
                  className="bg-white rounded-md shadow-lg mt-1 overflow-hidden"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants.content}
                >
                  <Select.Viewport>
                    {options.map((option, index) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        className="px-3 py-2 outline-none cursor-pointer hover:bg-blue-50"
                      >
                        <motion.div variants={variants.item} custom={index}>
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </motion.div>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </motion.div>
              </Select.Content>
            </Select.Portal>
          )}
        </AnimatePresence>
      </motion.div>
    </Select.Root>
  );
};

const selectVariants: Record<string, SelectVariant> = {
  clean: {
    trigger: {
      initial: { borderColor: '#e2e8f0' },
      animate: { borderColor: '#3b82f6' },
    },
    content: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
    item: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
    },
    icon: defaultIconAnimation,
  },
  cascade: {
    trigger: {
      initial: { borderColor: '#e2e8f0' },
      animate: { borderColor: '#3b82f6' },
    },
    content: {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: 'auto' },
      exit: { opacity: 0, height: 0 },
    },
    item: {
      initial: { opacity: 0, y: -10 },
      animate: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05 },
      }),
    },
    icon: defaultIconAnimation,
  },
  scale: {
    trigger: {
      initial: { scale: 1 },
      animate: { scale: 1.02 },
    },
    content: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    item: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    icon: defaultIconAnimation,
  },
  elastic: {
    trigger: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.02, 0.98, 1] },
    },
    content: {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
      exit: { opacity: 0, scale: 0.8 },
    },
    item: {
      initial: { x: -20 },
      animate: { x: 0, transition: { type: 'spring', stiffness: 300 } },
    },
    icon: defaultIconAnimation,
  },
  slide: {
    trigger: {
      initial: { x: 0 },
      animate: { x: 0 },
    },
    content: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    item: {
      initial: { x: 50 },
      animate: (i) => ({
        x: 0,
        transition: { delay: i * 0.1 },
      }),
    },
    icon: defaultIconAnimation,
  },
  fade: {
    trigger: {
      initial: { opacity: 0.9 },
      animate: { opacity: 1 },
    },
    content: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    item: {
      initial: { opacity: 0 },
      animate: (i) => ({
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
    },
    icon: defaultIconAnimation,
  },
};

export default AnimatedSelect;
