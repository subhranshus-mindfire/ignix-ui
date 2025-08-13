import React from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';

import styles from './index.module.css';
import { ArrowRight, Check, Code, Copy, Github } from 'lucide-react';
import '../../css/custom.css';
import { Button } from '../UI/button';
import { AuroraText } from '../UI/aurora-text';
import GradientText from '../UI/gradient-text';
import { ShineBorder } from '../UI/shine-border';
import FlameAnimation from '../UI/flames';
import Aurora from '../UI/aurora';
import TextType from '../UI/type-text';

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
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '500px',
                background:
                  'radial-gradient(ellipse at 20% 20%, rgba(218, 31, 5, 0.08), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(254, 101, 13, 0.08), transparent 60%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            ></div>
          ) : (
            <Aurora
              colorStops={['#DA1F05', 'rgb(51, 17, 12)', '#F33C04', '#FE650D']}
              speed={0.4}
              blend={1}
            />
          )}
        </div>
        <header className={clsx(styles.heroBanner, 'flex items-center mb-32 mt-8')}>
          <div className={clsx(styles.heroContent, 'w-full relative overflow-hidden')}>
            <section className="relative">
              <div className="relative z-10 max-w-7xl mx-auto">
                {/* Logo and Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="group inline-flex items-end hover:gap-1 transition-all duration-300 mb-8">
                    <div className="relative rounded-2xl px-2 py-1 group-hover:scale-105 transition-all duration-300">
                      <div className="w-16">
                        <FlameAnimation />
                      </div>
                    </div>
                    <div className={clsx(styles.heroTitle, 'text-5xl md:text-6xl font-bold')}>
                      <AuroraText colors={['#f7777f', '#f01622', '#e30613']}>Ignix UI</AuroraText>
                    </div>
                  </div>
                </motion.div>

                {/* Tagline */}
                <motion.div
                  className="mx-auto mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-4xl md:text-5xl font-bold space-y-4">
                    <span className="">Ship Your Vision, Not Your</span>
                    {/* <AuroraText
                      colors={['#f7777f', '#f33a45', '#f01622', '#e30613']}
                      className="mx-2"
                    > */}
                    <span className="text-primary">
                      <TextType
                        text={['Components', 'Templates', 'Boilerplate', 'Headaches']}
                        typingSpeed={90}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorBlinkDuration={0.5}
                        className="mx-2"
                        cursorCharacter="|"
                      />
                    </span>
                    {/* </AuroraText> */}
                  </span>
                  <div className="text-xl md:text-2xl text-center font-medium whitespace-nowrap overflow-hidden mt-2">
                    <span className="inline-flex flex-wrap justify-center items-baseline">
                      <span>Build stunning UIs </span>
                      <GradientText
                        colors={['#f7777f', '#f33a45', '#f01622', '#e30613']}
                        animationSpeed={6}
                        showBorder={false}
                        className="mx-1.5"
                      >
                        faster
                      </GradientText>
                      <span>with our powerful & versatile components library.</span>
                    </span>
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
                      className="px-8 py-3 transition-all duration-300 bg-[linear-gradient(90deg,_var(--primary)_0%,_color-mix(in_oklab,_var(--primary)_55%,_transparent)_100%)]
                  shadow-[0_0_0_1px_color-mix(in_oklab,_var(--primary-foreground)_15%,_transparent),0_8px_24px_color-mix(in_oklab,_var(--primary)_30%,_transparent)]
                  hover:shadow-[0_0_0_1px_color-mix(in_oklab,_var(--primary-foreground)_25%,_transparent),0_12px_36px_color-mix(in_oklab,_var(--primary)_42%,_transparent)]
                  transition-all duration-300 ease-out
                  hover:scale-[1.03] active:scale-95
                  relative overflow-hidden
                  before:absolute before:inset-0
                  before:bg-[linear-gradient(90deg,_transparent,_rgba(255,255,255,0.16),_transparent)]
                  before:translate-x-[-120%] hover:before:translate-x-[120%] before:transition-transform before:duration-700"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                    </Button>
                  </Link>

                  <Link to="https://github.com/mindfiredigital/ignix-ui">
                    <Button
                      variant="outline"
                      size="xl"
                      className="px-8 py-3 border-2 transition-colors duration-300"
                    >
                      <Github className="mr-2 h-5 w-5" strokeWidth={2.5} />
                      GitHub
                    </Button>
                  </Link>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="flex flex-wrap justify-center gap-2 sm:gap-6 mb-6 mt-14"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="p-2 px-4 flex items-center gap-3 rounded-full backdrop-blur-sm">
                    <ShineBorder
                      shineColor="var(--primary)"
                      className="rounded-full"
                      borderWidth={1}
                      duration={8}
                    />
                    <CopyButton
                      text="npm i @mindfiredigital/ignix-ui"
                      style={{
                        padding: '0.375rem',
                        borderRadius: '0.375rem',
                        border:
                          '1px solid color-mix(in oklab, hsl(var(--primary)) 20%, transparent)',
                        background: 'color-mix(in oklab, hsl(var(--primary)) 8%, transparent)',
                        color: 'hsl(var(--primary))',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />

                    <span className="text-lg font-mono">npm i @mindfiredigital/ignix-ui</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 px-4 rounded-full backdrop-blur-sm">
                    <ShineBorder
                      shineColor="var(--primary)"
                      className="rounded-full"
                      borderWidth={1}
                      duration={8}
                    />
                    <Code className="h-5 w-5 text-orange-500" />
                    <span className="text-lg font-mono">typescript ready</span>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </header>
      </div>
    </section>
  );
}

function CopyButton({ text, style }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          'color-mix(in oklab, hsl(var(--primary)) 12%, transparent)';
        e.currentTarget.style.borderColor =
          'color-mix(in oklab, hsl(var(--primary)) 30%, transparent)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          'color-mix(in oklab, hsl(var(--primary)) 8%, transparent)';
        e.currentTarget.style.borderColor =
          'color-mix(in oklab, hsl(var(--primary)) 20%, transparent)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
      title={copied ? 'Copied!' : 'Copy command'}
    >
      {copied ? (
        <Check style={{ width: '16px', height: '16px' }} />
      ) : (
        <Copy style={{ width: '16px', height: '16px' }} />
      )}
    </button>
  );
}
