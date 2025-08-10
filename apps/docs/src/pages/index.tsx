import { useEffect, useState, type ReactElement } from 'react';
import Layout from '@theme/Layout';
import { ToastProvider } from '../components/UI/toast';
import '../css/custom.css';
const getTheme = (): string => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return document.documentElement.getAttribute('data-theme') || 'dark';
};

import React from 'react';
import { HeroSection } from '../components/Homepage/hero';
import { CTASection } from '../components/Homepage/cta';
import FeaturedComponents from '@site/src/components/Homepage/components-showcase';
import { WhyIgnixSection } from '../components/Homepage/why-ignix';

const Footer = () => (
  <footer className="text-center text-sm text-neutral-500 bottom-0 w-full h-16 z-50">
    <p>© {new Date().getFullYear()} Mindfire Solutions FOSS</p>
  </footer>
);

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

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* <HomepageHeader /> */}
          <HeroSection />
          <FeaturedComponents />
          <WhyIgnixSection />
          <CTASection />
          <Footer />
        </div>
        {/* </div> */}
      </ToastProvider>
    </Layout>
  );
}
