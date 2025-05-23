import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['introduction', 'installation'],
    },
    {
      type: 'category',
      label: 'Components',
      items: ['components/accordion', 'components/fade', 'components/slide', 'components/toast','components/navbar', 'components/sidebar', 'components/tab', 'components/breadcrumbs', 'components/tooltip','components/input',
        'components/textArea','components/spinner','components/dropdown'],
    },
  ],
};

export default sidebars;
