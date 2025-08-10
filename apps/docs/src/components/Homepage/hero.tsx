import React from "react"
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';

import styles from './index.module.css';
import { ArrowRight, Code, Download, Github } from 'lucide-react';
import '../../css/custom.css';
import { Button } from "../UI/button";
import LightVeil from "../UI/darkveil/lightveil";
import DarkVeil from "../UI/darkveil";

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

                <header className={clsx(styles.heroBanner, styles.heroMesh, "flex items-center")}>
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
                                            <div className="relative rounded-2xl px-5 py-4 group-hover:scale-105 transition-all duration-300">
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
                                            'text-4xl md:text-5xl p-0'
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
                                    className="max-w-3xl mx-auto mb-6 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-white">
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
                        </section>
                    </div>
                </header>
            </div>
        </section>
    )
}
