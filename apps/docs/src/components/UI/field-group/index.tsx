import React, { ReactNode } from "react";
import clsx from "clsx";

export type FieldGroupProps = {
  title?: string;
  columns?: "auto" | number;
  spacing?: "none" | "small" | "normal" | "large" | number; 
  border?: boolean;
  children: ReactNode;
  className?: string;
};

const spacingMap: Record<string, string> = {
  none: "gap-0",
  small: "gap-2",
  normal: "gap-4",
  large: "gap-6",
};

const FieldGroup: React.FC<FieldGroupProps> = ({
  title,
  columns = "auto",
  spacing = "normal",
  border = true,
  children,
  className,
}) => {
  const gapStyle =
    typeof spacing === "number"
      ? { gap: `${spacing}px` }
      : undefined;

  return (
    <fieldset
      className={clsx(
        "p-4 rounded-md",
        border ? "border border-gray-300 dark:border-gray-600" : "border-0",
        className
      )}
    >
      {title && (
        <legend className="px-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          {title}
        </legend>
      )}

      <div
        className={clsx(
          "grid",
          columns === "auto"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : `grid-cols-${columns}`,
          typeof spacing === "string" ? spacingMap[spacing] : undefined
        )}
        style={gapStyle}
      >
        {children}
      </div>
    </fieldset>
  );
};

export default FieldGroup;
