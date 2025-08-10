import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import MagicBento from '../UI/magic-bento';
import { SparklesText } from '../UI/sparkle-text';
import { Button } from '../UI/button';
import { RocketIcon } from 'lucide-react';
import Link from '@docusaurus/Link';

const ComponentDesktop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });
  
  // State for interactive components
  const [sliderValue, setSliderValue] = useState(30);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [buttonText, setButtonText] = useState('Click Me!');
  const [badgeCount, setBadgeCount] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-animate components
  useEffect(() => {
    if (!isInView) return;
    
    // Slider animation
    const sliderInterval = setInterval(() => {
      setSliderValue(prev => (prev >= 100 ? 10 : prev + 10));
    }, 2000);
    
    // Switch toggle
    const switchInterval = setInterval(() => {
      setIsSwitchOn(prev => !prev);
    }, 3000);
    
    // Button text animation
    const buttonInterval = setInterval(() => {
      setButtonText(prev => prev === 'Click Me!' ? 'Try Me!' : 'Click Me!');
    }, 2500);
    
    // Step animation
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 3);
    }, 3500);
    
    return () => {
      clearInterval(sliderInterval);
      clearInterval(switchInterval);
      clearInterval(buttonInterval);
      clearInterval(stepInterval);
    };
  }, [isInView]);

  return (
    <motion.section
      ref={sectionRef}
      className="px-4 relative overflow-visible max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20,
        transition: { duration: 0.8, ease: 'easeOut' },
      }}
    >
      {/* Fade out effect with radial gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      <div className="relative">
        <SparklesText className="text-5xl font-bold text-center mb-2">
          Featured Components
        </SparklesText>
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 90%, transparent 100%)',
          }}
        >
          <div
            style={{
              maskImage: 'linear-gradient(to left, black 0%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 0%, black 90%, transparent 100%)',
            }}
          >
            <div
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
              }}
            >
              <MagicBento 
                sliderValue={sliderValue}
                onSliderChange={setSliderValue}
                isSwitchOn={isSwitchOn}
                onSwitchToggle={setIsSwitchOn}
                buttonText={buttonText}
                onButtonClick={() => setButtonText('Clicked!')}
                badgeCount={badgeCount}
                onBadgeIncrement={() => setBadgeCount(prev => prev + 1)}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
                spotlightRadius={300} 
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/docs/introduction">
            <Button size="xl" className="px-8 py-3 transition-all duration-300 cursor-pointer">
              <RocketIcon className="mr-2 h-6 w-6" strokeWidth={2.5} />
              Browse All Components
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ComponentDesktop;
