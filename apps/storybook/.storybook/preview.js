/** @type { import('@storybook/react-vite').Preview } */

// import '../../../packages/registry/styles/globals.css';
import '../src/index.css'; 
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;