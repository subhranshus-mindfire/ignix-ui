import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Component1Icon,
  DrawingPinIcon,
  MagicWandIcon,
  MixIcon,
  RocketIcon,
  PlayIcon,
} from '@radix-ui/react-icons';
import { Button } from '../UI/button';
import { Card, CardContent } from '../UI/card';
import { Slider } from '../UI/slider';
import { Switch } from '../UI/switch';
import { Breadcrumbs } from '../UI/breadcrumbs';
import { cn } from '@site/src/utils/cn';
import { SectionTitleCapsule } from './section-title';
import { ComponentSelector } from './ComponentSelector';

const AnimatedBreadcrumb = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Payment', 'Shipping', 'Done'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Breadcrumbs steps={steps} currentStep={currentStep} variant="step" />
    </div>
  );
};

// Data for the components to be showcased, using your components
const AnimatedButtons = () => {
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveButton(prev => (prev + 1) % 2);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant={activeButton === 0 ? 'primary' : 'outline'}
          animationVariant={activeButton === 0 ? 'wobble' : 'none'}
        >
          {activeButton === 0 ? 'Active' : 'Inactive'}
        </Button>
        <Button
          variant={activeButton === 1 ? 'primary' : 'outline'}
          animationVariant={activeButton === 1 ? 'pulse' : 'none'}
        >
          {activeButton === 1 ? 'Active' : 'Inactive'}
        </Button>
      </div>
    </div>
  );
};

const AnimatedSlider = () => {
  const [value, setValue] = useState(30);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        if (prev >= 90) {
          setIsIncreasing(false);
          return 89;
        } else if (prev <= 10) {
          setIsIncreasing(true);
          return 11;
        }
        return isIncreasing ? prev + 10 : prev - 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isIncreasing]);

  return (
    <div className="w-full max-w-sm">
      <Slider
        value={[value]}
        onValueChange={([v]) => setValue(v)}
        animationType="breathe"
        showValue
        valueSuffix="%"
        glowEffect
      />
      <Slider
        value={[value]}
        onValueChange={([v]) => setValue(v)}
        animationType="breathe"
        showValue
        valueSuffix="%"
        glowEffect
        variant="retro"
      />
    </div>
  );
};

const AnimatedSwitches = () => {
  const [activeSwitch, setActiveSwitch] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSwitch(prev => (prev + 1) % 2);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-8 p-4">
      <Switch
        variant="ios"
        animation={activeSwitch === 0 ? 'bounce' : 'default'}
        checked={activeSwitch === 0}
      />
      <Switch
        variant="square"
        animation={activeSwitch === 1 ? 'jelly' : 'default'}
        checked={activeSwitch === 1}
      />
    </div>
  );
};

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
    demo: (
      <div className="w-full h-full flex items-center justify-center">
        <AnimatedSlider />
      </div>
    ),
  },
  {
    id: 'switches',
    title: 'Tactile Switches',
    description: 'Modern, satisfying toggle switches with built-in animations.',
    icon: MagicWandIcon,
    href: '/docs/components/switch',
    demo: (
      <div className="w-full h-full flex items-center justify-center">
        <AnimatedSwitches />
      </div>
    ),
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Guide and inform users with stylish status indicators and navigation aids.',
    icon: DrawingPinIcon,
    href: '/docs/components/breadcrumb',
    demo: (
      <div className="flex flex-col items-center justify-center gap-4 p-2 w-full h-full">
        <AnimatedBreadcrumb />
      </div>
    ),
  },
];

// Main Component
export default function ComponentShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-rotate demos
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoComponents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      {/* Injecting necessary styles directly for portability */}
      <style>{`
        .text-gradient-primary {
          background: linear-gradient(to right, var(--ifm-color-primary-light), var(--ifm-color-primary-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 10px var(--ifm-color-primary-light); }
          50% { box-shadow: 0 0 20px var(--ifm-color-primary); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        .showcase-glow {
          box-shadow: 0 0 30px var(--ifm-color-primary-lightest);
        }
        .bg-gradient-showcase {
          background: linear-gradient(to right, var(--ifm-color-primary-light), var(--ifm-color-primary));
        }
      `}</style>

      <section
        className="relative rounded-3xl mb-16 bg-transparent p-4 lg:px-24"
        aria-label="Featured components"
      >
        <header className="mb-8">
          <SectionTitleCapsule highlight="components" align="center" caseInsensitive>
            Featured Components
          </SectionTitleCapsule>
          <p className="text-center text-muted-foreground">
            Explore our collection of high-quality, ready-to-use components.
          </p>
        </header>

        {/* Mobile Component Selector */}
        <ComponentSelector
          components={demoComponents.map(({ id, title, icon }) => ({
            id,
            title,
            icon,
          }))}
          activeIndex={activeDemo}
          onSelect={setActiveDemo}
        />
        {/* Main Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Display */}
          <div className="order-2 lg:order-1">
            <div className="h-80 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background/30 to-primary/5 dark:from-primary/10 dark:via-background/40 dark:to-primary/10 border border-border/20 rounded-xl shadow-lg">
              <div className="absolute top-4 right-4 z-20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-background/10 hover:bg-background/20 backdrop-blur-sm"
                >
                  <PlayIcon className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                </Button>
              </div>

              <div className="h-full flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="w-full"
                  >
                    {demoComponents[activeDemo].demo}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Desktop Component List */}
          <div className="hidden lg:block order-1 lg:order-2 space-y-4">
            {demoComponents.map((component, index) => (
              <Card
                key={component.id}
                className={cn(
                  'cursor-pointer transition-all duration-500',
                  activeDemo === index
                    ? 'border border-primary/50 bg-background/10 scale-105'
                    : 'hover:border-white/30'
                )}
                onClick={() => setActiveDemo(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'p-3 rounded-xl transition-all duration-300',
                      activeDemo === index
                        ? 'bg-gradient-showcase text-white'
                        : 'bg-background/10 text-muted-foreground'
                    )}>
                      <component.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className={cn(
                        'font-semibold transition-colors duration-300',
                        activeDemo === index ? 'text-primary-light' : ''
                      )}>
                        {component.title}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {component.description}
                      </p>
                    </div>
                    <div className={cn(
                      'transition-all duration-300',
                      activeDemo === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    )}>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section >
    </>
  );
}
