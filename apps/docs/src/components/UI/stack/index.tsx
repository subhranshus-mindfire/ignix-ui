import React from "react";
import clsx from "clsx";

type StackDirection = "vertical" | "horizontal" | "responsive";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between" | "around";
type StackSpacing = "none" | "xs" | "sm" | "normal" | "lg" | "xl" | string;

interface ResponsiveProp {
  mobile?: StackDirection;
  tablet?: StackDirection;
  desktop?: StackDirection;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  spacing?: StackSpacing;
  wrap?: boolean;
  responsive?: ResponsiveProp;
  children: React.ReactNode;
  className?: string;
}

const directionMap = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const spacingMap = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  normal: "gap-4",
  lg: "gap-8",
  xl: "gap-12",
};

export const Stack: React.FC<StackProps> = ({
  direction = "vertical",
  align = "stretch",
  justify = "start",
  spacing = "normal",
  wrap = false,
  responsive,
  className,
  children,
  ...rest
}) => {
  // Responsive direction classes
  const responsiveClasses: string[] = [];
  if (responsive) {
    if (responsive.mobile)
      responsiveClasses.push(directionMap[responsive.mobile] || "");
    if (responsive.tablet)
      responsiveClasses.push(`sm:${directionMap[responsive.tablet] || ""}`);
    if (responsive.desktop)
      responsiveClasses.push(`md:${directionMap[responsive.desktop] || ""}`);
  }

  return (
    <div
      className={clsx(
        "flex",
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        spacingMap[spacing] || spacing,
        wrap && "flex-wrap",
        ...responsiveClasses,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
