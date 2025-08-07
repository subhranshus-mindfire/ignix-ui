import { useEffect, useState, type ReactElement } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { motion } from 'framer-motion';

import styles from './index.module.css';
import { ArrowRight, Briefcase, Code, Download, Github, Layers, Palette } from 'lucide-react';
import { Button } from '../components/UI/button';
import { ToastProvider } from '../components/UI/toast';
import '../css/custom.css';
import DarkVeil from '../components/UI/darkveil';
import LightVeil from '../components/UI/darkveil/lightveil';
import { ShineBorder } from '../components/UI/shimmercard';

const Footer = () => (
  <footer className="text-center text-sm text-neutral-500">
    <p>By the developers, for the developers ❤️</p>
  </footer>
);

const getTheme = (): string => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') || 'dark';
};

function HomepageHeader(): ReactElement {
  return (
    <header className={clsx(styles.heroBanner, "flex items-center min-h-[calc(100vh-4rem)]")}>
      <div className={clsx(styles.heroContent, "w-full relative overflow-hidden")}>

        
        <section className="relative">
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="group inline-flex items-center gap-2 hover:gap-4 transition-all duration-300">
                <div className="relative">
                  <div className="relative rounded-2xl py-4 group-hover:scale-105 transition-all duration-300">
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
                  'text-3xl sm:text-4xl md:text-5xl p-0'
                )}>
                  <span className="bg-clip-text text-transparent bg-primary mr-2 font-medium">
                  Ignix
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/10 ml-2 font-bold">
                    UI
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="max-w-5xl mx-auto mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-5xl md:text-5xl font-bold">
                Ship your vision, not your components
              </span>
              <p className="text-lg md:text-xl ">
                build stunning UIs faster with our powerful, versatile component library
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-6"
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
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/docs/introduction">
                <Button
                  size="xl"
                  className="px-8 py-3 transition-all duration-300 cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                </Button>
              </Link>

              <Link to="https://github.com/mindfiredigital/ignix-ui">
                <Button
                  variant="outline"
                  size="xl"
                  className="px-8 py-3 border-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300 cursor-pointer"
                >
                  <Github className="mr-2 h-5 w-5" strokeWidth={2.5} />
                  GitHub
                </Button>
              </Link>
            </motion.div>
          </div>
          <ValuePropsSection />
          {/* <HomepageFeatures /> */}

        </section>
      </div>
    </header>
  );
}

const ValuePropsSection = () => {
  const features = [
    {
      icon: <Layers className="h-6 w-6 text-red-500" />,
      title: '100+ Components',
      description: 'Pre-built, customizable components with infinite variations for React and Next.js. Stop fiddling with CSS and start shipping features.',
    },
    {
      icon: <Briefcase className="h-6 w-6 text-red-500" />,
      title: 'Domain-Specific Kits',
      description: '(Coming Soon) Specialized component kits for healthcare, fintech, and more. Launch faster with domain-specific UI patterns.',
    },
    {
      icon: <Palette className="h-6 w-6 text-red-500" />,
      title: 'Custom Theming',
      description: 'Fully themeable components that adapt to your brand. No design debt, just beautiful UIs that scale.',
    },
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-4 bg-white/5 dark:bg-black/5 backdrop-blur-lg shadow-lg rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ShineBorder shineColor="#fa431a, #fc917a" className='rounded-xl' />

              <div className="relative z-10 flex flex-col items-start text-left ">
                <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-full'>
                  {feature.icon} 
                  </div>
                  <p className="text-xl font-medium text-left">{feature.title}</p>
                </div>
                <p className="text-neutral-600 text-left">{feature.description}</p>
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
          <div style={{ position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 4rem)' }} className="flex flex-col">
            <HomepageHeader />
            <main className="flex-grow">
              <HomepageFeatures />
            </main>
            <Footer />
          </div>
        </div>
      </ToastProvider>
    </Layout>
  );
}
