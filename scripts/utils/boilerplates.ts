export function indexBoilerplate(componentName: string): string {
  return `import React from "react";

export interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ children, className }) => {
  return <div className={className}>${componentName} Component {children}</div>;
};
`;
}

export function demoBoilerplate(componentName: string): string {
  return `import React from "react";
import { ${componentName} } from "../UI/${componentName}";

const ${componentName}Demo:React.FC = () => {
  return <div>Hello from ${componentName}!</div>;
};

export default ${componentName}Demo;
`;
}

export function testBoilerplate(componentName: string): string {
  return `// @ts-nocheck
// Note: Project does not have testing library setup yet

describe("${componentName} Component", () => {
  it("placeholder test", () => {
    expect(true).toBe(true);
  });
});
`;
}
