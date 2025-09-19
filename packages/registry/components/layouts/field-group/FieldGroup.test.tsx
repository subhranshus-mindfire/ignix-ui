import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import FieldGroup from "./index";

describe("FieldGroup", () => {
  it("renders children", () => {
    render(
      <FieldGroup>
        <div data-testid="child">Child</div>
      </FieldGroup>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <FieldGroup className="custom-class">
        <span>Test</span>
      </FieldGroup>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  describe("title", () => {
    it("renders legend when title is provided", () => {
      render(<FieldGroup title="Personal Info">Content</FieldGroup>);
      expect(screen.getByText("Personal Info")).toBeInTheDocument();
      expect(screen.getByText("Personal Info").tagName).toBe("LEGEND");
    });

    it("does not render legend when title is not provided", () => {
      const { container } = render(<FieldGroup>Content</FieldGroup>);
      expect(container.querySelector("legend")).toBeNull();
    });
  });

  describe("border", () => {
    it("renders with border by default", () => {
      const { container } = render(<FieldGroup>Content</FieldGroup>);
      expect(container.firstChild).toHaveClass("border");
    });

    it("does not render border when border={false}", () => {
      const { container } = render(
        <FieldGroup border={false}>Content</FieldGroup>
      );
      expect(container.firstChild).toHaveClass("border-0");
    });
  });

  describe("spacing", () => {
    it.each([
      ["none", "gap-0"],
      ["small", "gap-2"],
      ["normal", "gap-4"],
      ["large", "gap-6"],
    ])("applies spacing class for %s", (spacing, expectedClass) => {
      const { container } = render(
        <FieldGroup spacing={spacing as any}>Content</FieldGroup>
      );
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass(expectedClass);
    });

    it("applies inline style when spacing is a number", () => {
      const { container } = render(
        <FieldGroup spacing={12}>Content</FieldGroup>
      );
      const grid = container.querySelector(".grid") as HTMLElement;
      expect(grid.style.gap).toBe("12px");
    });
  });

  describe("columns", () => {
    it("uses responsive grid classes when columns=auto (default)", () => {
      const { container } = render(<FieldGroup>Content</FieldGroup>);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass("grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3");
    });

    it("applies grid-cols-{n} when columns is a number", () => {
      const { container } = render(<FieldGroup columns={4}>Content</FieldGroup>);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass("grid-cols-4");
    });
  });

  describe("accessibility", () => {
    it("renders a fieldset element", () => {
      const { container } = render(<FieldGroup>Content</FieldGroup>);
      expect(container.querySelector("fieldset")).toBeInTheDocument();
    });

    it("renders legend element if title is provided", () => {
      const { container } = render(<FieldGroup title="Info">Content</FieldGroup>);
      expect(container.querySelector("legend")).toBeInTheDocument();
    });
  });
});
