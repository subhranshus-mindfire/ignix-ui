import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import styles from './index.module.css';
import { ArrowRight, Check, Code, Copy, Github } from 'lucide-react';
import '../../css/custom.css';
import { Button } from '../UI/button';
import { ShineBorder } from '../UI/shine-border';
import TextType from '../UI/type-text';
import LightVeil from '../UI/darkveil/lightveil';
import DarkVeil from '../UI/darkveil';
import { AuroraText } from '../UI/aurora-text';

const getTheme = (): string => {
  if (typeof window === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') || 'dark';
};

export function HeroSection() {
  const [theme, setTheme] = useState(() => getTheme());
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Parallax spotlight
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section aria-label="Hero" className="relative overflow-hidden">
      {/* Background veil (already in your code) */}
      <div
        className="display-component-display fixed inset-0 pointer-events-none -z-10"
        aria-hidden
      >
        {theme === 'light' ? (
          <div className="fixed inset-0">
            <LightVeil speed={0.6} hueShift={50} warpAmount={1.4} />
          </div>
        ) : (
          <div className="fixed inset-0">
            <DarkVeil speed={0.6} hueShift={234} warpAmount={1.4} />
          </div>
        )}
        {/* Spotlight + noise overlay */}
        <div
          ref={spotlightRef}
          className="hero-spotlight -z-20"
          aria-hidden
          style={{ willChange: 'transform' }}
        />
        <div className="hero-noise -z-10" aria-hidden />
      </div>

      <header className={clsx(styles.heroBanner, 'flex items-center justify-center py-24')}>
        <div className={clsx(styles.heroContent, 'w-full relative z-10')}>
          <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
            {/* headline */}
            {/* <GlassCard /> */}
            <GlassText />
            <motion.div
              className="mx-auto mb-6 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1
                className="hero-h1 font-extrabold leading-tight tracking-tight"
                style={{ lineHeight: 0.95 }}
              >
                <span className="block">Ship Your Vision,</span>
                <span className="block">
                  Not Your{' '}
                  <span className="gradient-anim emphasis inline-block">
                    <TextType
                      text={['Components', 'Templates', 'Boilerplate', 'Headaches']}
                      typingSpeed={85}
                      pauseDuration={1400}
                      showCursor={true}
                      cursorCharacter="|"
                      className="inline"
                    />
                  </span>
                </span>
              </h1>

              <span className="mt-4 max-w-3xl text-lg md:text-xl text-foreground mx-auto text-center">
                Build stunning UIs <span className="text-primary font-semibold">faster</span> with
                our powerful &amp; versatile components library.
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <Link to="/docs/introduction" aria-label="Get started - Documentation">
                <Button
                  size="xl"
                  className="btn-primary px-8 py-3 rounded-2xl focus-visible:ring focus-visible:ring-primary/40"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
                </Button>
              </Link>

              <Link to="https://github.com/mindfiredigital/ignix-ui" aria-label="View on GitHub">
                <Button
                  variant="outline"
                  size="xl"
                  className="btn-glass px-8 py-3 rounded-2xl focus-visible:ring focus-visible:ring-primary/20"
                >
                  <Github className="mr-2 h-5 w-5" strokeWidth={2.5} /> GitHub
                </Button>
              </Link>
            </motion.div>

            {/* quick info / pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
            >
              <div className="code-pill inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm min-w-[280px] max-w-full overflow-hidden">
                <ShineBorder
                  shineColor="var(--primary)"
                  className="rounded-full"
                  borderWidth={1}
                  duration={8}
                />
                <CopyButton text="npm i @mindfiredigital/ignix-ui" />
                <span className="text-mono ml-1 truncate">npm i @mindfiredigital/ignix-ui</span>
              </div>

              <div className="code-pill inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm">
                <ShineBorder
                  shineColor="var(--primary)"
                  className="rounded-full"
                  borderWidth={1}
                  duration={8}
                />
                <Code className="h-5 w-5 text-orange-500" />
                <span className="text-mono">typescript ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>
    </section>
  );
}

/* CopyButton improved: uses state and accessible attributes */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'copy-btn inline-flex items-center justify-center rounded px-2 py-1',
        copied && 'copied'
      )}
      aria-pressed={copied}
      aria-label={copied ? 'Copied' : 'Copy install command'}
      title={copied ? 'Copied!' : 'Copy'}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

// Animation variants for cleaner code
const cardAnimation = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: [0, -8, 0],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

const logoAnimation = {
  animate: {
    y: [0, 6, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

function GlassText() {
  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="text-4xl font-bold text-center relative z-0"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <AuroraText colors={['#f7777f', '#f01622', '#e30613']}>Ignix UI</AuroraText>
      </motion.div>
    </div>
  );
}

export function GlassCard() {
  return (
    <motion.div
      className="relative w-18 h-18 mx-auto rounded-2xl border border-border/50 bg-background/10 backdrop-blur-sm shadow-lg"
      variants={cardAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="img/logo.png"
          alt="Mindfire logo"
          className="w-6 h-full object-contain"
          variants={logoAnimation}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
