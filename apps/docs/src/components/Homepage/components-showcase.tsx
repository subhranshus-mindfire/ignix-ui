// import React from 'react';
// import {
//   Component1Icon,
//   DrawingPinIcon,
//   MagicWandIcon,
//   MixIcon,
//   RocketIcon,
// } from '@radix-ui/react-icons';
// import { BentoCard, BentoGrid } from '../UI/bento-grid';
// import { Button } from '../UI/button';
// import { Slider } from '../UI/slider';
// import { Switch } from '../UI/switch';
// import { Breadcrumbs } from '../UI/breadcrumbs';
// import { Spinner } from '../UI/spinner';
// import { SectionTitleCapsule } from './section-title';
// import { useEffect, useState } from 'react';

// const AnimatedBreadcrumb = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const steps = ['Payment', 'Done'];
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentStep((prev) => (prev + 1) % steps.length);
//     }, 1500);
//     return () => clearInterval(interval);
//   }, [steps.length]);
  
//   return (
//     <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4">
//       <Breadcrumbs steps={steps} currentStep={currentStep} variant="step" />
//     </div>
//   );
// };

// const features = [
//   {
//     Icon: Component1Icon,
//     name: 'Animated Buttons',
//     description: 'Engage users with interactive, animated buttons for every occasion.',
//     href: '/ignix-ui/docs/components/button',
//     cta: 'Try it',
//     className: 'col-span-5 sm:col-span-2 lg:col-span-1',
//     background: (
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
//         <div className="flex flex-wrap items-center justify-center gap-4">
//           <Button variant="primary" animationVariant="wobble">
//             Wobble
//           </Button>
//           <Button variant="outline" animationVariant="pulse">
//             Pulse
//           </Button>
//         </div>
//       </div>
//     ),
//   },
//   {
//     Icon: MixIcon,
//     name: 'Interactive Sliders',
//     description: 'Allow users to select values with our sleek and customizable sliders.',
//     href: '/ignix-ui/docs/components/slider',
//     cta: 'Try it',
//     className: 'col-span-5 sm:col-span-3 lg:col-span-1', // Adjusted for 5-column grid
//     background: (
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-8">
//         <Slider
//           defaultValue={[60]}
//           animationType="breathe"
//           showValue
//           valueSuffix="%"
//           glowEffect
//         />
//       </div>
//     ),
//   },
//   {
//     Icon: MagicWandIcon,
//     name: 'Tactile Switches',
//     description: 'Modern, satisfying toggle switches with built-in animations.',
//     href: '/ignix-ui/docs/components/switch',
//     cta: 'Try it',
//     className: 'col-span-5 sm:col-span-3 lg:col-span-1', // Adjusted for 5-column grid
//     background: (
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-8 p-4">
//         <Switch variant="ios" animation="bounce" defaultChecked />
//         <Switch variant="square" animation="jelly" />
//       </div>
//     ),
//   },
//   {
//     Icon: RocketIcon,
//     name: 'Spinners & Loaders',
//     description: 'Indicate loading states with a variety of smooth, modern spinners.',
//     href: '/ignix-ui/docs/components/spinner',
//     cta: 'Try it',
//     className: 'col-span-5 sm:col-span-2 lg:col-span-1', // Adjusted for 5-column grid
//     background: (
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-12 p-4">
//         <Spinner size={40} color="border-primary" />
//         <Spinner size={40} variant="bars" color="bg-primary" />
//         <Spinner size={40} variant="dots-bounce" color="bg-primary" />
//       </div>
//     ),
//   },
//   {
//     Icon: DrawingPinIcon,
//     name: 'Breadcrumbs',
//     description: 'Guide and inform users with stylish status indicators and navigation aids.',
//     href: '/ignix-ui/docs/components/breadcrumb',
//     cta: 'Try it',
//     className: 'col-span-5 sm:col-span-5 lg:col-span-1', // Adjusted for 5-column grid
//     background: <AnimatedBreadcrumb />,
//   },
// ];

// export default function ComponentsShowcase() {
//   return (
//     <section
//       className=" relative rounded-3xl mb-16 bg-transparent"
//       aria-label="Featured components"
//     >
//       <header className="px-2 pb-4">
//         <SectionTitleCapsule highlight="components" align="center" caseInsensitive>
//           Featured Components
//         </SectionTitleCapsule>
//         <p className="text-center text-muted-foreground mt-2">
//           Explore our collection of high-quality, ready-to-use components.
//         </p>
//       </header>

//       <BentoGrid>
//         {features.map((feature, idx) => (
//           <BentoCard key={idx} {...feature} />
//         ))}
//       </BentoGrid>
//     </section>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Component1Icon,
  DrawingPinIcon,
  MagicWandIcon,
  MixIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import { Button } from '../UI/button';
import { Slider } from '../UI/slider';
import { Switch } from '../UI/switch';
import { Badge } from '../UI/badge';
import { Mail } from 'lucide-react';
import { Breadcrumbs } from '../UI/breadcrumbs';
import { Spinner } from '../UI/spinner';
import { cn } from '@site/src/utils/cn';

// Features list data
const features = [
  {
    Icon: Component1Icon,
    name: 'Animated Buttons',
    description: 'Engage users with interactive, animated buttons.',
    href: '/docs/components/button',
    component: (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" animationVariant="wobble">Wobble</Button>
        <Button variant="outline" animationVariant="pulse">Pulse</Button>
      </div>
    ),
  },
  {
    Icon: MixIcon,
    name: 'Interactive Sliders',
    description: 'Select values with sleek and customizable sliders.',
    href: '/docs/components/slider',
    component: (
      <Slider
        defaultValue={[60]}
        animationType="breathe"
        showValue
        valueSuffix="%"
        glowEffect
      />
    ),
  },
  {
    Icon: MagicWandIcon,
    name: 'Tactile Switches',
    description: 'Modern, satisfying toggle switches with animations.',
    href: '/docs/components/switch',
    component: (
      <div className="flex items-center justify-center gap-8 p-4">
        <Switch variant="ios" animation="bounce" defaultChecked />
        <Switch variant="square" animation="jelly" />
      </div>
    ),
  },
  {
    Icon: DrawingPinIcon,
    name: 'Badges & Breadcrumbs',
    description: 'Stylish status indicators and navigation aids.',
    href: '/docs/components/badge',
    component: (
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="relative">
          <Mail className="h-10 w-10 text-muted-foreground" />
          <Badge text="3" type="primary" variant="bounce" />
        </div>
        <Breadcrumbs steps={['Cart', 'Shipping', 'Done']} currentStep={1} variant="step" />
      </div>
    ),
  },
  {
    Icon: RocketIcon,
    name: 'Spinners & Loaders',
    description: 'Smooth, modern spinners for loading states.',
    href: '/docs/components/spinner',
    component: (
      <div className="flex items-center justify-center gap-12 p-4">
        <Spinner size={40} color="border-primary" />
        <Spinner size={40} variant="bars" color="bg-primary" />
        <Spinner size={40} variant="dots-bounce" color="bg-primary" />
      </div>
    ),
  },
];

export default function ComponentsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 } // Activate when 50% in view
    );

    featureRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="px-2 pb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">A Component for Every Need</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          From basics to advanced UI, Ignix provides beautiful, animated components.
        </p>
      </header>

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Left Navigation */}
        <nav className="lg:sticky top-28 self-start">
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={feature.name}>
                <button
                  onClick={() => {
                    featureRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={cn(
                    'w-full text-left flex items-center gap-4 p-4 rounded-lg transition-all',
                    activeIndex === idx
                      ? 'bg-primary/10 text-primary scale-[1.02] shadow-md'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <feature.Icon
                    className={cn(
                      'w-8 h-8',
                      activeIndex === idx ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                  <div>
                    <h3 className="font-semibold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-32">
          {features.map((feat, idx) => (
            <div
              key={feat.name}
              data-index={idx}
              ref={(el) => (featureRefs.current[idx] = el)}
              className="flex flex-col items-center"
            >
              {/* Preview Card Animation */}
              <div className="w-full h-[20rem] md:h-[24rem] rounded-xl border bg-background/50 backdrop-blur-sm shadow-xl flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {feat.component}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
