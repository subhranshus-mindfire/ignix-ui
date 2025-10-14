import React, { ReactNode, useEffect, useState } from "react";

type ResponsiveProps = {
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  fallback?: ReactNode;
};

// Define your breakpoints (can be customized/project-wide)
const breakpoints = {
  mobile: "(max-width: 639px)",
  tablet: "(min-width: 640px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
};

const useBreakpoint = () => {
  const [current, setCurrent] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia(breakpoints.mobile);
    const tabletQuery = window.matchMedia(breakpoints.tablet);
    const desktopQuery = window.matchMedia(breakpoints.desktop);

    const updateBreakpoint = () => {
      if (mobileQuery.matches) setCurrent("mobile");
      else if (tabletQuery.matches) setCurrent("tablet");
      else if (desktopQuery.matches) setCurrent("desktop");
    };

    updateBreakpoint();

    mobileQuery.addEventListener("change", updateBreakpoint);
    tabletQuery.addEventListener("change", updateBreakpoint);
    desktopQuery.addEventListener("change", updateBreakpoint);

    return () => {
      mobileQuery.removeEventListener("change", updateBreakpoint);
      tabletQuery.removeEventListener("change", updateBreakpoint);
      desktopQuery.removeEventListener("change", updateBreakpoint);
    };
  }, []);

  return current;
};

const Responsive: React.FC<ResponsiveProps> = ({
  mobile,
  tablet,
  desktop,
  fallback,
}) => {
  const current = useBreakpoint();

  if (current === "mobile" && mobile) return <>{mobile}</>;
  if (current === "tablet" && tablet) return <>{tablet}</>;
  if (current === "desktop" && desktop) return <>{desktop}</>;

  return <>{fallback || null}</>;
};

export default Responsive;
