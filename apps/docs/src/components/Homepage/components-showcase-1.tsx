import React, { Suspense } from 'react';
import {
  Component1Icon,
  DrawingPinIcon,
  MagicWandIcon,
  MixIcon,
} from '@radix-ui/react-icons';
import { Slider } from '../UI/slider';
import { Switch } from '../UI/switch';
import { Breadcrumbs } from '../UI/breadcrumbs';
import { SectionTitleCapsule } from './section-title';
import { Button } from '../UI/button';

// The lazy-loaded animated components remain unchanged
const AnimatedBreadcrumb = React.lazy(() => Promise.resolve({ default: () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const steps = ['Payment', 'Shipping', 'Done'];
  React.useEffect(() => {
    const interval = setInterval(() => setCurrentStep((prev) => (prev + 1) % steps.length), 1500);
    return () => clearInterval(interval);
  }, [steps.length]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Breadcrumbs steps={steps} currentStep={currentStep} variant="step" />
    </div>
  );
}}));

const AnimatedButtons = React.lazy(() => Promise.resolve({ default: () => {
  const [activeButton, setActiveButton] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setActiveButton(prev => (prev + 1) % 2), 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button animationVariant={activeButton === 0 ? 'wobble' : 'none'} className={activeButton === 0 ? 'bg-green-500' : 'bg-red-500'}>
          {activeButton === 0 ? 'Active' : 'Inactive'}
        </Button>
        <Button animationVariant={activeButton === 1 ? 'pulse' : 'none'} className={activeButton === 1 ? 'bg-green-500' : 'bg-red-500'}>
          {activeButton === 1 ? 'Active' : 'Inactive'}
        </Button>
      </div>
    </div>
  );
}}));

const AnimatedSlider = React.lazy(() => Promise.resolve({ default: () => {
  const [value, setValue] = React.useState(30);
  const [isIncreasing, setIsIncreasing] = React.useState(true);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        if (prev >= 90) { setIsIncreasing(false); return 89; }
        else if (prev <= 10) { setIsIncreasing(true); return 11; }
        return isIncreasing ? prev + 10 : prev - 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isIncreasing]);
  return (
    <div className="w-full max-w-sm">
      <Slider value={[value]} onValueChange={([v]) => setValue(v)} animationType="breathe" showValue valueSuffix="%" glowEffect />
      <Slider value={[value]} onValueChange={([v]) => setValue(v)} animationType="breathe" showValue valueSuffix="%" glowEffect variant="retro" />
    </div>
  );
}}));

const AnimatedSwitches = React.lazy(() => Promise.resolve({ default: () => {
  const [activeSwitch, setActiveSwitch] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setActiveSwitch(prev => (prev + 1) % 2), 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center gap-8 p-4">
      <Switch variant="ios" animation={activeSwitch === 0 ? 'bounce' : 'default'} checked={activeSwitch === 0} />
      <Switch variant="square" animation={activeSwitch === 1 ? 'jelly' : 'default'} checked={activeSwitch === 1} />
    </div>
  );
}}));


const demoComponents = [
  {
    id: 'buttons',
    title: 'Animated Buttons',
    description: 'Engage users with interactive, animated buttons for every occasion.',
    icon: Component1Icon,
    href: '/docs/components/button',
    demo: <AnimatedButtons />,
  },
  {
    id: 'sliders',
    title: 'Interactive Sliders',
    description: 'Allow users to select values with our sleek and customizable sliders.',
    icon: MixIcon,
    href: '/docs/components/slider',
    demo: <AnimatedSlider />,
  },
  {
    id: 'switches',
    title: 'Tactile Switches',
    description: 'Modern, satisfying toggle switches with built-in animations.',
    icon: MagicWandIcon,
    href: '/docs/components/switch',
    demo: <AnimatedSwitches />,
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Guide and inform users with stylish status indicators and navigation aids.',
    icon: DrawingPinIcon,
    href: '/docs/components/breadcrumb',
    demo: <AnimatedBreadcrumb />,
  },
];

// Main Component - Grid Layout
export default function ComponentShowcaseGrid() {
  return (
    <>
      <style>{`
        /* Minimal styles retained for layout and theme colors */
        .bg-gradient-showcase {
          background: linear-gradient(to right, var(--ifm-color-primary-light), var(--ifm-color-primary));
        }
      `}</style>

      <section className="relative py-8 px-4 overflow-hidden" aria-label="Featured components">
        <div className="max-w-7xl mx-auto relative z-10">
            <header className="mb-12">
              <SectionTitleCapsule highlight="components" align="center" caseInsensitive>
                Featured Components
              </SectionTitleCapsule>
              <p className="text-center text-muted-foreground">
                Explore our collection of high-quality, ready-to-use components.
              </p>
            </header>

            {/* Grid layout to display all component demos at once */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demoComponents.map((component) => (
                <div
                  key={component.id}
                  className="group h-96 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background/30 to-primary/5 dark:from-primary/10 dark:via-background/40 dark:to-primary/10 border border-border/20 rounded-2xl shadow-lg"
                >
                  {/* Title Bar for each card */}
                  <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      {React.createElement(component.icon, { className: 'h-4 w-4' })}
                      <span>{component.title}</span>
                    </div>
                  </div>
                  {/* Demo Content */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 pt-14">
                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                      <div className="w-full h-full flex items-center justify-center">
                        {component.demo}
                      </div>
                    </Suspense>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>
    </>
  );
}