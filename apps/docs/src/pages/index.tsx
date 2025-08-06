import { useEffect, useState, type ReactElement } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { motion } from 'framer-motion';

import styles from './index.module.css';
import { ArrowRight, Briefcase, Github, Layers, Palette } from 'lucide-react';
import { Button } from '../components/UI/button';
import { ToastProvider } from '../components/UI/toast';
import '../css/custom.css';
import DarkVeil from '../components/UI/darkveil';
import LightVeil from '../components/UI/darkveil/lightveil';
import { ShineBorder } from '../components/UI/shimmercard';

const getTheme = (): string => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') || 'dark';
};

function HomepageHeader(): ReactElement {
  return (
    <header className={clsx(styles.heroBanner, "flex items-center")}>
      <div className={clsx(styles.heroContent, "w-full relative overflow-hidden")}>

        
        <section className="relative">
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            
            {/* Logo and Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="group inline-flex items-center gap-2 hover:gap-4 transition-all duration-300">
                <div className="relative">
                  <div className="relative backdrop-blur-lg rounded-2xl px-5 py-4 border border-red-500/20 shadow-xl group-hover:scale-105 transition-all duration-300">
                    <img
                      src="img/logo.png"
                      alt="Ignix UI"
                      width={32}
                      height={32}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h1 className={clsx(
                  styles.heroTitle,
                  'font-black text-5xl md:text-7xl tracking-tight leading-none'
                )}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600">
                    Ignix UI
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="max-w-3xl mx-auto mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-white">
                Ship your vision, not your components
              </h1>
              <p className="text-lg md:text-xl">
                Build stunning UIs faster with a powerful, versatile component library
              </p>
            </motion.div>

            {/* Quick Stats */}
            {/* <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm">
                <Download className="h-5 w-5 text-red-500" />
                <span className="text-sm font-mono">npm i @mindfiredigital/ignix-ui</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm">
                <Code className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-mono">typescript ready</span>
              </div>
            </motion.div> */}

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/docs/introduction">
                <Button
                  size="xl"
                  className="px-8 py-3 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                </Button>
              </Link>

              <Link to="https://github.com/mindfiredigital/ignix-ui">
                <Button
                  variant="outline"
                  size="xl"
                  className="px-8 py-3 border-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300"
                >
                  <Github className="mr-2 h-5 w-5" strokeWidth={2.5} />
                  GitHub
                </Button>
              </Link>
            </motion.div>
          </div>
          <ValuePropsSection />
          <HomepageFeatures />

        </section>
      </div>
    </header>
  );
}

const ValuePropsSection = () => {
  const features = [
    {
      icon: <Layers className="h-8 w-8 mb-4 text-red-500" />,
      title: '100+ Components, Infinite Variations',
      description:
        'A vast library of components with unique designs and animations. Stop fiddling with CSS and start shipping features.',
    },
    {
      icon: <Briefcase className="h-8 w-8 mb-4 text-orange-500" />,
      title: 'Domain-Specific Kits (Coming Soon)',
      description:
        'Specialized component sets for industries like healthcare and fintech, helping you launch in record time.',
    },
    {
      icon: <Palette className="h-8 w-8 mb-4 text-red-500" />,
      title: 'Designed for You',
      description:
        'Create amazing user experiences without the design debt. Get all the power and flexibility you need.',
    },
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white/5 dark:bg-black/5 backdrop-blur-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ShineBorder shineColor="#fa431a, #fc917a" className='rounded-xl' />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home(): ReactElement {
  // Usage in component
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Beautiful, animated UI components for modern web applications"
    >
      <ToastProvider>
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
          {/* DarkVeil background */}
          {theme === 'light' ? (
            <div
              className="display-component-display"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
              }}
            >
              <LightVeil speed={0.6} hueShift={50} warpAmount={1.4} />
            </div>
          ) : (
            <div
              className="display-component-display"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
              }}
            >
              <DarkVeil speed={0.6} hueShift={234} warpAmount={1.4} />
            </div>
          )}
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <HomepageHeader />
            {/* <main>
              <HomepageFeatures />
            </main> */}
          </div>
        </div>
      </ToastProvider>
    </Layout>
  );
}
