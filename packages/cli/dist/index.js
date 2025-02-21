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
var REGISTRY_BASE_URL = "https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry";
async function getComponent(name) {
  try {
    const { data: registry } = await axios.get(`${REGISTRY_BASE_URL}/registry.json`);
    const componentInfo = registry.components[name];
    if (!componentInfo) {
      throw new Error(`Component ${name} not found in registry`);
    }
    const files = await Promise.all(
      Object.entries(componentInfo.files).map(async ([key, fileInfo2]) => {
        const fileUrl = `${REGISTRY_BASE_URL}/${fileInfo2.path}`;
        const { data: content } = await axios.get(fileUrl);
        return [key, { ...fileInfo2, content }];
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
    if (fileInfo.content !== void 0) {
      await fs3.writeFile(filePath, fileInfo.content);
    } else {
      console.warn(`File content for ${filePath} is undefined.`);
    }
    if (fileInfo.type === "config" && fileInfo.content) {
      const config = eval(`(${fileInfo.content})`);
      if (config.tailwind) {
        await mergeTailwindConfig(config.tailwind, projectRoot);
      }
    }
  }
  const indexPath = path3.join(componentsDir, "index.ts");
  const indexContent = await fs3.pathExists(indexPath) ? await fs3.readFile(indexPath, "utf-8") : "";
  const exportStatement = `export * from './${component.name.toLowerCase()}';
`;
  if (!indexContent.includes(exportStatement)) {
    await fs3.appendFile(indexPath, exportStatement);
  }
}
async function getAvailableComponents() {
  try {
    const { data: registry } = await axios.get(`${REGISTRY_BASE_URL}/registry.json`);
    return Object.values(registry.components);
  } catch (error) {
    console.error("Error loading components from registry:", error);
    return [];
  }
}

// src/commands/add.ts
async function add(componentName) {
  var _a;
  try {
    if (!componentName) {
      const components = await getAvailableComponents();
      const response = await prompts({
        type: "select",
        name: "component",
        message: "Select a component to add",
        choices: components.map((c) => ({
          title: c.name,
          value: c.name,
          description: c.description
        }))
      });
      componentName = response.component;
    }
    if (!componentName) {
      console.log(chalk2.red("\nNo component selected"));
      process.exit(1);
    }
    const spinner = ora2(`Fetching ${componentName} component...`).start();
    const component2 = await getComponent(componentName);
    if (!component2) {
      spinner.fail(chalk2.red(`Component "${componentName}" not found`));
      const components = await getAvailableComponents();
      console.log(
        "Available components:",
        components.map((c) => c.name).join(", ")
      );
      process.exit(1);
    }
    spinner.text = `Installing ${component2.name} component...`;
    if ((_a = component2.dependencies) == null ? void 0 : _a.length) {
      await addDependencies({
        dependencies: component2.dependencies
      });
    }
    await installComponent(component2);
    spinner.succeed(chalk2.green(`Added ${component2.name} component`));
    console.log("\nYou can now import the component from:");
    console.log(
      chalk2.cyan(
        `import { ${component2.name} } from "@/components/ui/${component2.name.toLowerCase()}"`
      )
    );
  } catch (error) {
    console.error(chalk2.red("Failed to add component:"), error);
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
