export class CLIError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly suggestions?: string[]
  ) {
    super(message);
    this.name = 'CLIError';
  }
}

export class ComponentNotFoundError extends CLIError {
  constructor(componentName: string) {
    super(
      `Component "${componentName}" not found in registry`,
      'COMPONENT_NOT_FOUND',
      ['Check available components with: npx animation-ui list']
    );
  }
}

export class RegistryError extends CLIError {
  constructor(message: string) {
    super(
      `Registry error: ${message}`,
      'REGISTRY_ERROR',
      ['Try again later or report this issue']
    );
  }
} 