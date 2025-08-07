import React from 'react';
import styles from './styles.module.css';
import ComponentShowcase from './components-showcase';
import ComponentDesktop from './components-desktop';

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.componentShowcase}>
      <div className="">
        <div className="hidden md:block">
          <ComponentDesktop />
          {/* <MagicBento spotlightRadius={300}/> */}
        </div>
        <div className="block md:hidden p-4">
          <ComponentShowcase />
        </div>
      </div>
    </section>
  );
}