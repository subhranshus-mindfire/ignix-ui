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
      execSync(`bun add ${options.dependencies.join(" ")}`, { stdio: "inherit" });
    } else {
      execSync(`${pkgManager} add ${options.dependencies.join(" ")}`, { stdio: "inherit" });
    }
  }
  if ((_b = options.devDependencies) == null ? void 0 : _b.length) {
    if (pkgManager === "bun") {
      execSync(`bun add --dev ${options.devDependencies.join(" ")}`, { stdio: "inherit" });
    } else {
      execSync(`${pkgManager} add -D ${options.devDependencies.join(" ")}`, { stdio: "inherit" });
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
      dependencies: [
        "framer-motion",
        "clsx",
        "tailwind-merge"
      ],
      devDependencies: [
        "tailwindcss",
        "autoprefixer",
        "postcss"
      ],
      packageManager: pkgManager
    });
    spinner.succeed(chalk.green("Successfully initialized animation-ui"));
    console.log("\nNext steps:");
    console.log("1. Add components using:", chalk.cyan("npx animation-ui add <component>"));
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
async function getAvailableComponents() {
  return [
    {
      name: "slide",
      content: `import { motion } from 'framer-motion';
  import { cn } from '@/utils/cn';
  
  interface SlideProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    className?: string;
  }
  
  export const Slide = ({
    children,
    direction = 'up',
    duration = 0.4,
    className
  }: SlideProps) => {
    const slideVariants = {
      initial: {
        opacity: 0,
        x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
        y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0
      },
      exit: {
        opacity: 0,
        x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
        y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0
      }
    };
  
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        transition={{ duration }}
        className={cn('', className)}
      >
        {children}
      </motion.div>
    );
  };`,
      dependencies: ["framer-motion"]
    },
    {
      name: "fade",
      content: `import { motion } from 'framer-motion';
  import { cn } from '@/utils/cn';
  
  interface FadeProps {
    children: React.ReactNode;
    duration?: number;
    className?: string;
  }
  
  export const Fade = ({
    children,
    duration = 0.4,
    className
  }: FadeProps) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
        className={cn('', className)}
      >
        {children}
      </motion.div>
    );
  };`,
      dependencies: ["framer-motion"]
    }
  ];
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
      console.log("Available components:", components.map((c) => c.name).join(", "));
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
    console.log(chalk2.cyan(`import { ${component.name} } from "@/components/ui/${component.name}"`));
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
