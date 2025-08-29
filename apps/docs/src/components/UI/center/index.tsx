import React from "react";
import clsx from "clsx";

interface CenterProps {
  children: React.ReactNode;
  horizontal?: boolean;
  vertical?: boolean;
  variant?: "flex" | "grid" | "absolute";
  minHeight?: "auto" | "xs" | "small" | "medium" | "large" | "xl" | "screen" | string | number;
  className?: string;
}

const Center: React.FC<CenterProps> = ({
  children,
  horizontal = false,
  vertical = false,
  variant = "flex",
  minHeight = "auto",
  className = "",
}) => {
  const minHeightClasses: Record<string, string> = {
    auto: "",
    xs: "min-h-[100px]",
    small: "min-h-[200px]",
    medium: "min-h-[300px]",
    large: "min-h-[400px]",
    xl: "min-h-[500px]",
    screen: "min-h-screen",
  };

  const resolvedStyle: React.CSSProperties =
    typeof minHeight === "string" && minHeight in minHeightClasses
      ? {}
      : { minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight };

  const variantClasses: Record<string, string> = {
    flex: clsx("flex", {
      "justify-center": horizontal,
      "items-center": vertical,
    }),
    grid: clsx("grid", {
      "place-items-center": horizontal && vertical,
      "justify-center": horizontal && !vertical,
      "items-center": vertical && !horizontal,
    }),
    absolute: clsx("absolute inset-0 flex", {
      "justify-center": horizontal,
      "items-center": vertical,
    }),
  };

  return (
    <div
      className={clsx(
        variantClasses[variant],
        typeof minHeight === "string" ? minHeightClasses[minHeight] ?? "" : "",
        className
      )}
      style={resolvedStyle}
    >
      {children}
    </div>
  );
};

export default Center;
