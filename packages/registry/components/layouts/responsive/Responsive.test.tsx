import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Responsive from "./index";

// Utility to mock matchMedia with dynamic control
const mockMatchMedia = (matchesMap: Record<string, boolean>) => {
  vi.stubGlobal("matchMedia", (query: string) => {
    return {
      matches: matchesMap[query] ?? false,
      media: query,
      onchange: null,
      addEventListener: (_: string, listener: () => void) => {
        // keep listener for manual triggering
        (listener as any).__query = query;
        mockMatchMedia.listeners.push(listener as any);
      },
      removeEventListener: (_: string, listener: () => void) => {
        mockMatchMedia.listeners = mockMatchMedia.listeners.filter(
          (l: any) => l !== listener
        );
      },
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;
  });
};
mockMatchMedia.listeners = [] as ((ev?: MediaQueryListEvent) => void)[];

describe("<Responsive />", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia.listeners = [];
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockMatchMedia.listeners = [];
  });

  describe("basic rendering", () => {
    it("renders mobile layout when mobile breakpoint matches", () => {
      mockMatchMedia({
        "(max-width: 639px)": true,
      });

      render(
        <Responsive
          mobile={<div>Mobile</div>}
          tablet={<div>Tablet</div>}
          desktop={<div>Desktop</div>}
        />
      );

      expect(screen.getByText("Mobile")).toBeInTheDocument();
    });

    it("renders tablet layout when tablet breakpoint matches", () => {
      mockMatchMedia({
        "(min-width: 640px) and (max-width: 1023px)": true,
      });

      render(
        <Responsive
          mobile={<div>Mobile</div>}
          tablet={<div>Tablet</div>}
          desktop={<div>Desktop</div>}
        />
      );

      expect(screen.getByText("Tablet")).toBeInTheDocument();
    });

    it("renders desktop layout when desktop breakpoint matches", () => {
      mockMatchMedia({
        "(min-width: 1024px)": true,
      });

      render(
        <Responsive
          mobile={<div>Mobile</div>}
          tablet={<div>Tablet</div>}
          desktop={<div>Desktop</div>}
        />
      );

      expect(screen.getByText("Desktop")).toBeInTheDocument();
    });

    it("renders fallback when no breakpoint matches", () => {
      mockMatchMedia({});

      render(
        <Responsive
          mobile={<div>Mobile</div>}
          fallback={<div>Fallback</div>}
        />
      );

      expect(screen.getByText("Fallback")).toBeInTheDocument();
    });

    it("renders nothing when no match and no fallback provided", () => {
      mockMatchMedia({});
      const { container } = render(<Responsive mobile={<div>Mobile</div>} />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("priority handling", () => {
    it("prefers mobile if multiple breakpoints match", () => {
      mockMatchMedia({
        "(max-width: 639px)": true,
        "(min-width: 640px) and (max-width: 1023px)": true,
        "(min-width: 1024px)": true,
      });

      render(
        <Responsive
          mobile={<div>Mobile</div>}
          tablet={<div>Tablet</div>}
          desktop={<div>Desktop</div>}
        />
      );

      expect(screen.getByText("Mobile")).toBeInTheDocument();
    });

    it("falls back to tablet if mobile not provided", () => {
      mockMatchMedia({
        "(min-width: 640px) and (max-width: 1023px)": true,
      });

      render(
        <Responsive
          tablet={<div>Tablet</div>}
          desktop={<div>Desktop</div>}
        />
      );

      expect(screen.getByText("Tablet")).toBeInTheDocument();
    });

    it("falls back to desktop if only desktop is defined", () => {
      mockMatchMedia({
        "(min-width: 1024px)": true, 
      });

      render(<Responsive desktop={<div>Desktop</div>} />);
      expect(screen.getByText("Desktop")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("renders a React fragment without extra wrappers", () => {
      mockMatchMedia({
        "(min-width: 1024px)": true,
      });

      const { container } = render(<Responsive desktop={<span>Desktop</span>} />);
      expect(container.querySelector("span")).toBeInTheDocument();
      expect(container.childNodes.length).toBe(1);
    });
  });
});
