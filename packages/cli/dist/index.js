#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/init.ts
import path from "path";
import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";

// src/utils/getPackageManager.ts
import { detect } from "@antfu/ni";
async function getPackageManager(targetDir) {
  const packageManager = await detect({ programmatic: true, cwd: targetDir });
  if (packageManager === "yarn@berry")
    return "yarn";
  if (packageManager === "pnpm@6")
    return "pnpm";
  if (packageManager === "bun")
    return "bun";
  return packageManager ?? "npm";
}

// src/utils/dependencies.ts
import { execSync } from "child_process";
async function addDependencies(options) {
  var _a, _b;
  const pkgManager = options.packageManager || "npm";
  if ((_a = options.dependencies) == null ? void 0 : _a.length) {
    if (pkgManager === "bun") {
      execSync(`bun add ${options.dependencies.join(" ")}`, {
        stdio: "inherit"
      });
    } else {
      execSync(`${pkgManager} add ${options.dependencies.join(" ")}`, {
        stdio: "inherit"
      });
    }
  }
  if ((_b = options.devDependencies) == null ? void 0 : _b.length) {
    if (pkgManager === "bun") {
      execSync(`bun add --dev ${options.devDependencies.join(" ")}`, {
        stdio: "inherit"
      });
    } else {
      execSync(`${pkgManager} add -D ${options.devDependencies.join(" ")}`, {
        stdio: "inherit"
      });
    }
  }
}

// src/commands/init.ts
async function init(options) {
  const spinner = ora("Initializing animation-ui...").start();
  try {
    const packageJson = await fs.readJSON("package.json");
    const tailwindConfigPath = path.resolve("tailwind.config.js");
    if (!await fs.pathExists(tailwindConfigPath)) {
      await fs.writeFile(
        tailwindConfigPath,
        `module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}`
      );
    }
    const uiDir = path.resolve("src/components/ui");
    await fs.ensureDir(uiDir);
    const utilsDir = path.resolve("utils");
    await fs.ensureDir(utilsDir);
    await fs.writeFile(
      path.join(utilsDir, "cn.ts"),
      `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
    );
    const pkgManager = await getPackageManager(process.cwd());
    await addDependencies({
      dependencies: ["framer-motion", "clsx", "tailwind-merge"],
      devDependencies: ["tailwindcss", "autoprefixer", "postcss"],
      packageManager: pkgManager
    });
    spinner.succeed(chalk.green("Successfully initialized animation-ui"));
    console.log("\nNext steps:");
    console.log(
      "1. Add components using:",
      chalk.cyan("npx animation-ui add <component>")
    );
    console.log("2. Start using animations in your project!\n");
  } catch (error) {
    spinner.fail(chalk.red("Failed to initialize animation-ui"));
    console.error(error);
    process.exit(1);
  }
}

// src/commands/add.ts
import prompts from "prompts";
import ora2 from "ora";
import chalk2 from "chalk";

// src/utils/components.ts
import axios from "axios";
import fs3 from "fs-extra";
import path3 from "path";

// src/utils/tailwind.ts
import fs2 from "fs-extra";
import path2 from "path";
async function mergeTailwindConfig(config2, projectRoot2 = process.cwd()) {
  var _a, _b, _c, _d, _e;
  const configPath = path2.join(projectRoot2, "tailwind.config.js");
  if (!await fs2.pathExists(configPath)) {
    throw new Error("tailwind.config.js not found");
  }
  let existingConfig = await import(configPath);
  existingConfig = {
    ...existingConfig,
    theme: {
      ...existingConfig.theme,
      extend: {
        ...(_a = existingConfig.theme) == null ? void 0 : _a.extend,
        keyframes: {
          ...(_c = (_b = existingConfig.theme) == null ? void 0 : _b.extend) == null ? void 0 : _c.keyframes,
          ...config2.keyframes
        },
        animation: {
          ...(_e = (_d = existingConfig.theme) == null ? void 0 : _d.extend) == null ? void 0 : _e.animation,
          ...config2.animation
        }
      }
    }
  };
  const configContent = `module.exports = ${JSON.stringify(existingConfig, null, 2)}`;
  await fs2.writeFile(configPath, configContent);
}

// src/utils/components.ts
var REGISTRY_BASE_URL = "https://raw.githubusercontent.com/lakinmindfire/animate-ui/feature/tailwind-merge-config/packages/registry";
async function getComponent(name) {
  try {
    console.log(`Fetching registry from: ${REGISTRY_BASE_URL}/registry.json`);
    const response = await axios.get(`${REGISTRY_BASE_URL}/registry.json`);
    const registry = response.data;
    if (!registry || !registry.components) {
      throw new Error("Invalid registry format: Missing components object");
    }
    const componentInfo = registry.components[name.toLowerCase()];
    if (!componentInfo) {
      throw new Error(`Component "${name}" not found in registry`);
    }
    console.log(`Fetching files for component: ${name}`);
    const files = await Promise.all(
      Object.entries(componentInfo.files).map(async ([key, fileInfo2]) => {
        try {
          const fileUrl = `${REGISTRY_BASE_URL}/${fileInfo2.path}`;
          console.log(`Fetching file: ${fileUrl}`);
          const { data: content } = await axios.get(fileUrl);
          return [key, { ...fileInfo2, content }];
        } catch (error) {
          console.error(`Error fetching file ${fileInfo2.path}:`, error);
          throw new Error(`Failed to fetch file: ${fileInfo2.path}`);
        }
      })
    );
    return {
      ...componentInfo,
      files: Object.fromEntries(files)
    };
  } catch (error) {
    console.error(`Error fetching component ${name}:`, error);
    return null;
  }
}
async function installComponent(component, projectRoot = process.cwd()) {
  const componentsDir = path3.join(projectRoot, "src/components/ui");
  await fs3.ensureDir(componentsDir);
  const componentDir = path3.join(componentsDir, component.name.toLowerCase());
  await fs3.ensureDir(componentDir);
  for (const [_, fileInfo] of Object.entries(component.files)) {
    const filePath = path3.join(componentDir, path3.basename(fileInfo.path));
    if (!fileInfo.content) {
      throw new Error(`Missing content for file: ${fileInfo.path}`);
    }
    await fs3.writeFile(filePath, fileInfo.content);
    console.log(`Written file: ${filePath}`);
    if (fileInfo.type === "config" && fileInfo.content) {
      try {
        const config = eval(`(${fileInfo.content})`);
        if (config.tailwind) {
          await mergeTailwindConfig(config.tailwind, projectRoot);
          console.log("Updated Tailwind configuration");
        }
      } catch (error) {
        console.error("Error processing config file:", error);
        throw error;
      }
    }
  }
  const indexPath = path3.join(componentsDir, "index.ts");
  const indexContent = await fs3.pathExists(indexPath) ? await fs3.readFile(indexPath, "utf-8") : "";
  const exportStatement = `export * from './${component.name.toLowerCase()}';
`;
  if (!indexContent.includes(exportStatement)) {
    await fs3.appendFile(indexPath, exportStatement);
    console.log("Updated component index file");
  }
}
async function getAvailableComponents() {
  try {
    console.log("Fetching available components...");
    const { data: registry } = await axios.get(`${REGISTRY_BASE_URL}/registry.json`);
    if (!registry || !registry.components) {
      throw new Error("Invalid registry format: Missing components object");
    }
    return Object.values(registry.components);
  } catch (error) {
    console.error("Error loading components from registry:", error);
    return [];
  }
}

// src/commands/add.ts
import path4 from "path";
import fs4 from "fs-extra";
async function add(componentName) {
  var _a;
  let spinner;
  try {
    if (!componentName) {
      const components = await getAvailableComponents();
      if (!components.length) {
        console.log(chalk2.red("\nNo components found in registry"));
        process.exit(1);
      }
      const response = await prompts({
        type: "select",
        name: "component",
        message: "Select a component to add",
        choices: components.map((c) => ({
          title: c.name,
          value: c.name.toLowerCase(),
          // Ensure lowercase for consistency
          description: c.description
        }))
      });
      componentName = response.component;
    }
    if (!componentName) {
      console.log(chalk2.red("\nNo component selected"));
      process.exit(1);
    }
    componentName = componentName.toLowerCase();
    spinner = ora2(`Fetching ${componentName} component...`).start();
    const component2 = await getComponent(componentName);
    if (!component2) {
      spinner.fail(chalk2.red(`Component "${componentName}" not found`));
      const components = await getAvailableComponents();
      if (components.length > 0) {
        console.log("\nAvailable components:");
        components.forEach((c) => {
          console.log(chalk2.cyan(`- ${c.name}: ${c.description}`));
        });
      }
      process.exit(1);
    }
    spinner.text = `Installing ${component2.name} component...`;
    const projectRoot2 = process.cwd();
    const srcDir = path4.join(projectRoot2, "src");
    if (!await fs4.pathExists(srcDir)) {
      spinner.fail(chalk2.red("Project structure not found. Make sure you're in the correct directory."));
      process.exit(1);
    }
    if ((_a = component2.dependencies) == null ? void 0 : _a.length) {
      spinner.text = `Installing dependencies for ${component2.name}...`;
      try {
        await addDependencies({
          dependencies: component2.dependencies
        });
      } catch (error) {
        spinner.fail(chalk2.red("Failed to install dependencies"));
        console.error(error);
        process.exit(1);
      }
    }
    spinner.text = `Installing ${component2.name} component files...`;
    try {
      await installComponent(component2);
    } catch (error) {
      spinner.fail(chalk2.red(`Failed to install ${component2.name} component files`));
      console.error(error);
      process.exit(1);
    }
    spinner.succeed(chalk2.green(`Successfully added ${component2.name} component`));
    console.log("\nYou can now import the component from:");
    console.log(
      chalk2.cyan(
        `import { ${component2.name} } from "@/components/ui/${component2.name.toLowerCase()}"`
      )
    );
    if (Object.keys(component2.files).length > 1) {
      console.log("\nThis component includes multiple files:");
      Object.entries(component2.files).forEach(([key, file]) => {
        console.log(chalk2.cyan(`- ${file.path}`));
      });
    }
  } catch (error) {
    if (spinner) {
      spinner.fail(chalk2.red("Failed to add component"));
    }
    console.error("\nError details:", error);
    process.exit(1);
  }
}

// src/index.ts
var program = new Command();
program.name("animation-ui").description("CLI for adding animation-ui components").version("0.1.0");
program.command("init").description("Initialize animations in your project").option("-y, --yes", "Skip confirmation prompt").action(async (options) => {
  await init(options);
});
program.command("add").description("Add a animation component to your project").argument("[component]", "The component to add").action(async (component2) => {
  await add(component2);
});
program.parse();
