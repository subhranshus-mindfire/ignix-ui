// registry/components/toast/index.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useToast } from './use-toast';
import type { Toast, ToastProps } from './types';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastPrimitive.Provider duration={5000}>
      <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}

export function Toast({ title, description, type = 'default', ...props }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <ToastPrimitive.Root
        {...props}
        className={cn(
          'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-slate-200 p-6 pr-8 shadow-lg transition-all dark:border-slate-800',
          {
            'bg-white dark:bg-slate-900': type === 'default',
            'bg-red-600 text-white dark:bg-red-900': type === 'error',
            'bg-green-600 text-white dark:bg-green-900': type === 'success',
          }
        )}
      >
        <div className="flex flex-col gap-1">
          {title && (
            <ToastPrimitive.Title className="text-sm font-semibold">
              {title}
            </ToastPrimitive.Title>
          )}
          {description && (
            <ToastPrimitive.Description className="text-sm opacity-90">
              {description}
            </ToastPrimitive.Description>
          )}
        </div>
        <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:bg-slate-100 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-slate-800">
          <X className="h-4 w-4" />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    </motion.div>
  );
}

export { useToast };