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
import path2 from "path";
import fs2 from "fs-extra";

// src/utils/components.ts
import axios from "axios";
async function getAvailableComponents() {
  try {
    const registryUrl = "https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry/registry.json";
    const { data: registry } = await axios.get(registryUrl);
    const components = await Promise.all(
      Object.entries(registry.components).map(async ([name, componentInfo]) => {
        const componentUrl = `https://raw.githubusercontent.com/lakinmindfire/animate-ui/dev/packages/registry/components/${name}/index.tsx`;
        const { data: content } = await axios.get(componentUrl);
        return {
          name,
          content,
          dependencies: componentInfo.dependencies
        };
      })
    );
    return components;
  } catch (error) {
    console.error("Error loading components from registry:", error);
    return [];
  }
}

// src/commands/add.ts
async function add(componentName) {
  var _a;
  try {
    const components = await getAvailableComponents();
    if (!componentName) {
      const response = await prompts({
        type: "select",
        name: "component",
        message: "Select a component to add",
        choices: components.map((c) => ({ title: c.name, value: c.name }))
      });
      componentName = response.component;
    }
    if (!componentName) {
      console.log(chalk2.red("\nNo component selected"));
      process.exit(1);
    }
    const component = components.find((c) => c.name === componentName);
    if (!component) {
      console.log(chalk2.red(`
Component "${componentName}" not found`));
      console.log(
        "Available components:",
        components.map((c) => c.name).join(", ")
      );
      process.exit(1);
    }
    const spinner = ora2(`Adding ${component.name} component...`).start();
    const componentDir = path2.resolve("src/components/ui");
    await fs2.ensureDir(componentDir);
    await fs2.writeFile(
      path2.join(componentDir, `${component.name}.tsx`),
      component.content
    );
    if ((_a = component.dependencies) == null ? void 0 : _a.length) {
      await addDependencies({
        dependencies: component.dependencies
      });
    }
    spinner.succeed(chalk2.green(`Added ${component.name} component`));
    console.log("\nYou can now import the component from:");
    console.log(
      chalk2.cyan(
        `import { ${component.name} } from "@/components/ui/${component.name}"`
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
program.command("add").description("Add a animation component to your project").argument("[component]", "The component to add").action(async (component) => {
  await add(component);
});
program.parse();
