import React, { JSX } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    description: 'Designed from the ground up to be easily installed and used in your projects.',
    icon: '🚀',
  },
  {
    title: 'Beautiful Animations',
    description: 'Pre-built animations that bring life to your UI components.',
    icon: '✨',
  },
  {
    title: 'Fully Customizable',
    description: 'Extend or customize component animations to match your design needs.',
    icon: '🎨',
  },
];

function Feature({ title, description, icon }: FeatureItem) {
  return (
    <motion.div
      className={clsx('col col--4')}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text--center padding-horiz--md">
        <h3>
          {icon} {title}
        </h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={clsx('features', styles.features)}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
