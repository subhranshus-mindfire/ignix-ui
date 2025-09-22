import { render, screen } from "@testing-library/react";
import Masonry from "./index";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
    },
  };
});

describe("Masonry Component", () => {
  const items = Array.from({ length: 6 }, (_, i) => (
    <div key={i} data-testid="child">
      Item {i + 1}
    </div>
  ));

  it("renders children in balanced mode by default", () => {
    render(<Masonry>{items}</Masonry>);
    const container = screen.getByTestId("masonry-root");
    expect(screen.getAllByTestId("child").length).toBe(6);
    expect(container.querySelectorAll(".flex-col").length).toBeGreaterThan(1);
  });

  it("renders children in non-balanced (CSS masonry) mode", () => {
    render(<Masonry balanced={false}>{items}</Masonry>);
    const container = screen.getByTestId("masonry-root");
    expect(screen.getAllByTestId("child").length).toBe(6);
    expect(container).toHaveClass("masonry");
  });

  it("applies custom gap values", () => {
    render(<Masonry gap="large">{items}</Masonry>);
    const container = screen.getByTestId("masonry-root");
    expect(container).toHaveStyle({ gap: "2rem" });
  });

  it("applies string gap directly", () => {
    render(<Masonry gap="10px">{items}</Masonry>);
    const container = screen.getByTestId("masonry-root");
    expect(container).toHaveStyle({ gap: "10px" });
  });

  it("renders children with fade-in animation", () => {
    render(<Masonry animation="fade-in">{items}</Masonry>);
    expect(screen.getAllByTestId("child").length).toBe(6);
  });

  it("renders children with scale-in animation", () => {
    render(<Masonry animation="scale-in">{items}</Masonry>);
    expect(screen.getAllByTestId("child").length).toBe(6);
  });

  it("renders children with slide-up animation", () => {
    render(<Masonry animation="slide-up">{items}</Masonry>);
    expect(screen.getAllByTestId("child").length).toBe(6);
  });
});
