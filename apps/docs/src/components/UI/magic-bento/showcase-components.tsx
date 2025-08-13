import { Slider } from '../slider';
import { Switch } from '../switch';
import { Button } from '../button';
import { Spinner } from '../spinner';
import {ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '../breadcrumbs';


export const showcaseComponents = [
  {
    id: 'themed-slider',
    title: 'Interactive Slider',
    description: 'Smooth value transitions',
    size: 'medium',
    demo: ({
      sliderValue = 75,
    }: {
      sliderValue?: number;
    } = {}) => (
      <div className="w-3/4 flex flex-col gap-4">
        <Slider 
          value={[sliderValue]} 
          max={100} 
          variant="default" 
          animationType="breathe" 
          showValue 
        />
      </div>
    ),
  },
  {
    id: 'square-switch',
    title: 'Animated Switches',
    description: 'Satisfying toggle animations',
    size: 'medium',
    demo: ({
      isChecked = true,
    }: {
      isChecked?: boolean;
    } = {}) => (
      <div className="flex items-center justify-center w-[200%] gap-4">
        <Switch 
          variant="square" 
          animation="bounce" 
          checked={isChecked} 
          onCheckedChange={() => {console.log('Switch toggled')}} 
        />
        {/* <Switch 
          variant="ios" 
          animation="jelly" 
          checked={isChecked} 
          onCheckedChange={onToggle}
        /> */}
      </div>
    ),
  },
  {
    id: 'interactive-buttons',
    title: 'Interactive Buttons',
    description: 'Try hovering and clicking',
    size: 'medium',
    demo: ({
      buttonText = 'Click Me!',
    }: {
      buttonText?: string;
    } = {}) => (
      <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
        <div className="flex gap-3">
          <Button 
            variant="default" 
            animationVariant="wobble"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    ),
  },
  // {
  //   id: 'badge',
  //   title: 'Animated Badge',
  //   description: 'Notification that catches attention',
  //   size: 'small',
  //   demo: ({
  //     count = 3,
  //     onIncrement = () => {}
  //   }: {
  //     count?: number;
  //     onIncrement?: () => void;
  //   } = {}) => (
  //     <div className="flex items-center justify-center h-full">
  //       <Tooltip content="You have new notifications!" animation="slideUp">
  //         <div className="relative inline-flex items-center cursor-pointer" onClick={onIncrement}>
  //           <Mail className="h-8 w-8 text-gray-400 hover:text-primary transition-colors" />
  //           <Badge 
  //             text={String(count)} 
  //             type="primary" 
  //             variant="bounce" 
  //             className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center"
  //           />
  //         </div>
  //       </Tooltip>
  //     </div>
  //   ),
  // },
  {
    id: 'breadcrumbs',
    title: 'Interactive Steps',
    description: 'Track your progress',
    size: 'medium',
    demo: ({
      currentStep = 0,
    }: {
      currentStep?: number;
    } = {}) => (
      <div className="w-full px-4">
        <Breadcrumbs
          steps={['Start', 'In Progress', 'Review', 'Complete']}
          currentStep={currentStep}
          separatorIcon={ChevronRight}
          variant="step"
          className="cursor-pointer"
        />
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
  // {
  //   id: 'material-switch',
  //   title: 'Material Switches',
  //   description: 'Satisfying toggle animations',
  //   size: 'medium',
  //   demo: (
  //     <div className="flex items-center justify-center gap-6 h-full m-14">
  //       <Switch variant="large" animation="jelly" checked />
  //     </div>
  //   ),
  // },
];
