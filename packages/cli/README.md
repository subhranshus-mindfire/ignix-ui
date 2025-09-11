# Ignix UI CLI

[![NPM Version](https://img.shields.io/npm/v/@mindfiredigital/ignix-ui.svg)](https://www.npmjs.com/package/@mindfiredigital/ignix-ui)
[![License](https://img.shields.io/npm/l/@mindfiredigital/ignix-ui.svg)](https://github.com/mindfiredigital/ignix-ui/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../CONTRIBUTING.md)

**Ignix UI CLI** is a powerful command-line interface designed to streamline the development workflow for creating, managing, and customizing components in the Ignix UI library.

## Overview

The CLI provides a set of intuitive commands to automate repetitive tasks, enforce project conventions, and accelerate your development process. Whether you're initializing a new project, adding components, or managing dependencies, the Ignix UI CLI has you covered.

## Features

- **Project Initialization**: Quickly set up a new project with the necessary configurations and directory structure.
- **Component Scaffolding**: Generate new components from predefined or custom templates.
- **Dependency Management**: Automatically handle component dependencies.
- **Customizable Templates**: Extend and override default templates to match your project's needs.
- **Tailwind CSS Integration**: Seamlessly integrate with Tailwind CSS for styling.
- **Interactive Prompts**: User-friendly prompts to guide you through the development process.

## Installation

To install the Ignix UI CLI, use your preferred package manager:

```bash
# Using pnpm (recommended)
pnpm add -D @mindfiredigital/ignix-ui

# Using npm
npm install --save-dev @mindfiredigital/ignix-ui

# Using yarn
yarn add -D @mindfiredigital/ignix-ui
```

## Usage

### Initialize Project

To initialize Ignix UI in your project, run the `init` command:

```bash
npx @mindfiredigital/ignix-ui init
```

This command will:

- Add required dependencies to your `package.json`.
- Create a `tailwind.config.js` if one doesn't exist.
- Configure the `tailwind.config.js` to include Ignix UI components.
- Create an `.ignixrc.js` configuration file for custom settings.

### Add Component

To add a new component to your project, use the `add` command:

```bash
npx @mindfiredigital/ignix-ui add [component-name]
```

**Arguments:**

- `component-name`: The name of the component to add (e.g., `Button`, `Card`).

The `add` command will:

1. Create the component's directory and files based on the specified template.
2. Add any necessary dependencies.
3. Update the component registry.

## Documentation

For full documentation, visit [mindfiredigital.github.io/ignix-ui](https://mindfiredigital.github.io/ignix-ui/).

## Contributing

Please follow our [contributing guidelines](https://mindfiredigital.github.io/ignix-ui/docs/contribution-guide/how-to-contribute).
