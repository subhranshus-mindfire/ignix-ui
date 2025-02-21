# Animated UI Kit

A modern, high-performance animated component library built on top of Radix UI. Designed for seamless integration and maximum flexibility.

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-cc00ff.svg)](https://turborepo.org/)
[![Radix UI](https://img.shields.io/badge/powered%20by-Radix%20UI-blue.svg)](https://www.radix-ui.com/)

## Features

- High-Performance Animations - Optimized for smooth transitions and interactions
- Radix UI Integration - Built on top of production-ready, accessible components
- Zero-Config Setup - Works out of the box with popular frameworks
- Type-Safe - Written in TypeScript for better developer experience
- Customizable - Easily modify animations and styling to match your brand
- Accessible - WCAG 2.1 compliant with full keyboard navigation
- Responsive - Mobile-first design approach

## Quick Start

```bash
# Clone the repository
git clone https://github.com/lakinmindfire/animate-ui

# Install dependencies
pnpm install


```

## Project Structure

```
animate-ui/
├── apps/
│   ├── docs/           # Documentation site       
│   └── playground/     # Testing app
│   
│   
├── packages/
│   ├── cli/            # cli commands & utilities
│   └── registry/       # registry components
│   
├── .changeset
├── .github           # github ci/cd & pr template
├── .husky            # husky for github pre commit
├── .commitlintrc.json  # commit lint to mainain commit message
├── .eslintignore # files tp ignore in eslint
├── .eslintrc.js  # eslint configs
├── .gitignore    #ignored files for github
├── .npmrc  # npm publish configs
├── .prettierrc  #prettier format configs
├── CODE_OF_CONDUCT.md  # standard code of conduct
├── CONTRIBUTING.md   # contribution guidelines
├── package.json  # package json
├── .pnpm-workspace.json  # Workspace configuration
├── README.MD         # documentation
├── tsconfig.json     # Workspace configuration
└── turbojson         # Turborepo configuration
```

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Installation Steps

1. **Setup your development environment**:
   ```bash
   # Install pnpm if you haven't already
   npm install -g pnpm

   # Install project dependencies
   pnpm install

   # Build all packages
   pnpm build
   ```

2. **Start the development server**:
   ```bash
   # Start all development environments
   pnpm dev

   # Or start specific packages
   pnpm dev --filter=docs
   ```

3. **Running tests**:
   ```bash
   # Run all tests
   pnpm test

   # Run tests in watch mode
   pnpm test:watch
   ```

## Package Commands

- `pnpm dev` - Start development environment
- `pnpm build` - Build all packages
- `pnpm test` - Run tests
- `pnpm lint` - Lint all files
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Clean build artifacts

## Available Components

Our library includes a variety of animated components:

- **Transitions**
  - Fade
  - Slide
  - Scale
  - Flip
  
- **Interactions**
  - Hover Effects
  - Click Animations
  - Focus States
  
- **Page Transitions**
  - Route Changes
  - Modal Transitions
  - Loading States

## Customization

### Theme Configuration

```typescript
// theme.config.ts
import { createTheme } from '@your-library/core'

export const theme = createTheme({
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Add custom easing functions
    },
  },
})
```

### Component Customization

```typescript
import { AnimatedButton } from '@your-library/components'

// Custom animation configuration
<AnimatedButton
  animation={{
    type: 'scale',
    duration: 300,
    easing: 'easeOut',
  }}
>
  Click Me
</AnimatedButton>
```

## Documentation

Comprehensive documentation is available at `http://localhost:3000` when running the development server. It includes:

- Getting Started Guide
- Component API Reference
- Animation Examples
- Best Practices
- Performance Tips
- Accessibility Guidelines

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for the excellent primitive components
- [Turborepo](https://turborepo.org/) for the build system
- [pnpm](https://pnpm.io/) for package management

## Bug Reports

Found a bug? Please open an issue with:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Example code (if possible)