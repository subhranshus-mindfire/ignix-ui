import React from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';

import styles from './index.module.css';
import { ArrowRight, Code, Download, Github } from 'lucide-react';
import '../../css/custom.css';
import { Button } from '../UI/button';
import LightVeil from '../UI/darkveil/lightveil';
import DarkVeil from '../UI/darkveil';
import { AuroraText } from '../UI/aurora-text';
import RotatingText from '../UI/rotating-text';

const getTheme = (): string => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') || 'dark';
};

export function HeroSection() {
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
  return (
    <section>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          className="display-component-display"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {theme === 'light' ? (
            <LightVeil speed={0.6} hueShift={50} warpAmount={1.4} />
          ) : (
            <DarkVeil speed={0.6} hueShift={234} warpAmount={1.4} />
          )}
        </div>

        <header className={clsx(styles.heroBanner, 'flex items-center mb-32 mt-16')}>
          <div className={clsx(styles.heroContent, 'w-full relative overflow-hidden')}>
            <section className="relative">
              <div className="relative z-10 max-w-7xl mx-auto">
                {/* Logo and Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="group inline-flex items-center hover:gap-1 transition-all duration-300">
                    <div className="relative">
                      <div className="relative rounded-2xl px-2 py-2 group-hover:scale-105 transition-all duration-300">
                        <img
                          src="img/logo.png"
                          alt="Ignix UI"
                          width={32}
                          height={32}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h1 className={clsx(styles.heroTitle, 'text-4xl md:text-5xl')}>
                      <AuroraText
                        colors={[
                          'var(--primary-lighter)',
                          'var(--primary-light)',
                          'var(--primary)',
                          'var(--primary-dark)',
                        ]}
                      >
                        Ignix UI
                      </AuroraText>
                    </h1>
                  </div>
                </motion.div>

                {/* Tagline */}
                <motion.div
                  className="mx-auto mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-3xl md:text-4xl font-bold space-y-4">
                    <span className="inline-block">Ship Your Vision, Not Your</span>
                    <div className="relative inline-flex items-center mx-2">
                      <span className="absolute -inset-1.5 rounded-lg -z-10" />
                      <RotatingText
                      texts={["Components", "Worries", "Headaches", "Delays"]}
                      mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                      staggerFrom={'last'}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-120%' }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden"
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                      />
                    </div>
                  </span>
                  <p className="text-lg md:text-xl ">
                    build stunning UIs faster with our powerful, versatile component library
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="flex flex-wrap justify-center gap-2 sm:gap-6 mb-6"
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
                    <Button size="xl" className="px-8 py-3 transition-all duration-300">
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
            </section>
          </div>
        </header>
      </div>
    </section>
  );
}
