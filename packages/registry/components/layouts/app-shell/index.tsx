import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";

/**
 * Sidebar Item type definition
 */
type SidebarItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: SidebarItem[];
};

/**
 * Props for the AppShell component
 */
export type AppShellProps = {
  navigation?: "top" | "side" | "bottom" | "drawer";
  brand?: ReactNode;
  menu?: SidebarItem[] | ReactNode;
  user?: ReactNode;
  footer?: ReactNode;
  responsive?: boolean;
  sidebarWidth?: "narrow" | "normal" | "wide";
  sidebar?: ReactNode;
  theme?:
    | "light"
    | "dark"
    | "corporate"
    | "custom"
    | "glass"
    | "modern"
    | "ocean"
    | "forest"
    | "solarized";
  className?: string;
  children: ReactNode;
};

/**
 * Sidebar width mapping
 */
const widthMap = {
  narrow: "w-16",
  normal: "w-64",
  wide: "w-80",
};

/**
 * AppShell Component
 */
const AppShell: React.FC<AppShellProps> = ({
  navigation = "top",
  brand,
  menu,
  user,
  footer,
  responsive = true,
  sidebarWidth = "normal",
  sidebar,
  theme = "modern",
  className,
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  /**
   * Close drawer on `Escape` key press
   */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /**
   * Get sidebar width classes
   */
  const getSidebarWidthClass = () => widthMap[sidebarWidth] || widthMap.normal;

  /**
   * Default Sidebar Menu Renderer
   */
  const renderMenu = (items: SidebarItem[]) => (
    <ul className="space-y-2 !pl-1">
      {items.map((item, i) => (
        <li key={i}>
          <a
            href={item.href || "#"}
            className={clsx(
              "flex items-center px-3 py-2 rounded-md transition-colors duration-150",
              {
                // Light theme
                "hover:bg-gray-200 !text-gray-800": theme === "light",
                // Corporate theme
                "hover:bg-gray-300 !text-gray-700": theme === "corporate",
                // Dark theme
                "hover:bg-gray-700 !text-gray-200": theme === "dark",
                // Glass theme
                "hover:bg-white/60 !text-gray-700": theme === "glass",
                // Modern theme
                "hover:bg-gray-700/80 !text-gray-200": theme === "modern",
                // Ocean theme
                "hover:bg-teal-600/80 !text-gray-200": theme === "ocean",
                // Forest theme
                "hover:bg-green-700/80 !text-gray-200": theme === "forest",
                // Solarized theme
                "hover:bg-[#e0dab5] !text-gray-700": theme === "solarized",
              }
            )}
          >
            {item.icon && <span>{item.icon}</span>}
            <span className="!hover:no-underline">{item.label}</span>
          </a>

          {/* Render children if present */}
          {item.children && (
            <ul className="ml-4 mt-1 space-y-1">{renderMenu(item.children)}</ul>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={clsx(
        "flex flex-col h-full",
        {
          // Light theme
          "bg-white text-gray-900": theme === "light",
          // Dark theme
          "bg-gray-900 text-white": theme === "dark",
          // Corporate theme
          "bg-gray-50 text-gray-800 border border-gray-200":
            theme === "corporate",
          // Glass theme
          "backdrop-blur-md bg-white/70 text-gray-900": theme === "glass",
          // Modern theme
          "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white":
            theme === "modern",
          // Ocean theme
          "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white":
            theme === "ocean",
          // Forest theme
          "bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 text-white":
            theme === "forest",
          // Solarized theme
          "bg-[#fdf6e3] text-[#657b83]": theme === "solarized",
        },
        className
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        {/* Mobile toggle for sidebar */}
        {responsive && navigation === "side" && (
          <button
            className="md:hidden p-2"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}

        <div className="flex items-center gap-4">
          {brand}

          {/* Top navigation menu */}
          {navigation === "top" && (
            <nav className="hidden md:flex gap-4">
              {Array.isArray(menu) ? renderMenu(menu) : menu}
            </nav>
          )}
        </div>

        {/* User slot */}
        {user}
      </header>

      {/* Layout Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop) */}
        {navigation === "side" && (
          <aside
            className={clsx(
              "hidden md:flex flex-col p-4",
              getSidebarWidthClass(),
              {
                // Sidebar-specific color variations
                "bg-gray-100 text-gray-900": theme === "light",
                "bg-gray-800 text-gray-100": theme === "dark",
                "bg-gray-100 border-r border-gray-200 text-gray-800":
                  theme === "corporate",
                "backdrop-blur-md bg-white/40 text-gray-900": theme === "glass",
                "bg-gradient-to-b from-gray-800 to-gray-900 text-white":
                  theme === "modern",
                "bg-gradient-to-b from-cyan-600 to-teal-700 text-white":
                  theme === "ocean",
                "bg-gradient-to-b from-emerald-700 to-green-800 text-white":
                  theme === "forest",
                "bg-[#eee8d5] text-[#586e75]": theme === "solarized",
              }
            )}
          >
            {sidebar
              ? sidebar
              : Array.isArray(menu)
              ? renderMenu(menu)
              : menu}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Bottom Navigation */}
      {navigation === "bottom" && (
        <footer className="flex justify-around border-t p-2 bg-inherit">
          {Array.isArray(menu) ? renderMenu(menu) : menu}
        </footer>
      )}

      {/* Footer Slot */}
      {footer && <div className="border-t p-4">{footer}</div>}
    </div>
  );
};

export default AppShell;
