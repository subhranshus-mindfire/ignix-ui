import { Slider } from '../slider';
import { Switch } from '../switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../accordion';
import { Button } from '../button';
import { useToast } from '../toast/use-toast';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import AnimatedTextarea from '../textarea';
import { Spinner } from '../spinner';
import { Badge } from '../badge';
import { Mail } from 'lucide-react';

// A small wrapper for the toast demo to use the useToast hook correctly
const ToastDemo = () => {
  const toast = useToast();
  return (
    <Button
      variant="default"
      size="lg"
      onClick={() =>
        toast.addToast({
          message: 'Hello from Ignix UI!',
          variant: 'error',
          animation: 'slide',
          icon: <InfoCircledIcon className="w-5 h-5" />,
        })
      }
      className="m-12"
    >
      Show Toast
    </Button>
  );
};
export const showcaseComponents = [
  {
    id: 'themed-slider',
    title: 'Themed Sliders',
    description: 'From minimal to cyberpunk',
    size: 'medium',
    demo: (
      <div className="w-3/4 flex flex-col gap-4">
        <Slider defaultValue={[75]} max={100} variant="default" animationType="breathe" showValue />
      </div>
    ),
  },
  {
    id: 'square-switch',
    title: 'Square Switches',
    description: 'Satisfying toggle animations',
    size: 'medium',
    demo: (
      <div className="flex items-center justify-center w-[200%]">
        <Switch variant="square" animation="bounce" checked />
      </div>
    ),
  },
  {
    id: 'variant-buttons',
    title: 'Variant-rich Buttons',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Button variant="default" animationVariant="wobble">
          Wobble
        </Button>
      </div>
    ),
  },
  {
    id: 'animated-accordion',
    title: 'Animated Accordion',
    description: 'Customizable reveal animations',
    size: 'large',
    demo: (
      <div className="w-full min-h-[400px] p-4 flex items-center justify-center">
        <Accordion type="single" collapsible className="w-full text-foreground">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent variant="bounce">
              Yes! With multiple animation variants like bounce, slide, and flip.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    id: 'animated-textarea',
    title: 'Animated Textarea',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <AnimatedTextarea
          variant="expandable"
          placeholder="Enter your text"
          value=""
        />
      </div>
    ),
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <div className="relative inline-flex items-center">
          <Mail className="h-12 w-12 " />
          <Badge text="3" type="primary" variant="tinypop" />
        </div>
      </div>
    ),
  },
  {
    id: 'spinner',
    title: 'Variant-rich Spinners',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Spinner size={40} color="border-primary" />
      </div>
    ),
  },
  {
    id: 'custom-toast',
    title: 'Customizable Toasts',
    description: 'User feedback, delivered',
    size: 'medium',
    demo: <ToastDemo />,
  },
  {
    id: 'ios-switch',
    title: 'IOS Switches',
    description: 'Satisfying toggle animations',
    size: 'medium',
    demo: (
      <div className="flex items-center justify-center gap-6 h-full m-14">
        <Switch variant="ios" animation="bounce" checked />
      </div>
    ),
  },
  {
    id: 'retro-slider',
    title: 'Retro Sliders',
    description: 'From minimal to cyberpunk',
    size: 'medium',
    demo: (
      <div className="w-3/4 flex flex-col gap-4">
        <Slider defaultValue={[50]} max={100} variant="retro" showValue />
      </div>
    ),
  },
  {
    id: 'variant-buttons',
    title: 'Variant-rich Buttons',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Button variant="default" animationVariant="bounceJelly">
          Bouncy
        </Button>
      </div>
    ),
  },
  {
    id: 'material-switch',
    title: 'Material Switches',
    description: 'Satisfying toggle animations',
    size: 'medium',
    demo: (
      <div className="flex items-center justify-center gap-6 h-full m-14">
        <Switch variant="large" animation="jelly" checked />
      </div>
    ),
  },
  {
    id: 'variant-buttons2',
    title: 'Variant-rich Buttons',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Button variant="default">
          Bouncy
        </Button>
      </div>
    ),
  },

  {
    id: 'themed-slider',
    title: 'Themed Sliders',
    description: 'From minimal to cyberpunk',
    size: 'medium',
    demo: (
      <div className="w-3/4 flex flex-col gap-4">
        <Slider defaultValue={[75]} max={100} variant="default" animationType="breathe" showValue />
      </div>
    ),
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <div className="relative inline-flex items-center">
          <Mail className="h-12 w-12 " />
          <Badge text="3" type="primary" variant="tinypop" />
        </div>
      </div>
    ),
  },
  {
    id: 'spinner',
    title: 'Variant-rich Spinners',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Spinner size={40} color="border-primary" />
      </div>
    ),
  },
  {
    id: 'material-switch',
    title: 'Material Switches',
    description: 'Satisfying toggle animations',
    size: 'medium',
    demo: (
      <div className="flex items-center justify-center gap-6 h-full m-14">
        <Switch variant="large" animation="jelly" checked />
      </div>
    ),
  },
  {
    id: 'variant-buttons3',
    title: 'Variant-rich Buttons',
    description: 'Buttons for every occasion',
    size: 'medium',
    demo: (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Button variant="default">
          Bouncy
        </Button>
      </div>
    ),
  },
];
