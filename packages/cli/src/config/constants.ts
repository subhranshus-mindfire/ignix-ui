export const REGISTRY_CONFIG = {
  BASE_URL: 'https://raw.githubusercontent.com/lakinmindfire/animate-ui/feature/tailwind-merge-config/packages/registry',
  PATHS: {
    REGISTRY: '/registry.json',
    COMPONENTS: '/components'
  }
} as const;

export const PROJECT_PATHS = {
  COMPONENTS_DIR: 'src/components/ui',
  UTILS_DIR: 'src/utils',
  CONFIG_FILES: {
    TAILWIND: 'tailwind.config.js',
    PACKAGE_JSON: 'package.json'
  }
} as const; 