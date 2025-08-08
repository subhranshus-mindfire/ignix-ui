import { Slider } from '../slider';
import { Switch } from '../switch';
import { Button } from '../button';
import { Spinner } from '../spinner';
import { Badge } from '../badge';
import { Mail } from 'lucide-react';


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
];
