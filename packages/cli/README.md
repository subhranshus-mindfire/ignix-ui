# Animation UI CLI

A powerful CLI tool for managing UI components in your project. Built with TypeScript and modern best practices.

## Architecture Overview

### Core Services

#### ComponentService (`src/services/ComponentService.ts`)

Manages component operations with the following key functions:

- `getComponent(name: string)`: Fetches component data from registry
- `installComponent(component: ComponentConfig)`: Installs component files
- `mergeTailwindConfig(newConfig: string)`: Safely merges Tailwind configurations
- `getAvailableComponents()`: Lists available components

#### TelemetryService (`src/services/TelemetryService.ts`)

Handles usage analytics with privacy controls:

- `trackEvent(name: string, properties?: Record<string, any>)`: Tracks CLI usage
- `getUserId()`: Manages anonymous user identification

#### DependencyService (`src/services/DependencyService.ts`)

Manages package dependencies:

- `installDependencies(dependencies: string[])`: Installs required packages
- Supports npm, yarn, pnpm, and bun

### Commands

#### InitCommand (`src/commands/init.ts`)

Project initialization command:

- Creates project structure
- Sets up Tailwind configuration
- Installs core dependencies

#### AddCommand (`src/commands/add.ts`)

Component addition command:

- Interactive component selection
- Dependency installation
- Configuration merging

### Utilities

#### Logger (`src/utils/logger.ts`)

Consistent logging interface:

- `info(message: string)`: Information messages
- `success(message: string)`: Success messages
- `error(message: string, suggestions?: string[])`: Error messages with help

#### Error Handling (`src/errors/CLIError.ts`)

Custom error classes:

- `CLIError`: Base error class with suggestions
- `ComponentNotFoundError`: Component lookup failures
- `RegistryError`: Registry operation failures

### Configuration

#### Constants (`src/config/constants.ts`)

Central configuration:

- Registry endpoints
- Project paths
- File locations

## Best Practices Implemented

### Performance

- Lazy loading of heavy operations
- Caching of registry data
- Efficient file operations

### Security

- Safe config parsing
- Validated file operations
- Secure dependency management

### Reliability

- Retry logic for network operations
- Rollback capabilities for failed operations
- Comprehensive error handling

### Extensibility

- Modular architecture
- Service-based design
- Clear separation of concerns

## Usage Examples

### Initialize Project

```bash
npx animation-ui init
```

### Add Component

```bash
npx animation-ui add <component-name>
```

### Key Features

- Singleton pattern for services
- Comprehensive error handling
- Telemetry with privacy controls
- Safe configuration merging
- Multi-package-manager support

### Error Handling Strategy

- Custom error classes with suggestions
- Graceful degradation
- Helpful error messages
- Recovery suggestions

### Performance Optimizations

- Registry caching
- Lazy loading
- Retry logic with exponential backoff
- Efficient file operations

## Contributing

### Adding New Features

1. Create relevant service/command classes
2. Implement error handling
3. Add telemetry tracking
4. Update documentation

### Testing

- Unit tests for services
- Integration tests for commands
- E2E tests for workflows

### Code Style

- Follow TypeScript best practices
- Document public APIs
- Include error handling
- Add telemetry where appropriate
