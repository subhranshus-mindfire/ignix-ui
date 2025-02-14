import fetch from 'node-fetch';

interface Component {
  name: string;
  content: string;
  dependencies?: string[];
}

interface ComponentRegistry {
  components: Record<string, {
    name: string;
    description: string;
    path: string;
    dependencies?: string[];
  }>;
}

const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/lakinmindfire/animate-ui/refs/heads/dev'; // Change to your repo URL

async function fetchComponentContent(path: string): Promise<string> {
  const response = await fetch(`${GITHUB_RAW_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch component from ${path}`);
  }
  return response.text();
}

export async function getAvailableComponents(): Promise<Component[]> {
  const registryUrl = `${GITHUB_RAW_BASE_URL}/registry/registry.json`;
  const registryResponse = await fetch(registryUrl);
  if (!registryResponse.ok) {
    throw new Error('Failed to fetch component registry');
  }
  
  const registry: ComponentRegistry = await registryResponse.json() as ComponentRegistry;
  const componentEntries = Object.entries(registry.components);
  
  return Promise.all(
    componentEntries.map(async ([key, componentData]) => {
      const content = await fetchComponentContent(componentData.path);
      return {
        name: componentData.name,
        content,
        dependencies: componentData.dependencies || [],
      };
    })
  );
}
