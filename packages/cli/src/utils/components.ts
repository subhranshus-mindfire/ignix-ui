import axios from 'axios';

interface Component {
  name: string;
  content: string;
  dependencies?: string[];
}

export async function getComponent(name: string): Promise<Component | null> {
  try {
    // First fetch the registry to get component info
    const registryUrl = 'https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry/registry.json';
    const { data: registry } = await axios.get(registryUrl);
    
    const componentInfo = registry.components[name];
    if (!componentInfo) {
      throw new Error(`Component ${name} not found in registry`);
    }

    // Construct the correct raw URL for the component
    const componentUrl = `https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry/components/${name}/index.tsx`;
    const { data: content } = await axios.get(componentUrl);

    return {
      name,
      content,
      dependencies: componentInfo.dependencies
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error(`Component ${name} not found in repository`);
      } else {
        console.error(`Error fetching component ${name}:`, error.message);
      }
    } else {
      console.error(`Unexpected error:`, error);
    }
    return null;
  }
}

export async function getAvailableComponents(): Promise<Component[]> {
  try {
    const registryUrl = 'https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry/registry.json';
    const { data: registry } = await axios.get(registryUrl);

    const components = await Promise.all(
      Object.entries(registry.components).map(async ([name, componentInfo]) => {
        const componentUrl = `https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry/components/${name}/index.tsx`;
        const { data: content } = await axios.get(componentUrl);

        return {
          name,
          content,
          dependencies: (componentInfo as any).dependencies
        };
      })
    );

    return components;
  } catch (error) {
    console.error('Error loading components from registry:', error);
    return [];
  }
}