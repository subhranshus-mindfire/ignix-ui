import React from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, User, Mail, Calendar, FileText, Layout, Box, Heart } from 'lucide-react';
import { Navbar } from '../components/navigation/Navbar';
import { Sidebar } from '../components/navigation/Sidebar';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { Tabs } from '../components/navigation/Tabs';

const navItems = [
  {
    label: 'Dashboard',
    href: '#',
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: 'Features',
    href: '#',
    children: [
      { label: 'Analytics', href: '#' },
      { label: 'Reports', href: '#' },
      { label: 'Settings', href: '#' },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
];

const sidebarItems = [
  {
    label: 'Dashboard',
    href: '#',
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: 'Messages',
    href: '#',
    icon: <Mail className="h-4 w-4" />,
    badge: '5',
  },
  {
    label: 'Calendar',
    href: '#',
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    label: 'Documents',
    icon: <FileText className="h-4 w-4" />,
    children: [
      { label: 'Reports', href: '#', icon: <FileText className="h-4 w-4" /> },
      { label: 'Settings', href: '#', icon: <Settings className="h-4 w-4" /> },
    ],
  },
];

const breadcrumbItems = [
  { label: 'Dashboard', href: '#', icon: <Home className="h-4 w-4" /> },
  { label: 'Settings', href: '#', icon: <Settings className="h-4 w-4" /> },
  { label: 'Profile', href: '#', icon: <User className="h-4 w-4" /> },
];

const tabItems = [
  {
    value: 'overview',
    label: 'Overview',
    icon: <Layout className="h-4 w-4" />,
    content: (
      <div className="p-4 rounded-lg bg-[var(--header)]">
        <h3 className="text-lg font-medium mb-2">Overview Content</h3>
        <p>This is the overview tab content.</p>
      </div>
    ),
  },
  {
    value: 'analytics',
    label: 'Analytics',
    icon: <Box className="h-4 w-4" />,
    content: (
      <div className="p-4 rounded-lg bg-[var(--header)]">
        <h3 className="text-lg font-medium mb-2">Analytics Content</h3>
        <p>This is the analytics tab content.</p>
      </div>
    ),
  },
  {
    value: 'favorites',
    label: 'Favorites',
    icon: <Heart className="h-4 w-4" />,
    content: (
      <div className="p-4 rounded-lg bg-[var(--header)]">
        <h3 className="text-lg font-medium mb-2">Favorites Content</h3>
        <p>This is the favorites tab content.</p>
      </div>
    ),
  },
];

const ComponentSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-12"
  >
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <div className="space-y-8">{children}</div>
  </motion.section>
);

const VariantDemo = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="p-6 rounded-lg bg-[var(--sidebar-background)] border border-[var(--border)]"
  >
    <h3 className="text-lg font-medium mb-4">{title}</h3>
    {children}
  </motion.div>
);

export const NavigationDemo = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Navigation Components
      </motion.h1>

      <ComponentSection title="Navbar Variants">
        <VariantDemo title="Modern (with Glassmorphism)">
          <Navbar items={navItems} variant="modern" className="w-full" />
        </VariantDemo>
        <VariantDemo title="Minimal">
          <Navbar items={navItems} variant="minimal" className="w-full" />
        </VariantDemo>
        <VariantDemo title="Elevated">
          <Navbar items={navItems} variant="elevated" className="w-full" />
        </VariantDemo>
        <VariantDemo title="Bordered">
          <Navbar items={navItems} variant="bordered" className="w-full" />
        </VariantDemo>
        <VariantDemo title="Floating">
          <Navbar items={navItems} variant="floating" className="w-full" />
        </VariantDemo>
        <VariantDemo title="Gradient">
          <Navbar items={navItems} variant="gradient" className="w-full" />
        </VariantDemo>
        <VariantDemo title="Accent">
          <Navbar items={navItems} variant="accent" className="w-full" />
        </VariantDemo>
      </ComponentSection>

      <ComponentSection title="Sidebar Variants">
        <div className="grid grid-cols-2 gap-8">
          <VariantDemo title="Default">
            <Sidebar items={sidebarItems} variant="default" className="w-64 h-[400px]" />
          </VariantDemo>
          <VariantDemo title="Minimal">
            <Sidebar items={sidebarItems} variant="minimal" className="w-64 h-[400px]" />
          </VariantDemo>
          <VariantDemo title="Elevated">
            <Sidebar items={sidebarItems} variant="elevated" className="w-64 h-[400px]" />
          </VariantDemo>
          <VariantDemo title="Bordered">
            <Sidebar items={sidebarItems} variant="bordered" className="w-64 h-[400px]" />
          </VariantDemo>
          <VariantDemo title="Floating">
            <Sidebar items={sidebarItems} variant="floating" className="w-64 h-[400px]" />
          </VariantDemo>
        </div>
      </ComponentSection>

      <ComponentSection title="Breadcrumbs Variants">
        <VariantDemo title="Default">
          <Breadcrumbs items={breadcrumbItems} variant="default" />
        </VariantDemo>
        <VariantDemo title="Pills">
          <Breadcrumbs items={breadcrumbItems} variant="pills" />
        </VariantDemo>
        <VariantDemo title="Arrows">
          <Breadcrumbs items={breadcrumbItems} variant="arrows" />
        </VariantDemo>
        <VariantDemo title="Elevated">
          <Breadcrumbs items={breadcrumbItems} variant="elevated" />
        </VariantDemo>
        <VariantDemo title="Bordered">
          <Breadcrumbs items={breadcrumbItems} variant="bordered" />
        </VariantDemo>
      </ComponentSection>

      <ComponentSection title="Tabs Variants">
        <VariantDemo title="Default">
          <Tabs tabs={tabItems} variant="default" />
        </VariantDemo>
        <VariantDemo title="Pills">
          <Tabs tabs={tabItems} variant="pills" />
        </VariantDemo>
        <VariantDemo title="Underline">
          <Tabs tabs={tabItems} variant="underline" />
        </VariantDemo>
        <VariantDemo title="Elevated">
          <Tabs tabs={tabItems} variant="elevated" />
        </VariantDemo>
        <VariantDemo title="Bordered">
          <Tabs tabs={tabItems} variant="bordered" />
        </VariantDemo>
      </ComponentSection>
    </div>
  );
};
