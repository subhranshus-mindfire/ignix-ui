import { Breadcrumbs } from '.';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
    },
    separatorIcon: {
      control: { type: 'select' },
      options: ['ChevronRight', 'Check', 'Circle', 'Home', 'ArrowRight'],
    },
    steps: {
      control: { type: 'object' },
    },
    currentStep: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: { type: 'select' },
      options: ['rectangle', 'round', 'pill', 'default'],
    },
    variant: {
      control: { type: 'select' },
      options: ['text', 'step', 'progress', 'custom'],
    },
    bgColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'destructive', 'transparent'],
    },
    textColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'accent'],
    },
  },
};

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Current Page', href: '#', isCurrent: true },
];

export const Default = {
  args: {
    items: defaultItems,
    variant: 'text',
    size: 'md',
    shape: 'default',
  },
};

export const WithSteps = {
  args: {
    variant: 'step',
    size: 'md',
    currentStep: 2,
    steps: ['Step 1', 'Step 2', 'Step 3']
  },
};

export const WithProgress = {
  args: {
    variant: 'progress',
    size: 'md',
    currentStep: 3,
    steps: ['Cart', 'Shipping', 'Payment', 'Review'],
  },
};

export const CustomSeparator = {
  args: {
    items: defaultItems,
    variant: 'text',
    size: 'md',
  },
};

export const SmallSize = {
  args: {
    items: defaultItems,
    variant: 'text',
    size: 'sm',
  },
};

export const WithCustomStyles = {
  args: {
    items: defaultItems,
    variant: 'custom',
    size: 'md',
    shape: 'pill',
    bgColor: 'primary',
    textColor: 'accent',
  },
};
