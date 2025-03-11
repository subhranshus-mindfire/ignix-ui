# @animate-ui/registry

Component registry for Animate UI - A beautiful, animated component library.

## Components

### Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Usage

Components are automatically installed when using the `@animate-ui/cli` package. However, you can also install them manually:

```bash
# npm
npm install @animate-ui/core

# yarn
yarn add @animate-ui/core

# pnpm
pnpm add @animate-ui/core
```

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

### Adding a New Component

1. Create a new directory in `components/` with your component name
2. Add the following files:
   - `index.ts` - Component exports
   - `types.ts` - TypeScript types
   - `styles.css` - Component styles (if needed)
   - `README.md` - Component documentation
3. Update the component registry in `src/registry.ts`
4. Add tests in `__tests__/`

## License

MIT
