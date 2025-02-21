// registry/components/toast/types.ts
import * as ToastPrimitive from '@radix-ui/react-toast';

export type ToastType = 'default' | 'error' | 'success';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
}

export interface ToastProps extends Toast, 
  Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, keyof Toast> {}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}