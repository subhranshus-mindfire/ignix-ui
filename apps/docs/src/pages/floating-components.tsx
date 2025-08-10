import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '../components/UI/slider';
import { Switch } from '../components/UI/switch';
import { Button } from '../components/UI/button';
import { Spinner } from '../components/UI/spinner';
import { Badge } from '../components/UI/badge';
import { ChevronRight, Mail } from 'lucide-react';
import { Breadcrumbs } from '../components/UI/breadcrumbs';
import { Tooltip } from '../components/UI/tooltip';

const FloatingComponents: React.FC = () => {
  const [animatedStates, setAnimatedStates] = useState<Record<string, any>>({
    currentStep: 0,
    isTooltipOpen: false,
    tooltipHovered: false,
  });

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    // Toggle switch state
    const switchInterval = setInterval(() => {
      setAnimatedStates((prev) => ({
        ...prev,
        switchChecked: !prev.switchChecked,
      }));
    }, 3000);

    // Update slider value with smoother transitions
    let direction = 1;
    const sliderInterval = setInterval(() => {
      setAnimatedStates((prev) => {
        const currentValue = prev.sliderValue || 0;
        let newValue = currentValue + (direction * 20);
        
        // Reverse direction at boundaries
        if (newValue >= 100) {
          newValue = 80;
          direction = -1;
        } else if (newValue <= 0) {
          newValue = 20;
          direction = 1;
        }
        
        return {
          ...prev,
          sliderValue: newValue,
        };
      });
    }, 4000); // Slower interval for smoother transitions

    // Update badge count
    const badgeInterval = setInterval(() => {
      setAnimatedStates((prev) => ({
        ...prev,
        badgeCount: ((prev.badgeCount || 0) % 9) + 1,
      }));
    }, 2000);

    // Cycle through breadcrumb steps (0, 1, 2)
    const breadcrumbInterval = setInterval(() => {
      setAnimatedStates((prev) => ({
        ...prev,
        currentStep: (prev.currentStep + 1) % 3, // Cycle through 0, 1, 2
      }));
    }, 3000);

    // Auto-show tooltip if not hovered
    const tooltipInterval = setInterval(() => {
      setAnimatedStates((prev) => ({
        ...prev,
        isTooltipOpen: !prev.tooltipHovered && !prev.isTooltipOpen, // Only show if not hovered
      }));
    }, 8000);

    intervals.push(switchInterval, sliderInterval, badgeInterval, breadcrumbInterval, tooltipInterval);
    return () => intervals.forEach(clearInterval);
  }, []);

  const showcaseComponents = [
    {
      id: 'breadcrumbs',
      demo: (
        <div className="w-full">
          <Breadcrumbs
            steps={['Pay', 'Confirm']}
            currentStep={animatedStates.currentStep}
            separatorIcon={ChevronRight}
            variant="step"
            onStepClick={(step) => {
              setAnimatedStates(prev => ({
                ...prev,
                currentStep: step
              }));
            }}
            className="cursor-pointer transition-all duration-300 hover:scale-105"
          />
        </div>
      ),
      position: { top: '5%', left: '10%', width: '60%', height: '12%', zIndex: 1 },
    },
    {
      id: 'square-switch',
      demo: (
        <div className="flex items-center justify-center">
          <Switch
            variant="square"
            animation="bounce"
            checked={animatedStates.switchChecked ?? true}
          />
        </div>
      ),
      position: { top: '8%', right: '5%', width: '20%', height: '8%', zIndex: 3 },
    },
    {
      id: 'variant-button',
      demo: (
        <div className="flex items-center justify-center h-full">
          <Button variant="default" animationVariant="wobble" size="sm">
            Wobble
          </Button>
        </div>
      ),
      position: { top: '25%', left: '25%', width: '25%', height: '10%', zIndex: 2 },
    },
    {
      id: 'badge',
      demo: (
        <div className="flex items-center justify-center h-full">
          <div className="relative inline-flex items-center">
            <Mail className="h-8 w-8" />
            <Badge text={String(animatedStates.badgeCount || 3)} type="primary" variant="bounce" className='w-8' />
          </div>
        </div>
      ),
      position: { top: '25%', right: '25%', width: '20%', height: '15%', zIndex: 4 },
    },
    {
      id: 'spinner',
      demo: (
        <div className="flex items-center justify-center h-full">
          <Spinner size={32} color="border-primary" />
        </div>
      ),
      position: { top: '45%', left: '15%', width: '30%', height: '18%', zIndex: 5 },
    },
    {
      id: 'ios-switch',
      demo: (
        <div className="flex items-center justify-center h-full">
          <Switch variant="ios" animation="jelly" checked={animatedStates.switchChecked} />
        </div>
      ),
      position: { top: '35%', right: '5%', width: '25%', height: '8%', zIndex: 1 },
    },
    {
      id: 'retro-slider',
      demo: (
        <div className="w-full px-2">
          <Slider
            value={[100 - (animatedStates.sliderValue || 50)]}
            max={100}
            variant="retro"
            showValue
          />
        </div>
      ),
      position: { top: '75%', left: '15%', width: '35%', height: '20%', zIndex: 1 },
    },
    {
      id: 'bouncy-button',
      demo: (
        <div className="flex items-center justify-center h-full">
          <Button variant="default" animationVariant="bounceSmooth" size="sm">
            Bouncy
          </Button>
        </div>
      ),
      position: { top: '70%', right: '10%', width: '30%', height: '12%', zIndex: 2 },
    },
    {
      id: 'tooltip',
      demo: (
        <div className="flex items-center justify-center h-full">
          <Tooltip 
            content={
                <div>Wassup!</div>
            } 
            animation="slideUp"
            bg="glass"
            className="transition-all duration-300"
          >
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Hover Me
            </button>
          </Tooltip>
        </div>
      ),
      position: { top: '55%', right: '30%', width: '30%', height: '15%', zIndex: 4 },
    },
  ];

  return (
    // Changed from 'fixed' to 'absolute' and positioned relative to container
    <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
      {showcaseComponents.map((component, index) => {
        const position = component.position;

        return (
          <motion.div
            key={component.id}
            className="absolute pointer-events-auto"
            style={{
              top: position.top,
              left: position.left,
              right: position.right,
              width: position.width,
              height: position.height,
              zIndex: position.zIndex,
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: 'easeOut',
            }}
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 4 + (index % 3),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-full"
            >
              <div className="relative h-full backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group hover:bg-gray-800/50">
                <div className="flex-1 flex items-center justify-center h-full">
                  {component.demo}
                </div>
                {/* <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingComponents;
