# Ignix UI CLI

Command-line interface for managing and developing Ignix UI components.

## Overview

The Ignix UI CLI provides a powerful set of tools for:

- Creating new components with proper structure and best practices
- Managing component dependencies
- Building and testing components
- Configuring project settings
- Automating development workflows

## Installation

```bash
# Using pnpm (recommended)
pnpm add -D @ignix-ui/cli

# Using npm
npm install --save-dev @ignix-ui/cli

# Using yarn
yarn add -D @ignix-ui/cli
```

## Commands

### Initialize Project

Sets up Ignix UI in your project:

```bash
pnpm ignix-ui init [options]

Options:
  -y, --yes    Skip confirmation prompts
```

This will:

- Add necessary dependencies
- Create configuration files
- Set up the component directory structure
- Configure build tools

### Add Component

Add a new component to your project:

```bash
pnpm ignix-ui add [component-name] [options]

Arguments:
  component-name    Name of the component to add

Options:
  --type <type>    Component type (primitive/composite/layout/animation)
  --path <path>    Custom component path
```

The command will:

1. Create component directory structure
2. Generate component files from templates
3. Add necessary dependencies
4. Update component registry
5. Create documentation template

## Component Templates

The CLI provides several component templates:

### Primitive Components

Basic building blocks with minimal dependencies:

```
ComponentName/
├── index.tsx           # Main component
├── index.types.ts     # TypeScript types
├── useComponent.ts    # Component hooks
└── config.ts          # Tailwind configuration
```

### Composite Components

Complex components composed of primitives:

```
ComponentName/
├── index.tsx
├── index.types.ts
├── useComponent.ts
├── config.ts
└── components/        # Sub-components
    ├── Part1.tsx
    └── Part2.tsx
```

### Layout Components

Structure and layout components:

```
ComponentName/
├── index.tsx
├── index.types.ts
├── useComponent.ts
└── config.ts
```

### Animation Components

Animation-specific components:

```
ComponentName/
├── index.tsx
├── index.types.ts
├── useComponent.ts
├── config.ts
└── animations/       # Animation definitions
    └── variants.ts
```

## Configuration

Create an `.ignixrc.js` file in your project root:

```javascript
module.exports = {
  // Component settings
  components: {
    path: 'src/components',
    types: ['primitive', 'composite', 'layout', 'animation'],
    defaultType: 'primitive',
  },

  // Build configuration
  build: {
    target: 'es2019',
    formats: ['esm', 'cjs'],
    minify: true,
  },

  // Template settings
  templates: {
    // Custom template overrides
    customTemplates: './templates',

    // Default state management
    useHooks: true,
    useContext: false,
  },

  // Tailwind configuration
  tailwind: {
    configPath: './tailwind.config.js',
    // Component-specific Tailwind settings
  },
};
```

## Development Workflow

1. Initialize your project:

   ```bash
   pnpm ignix-ui init
   ```

2. Add new components:

   ```bash
   pnpm ignix-ui add Button --type primitive
   ```

3. Build components:

   ```bash
   pnpm ignix-ui build
   ```

4. Test components:
   ```bash
   pnpm ignix-ui test
   ```

## Project Structure

```
cli/
├── src/
│   ├── commands/          # CLI commands
│   │   ├── init.ts       # Project initialization
│   │   ├── add.ts        # Component creation
│   │   └── build.ts      # Build process
│   ├── templates/        # Component templates
│   ├── services/         # Core services
│   │   ├── component.ts  # Component management
│   │   └── config.ts     # Configuration
│   ├── utils/           # Helper utilities
│   └── types/           # TypeScript types
├── bin/                 # Executable scripts
└── dist/               # Compiled output
```

## Contributing

See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Install dependencies
pnpm install

# Build CLI
pnpm build

# Run tests
pnpm test

# Watch mode
pnpm dev
```

## License

MIT - See [LICENSE](../../LICENSE) for details.
