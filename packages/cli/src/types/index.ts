export interface ComponentConfig {
    name: string;
    description: string;
    dependencies?: string[];
    files: {
      [key: string]: {
        path: string;
        type: string;
        content?: string;
      };
    };
  }
  
  export interface Registry {
    components: {
      [key: string]: ComponentConfig;
    };
  }
  
  export interface ComponentConfigFile {
    tailwind?: {
      theme?: {
        extend?: {
          keyframes?: Record<string, unknown>;
          animation?: Record<string, string>;
        };
      };
    };
  }

export interface FileInfo {
  path: string;
  type: 'component' | 'types' | 'hook' | 'tailwind-config';
  content?: string;
}