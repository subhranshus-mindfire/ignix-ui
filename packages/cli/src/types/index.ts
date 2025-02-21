// types/index.ts
export interface ComponentFile {
    path: string;
    type: 'component' | 'types' | 'hook' | 'utils' | 'config';
    content?: string;
  }
  
  export interface ComponentConfig {
    name: string;
    description: string;
    dependencies: string[];
    files: Record<string, ComponentFile>;
  }
  
  export interface Registry {
    components: Record<string, ComponentConfig>;
  }
  
  export interface TailwindConfig {
    keyframes?: Record<string, Record<string, any>>;
    animation?: Record<string, string>;
  }
  
  export interface ComponentConfigFile {
    tailwind?: TailwindConfig;
  }