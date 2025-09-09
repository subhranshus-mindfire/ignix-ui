import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { Pin } from "./index";

// Mock Radix Slot so it renders a <span> that accepts className + props
vi.mock("@radix-ui/react-slot", () => ({
  Slot: ({ children, className, ...props }: any) => (
    <span className={className} {...props}>
      {children}
    </span>
  ),
}));

describe("Pin", () => {
  it("renders children correctly", () => {
    render(<Pin as="div">Child content</Pin>);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies default classes (top-right, normal offset, normal zIndex)", () => {
    render(<Pin>default</Pin>);
    const el = screen.getByText("default").closest("span");
    expect(el).toHaveClass("absolute", "top-0", "right-0", "m-2", "z-20");
  });

  it("applies correct position classes", () => {
    const { rerender } = render(<Pin to="bottom-left">pos</Pin>);
    let el = screen.getByText("pos").closest("span");
    expect(el).toHaveClass("bottom-0", "left-0");

    rerender(<Pin to="bottom-right">pos</Pin>);
    el = screen.getByText("pos").closest("span");
    expect(el).toHaveClass("bottom-0", "right-0");

    rerender(<Pin to="top-left">pos</Pin>);
    el = screen.getByText("pos").closest("span");
    expect(el).toHaveClass("top-0", "left-0");
  });

  it("applies correct offset classes", () => {
    const { rerender } = render(<Pin offset="none">offset</Pin>);
    let el = screen.getByText("offset").closest("span");
    expect(el).toHaveClass("m-0");

    rerender(<Pin offset="small">offset</Pin>);
    el = screen.getByText("offset").closest("span");
    expect(el).toHaveClass("m-1");

    rerender(<Pin offset="large">offset</Pin>);
    el = screen.getByText("offset").closest("span");
    expect(el).toHaveClass("m-4");

    rerender(<Pin offset="xl">offset</Pin>);
    el = screen.getByText("offset").closest("span");
    expect(el).toHaveClass("m-6");
  });

  it("applies z-index correctly from presets", () => {
    const { rerender } = render(<Pin zIndex="low">z</Pin>);
    let el = screen.getByText("z").closest("span");
    expect(el).toHaveClass("z-10");

    rerender(<Pin zIndex="high">z</Pin>);
    el = screen.getByText("z").closest("span");
    expect(el).toHaveClass("z-50");
  });

  it("applies custom numeric z-index", () => {
    render(<Pin zIndex={99}>z</Pin>);
    const el = screen.getByText("z").closest("span");
    expect(el).toHaveClass("z-[99]");
  });

  it("applies mobile overrides", () => {
    const { rerender } = render(<Pin mobile="relative">mobile</Pin>);
    let el = screen.getByText("mobile").closest("span");
    expect(el).toHaveClass("sm:relative", "sm:static");

    rerender(<Pin mobile="absolute">mobile</Pin>);
    el = screen.getByText("mobile").closest("span");
    expect(el).toHaveClass("sm:absolute");
  });

  it("accepts custom className and extra props", () => {
    render(
      <Pin data-testid="pin" className="custom-class">
        custom
      </Pin>
    );
    const el = screen.getByTestId("pin");
    expect(el).toHaveClass("custom-class");
  });

  it("respects custom 'as' prop", () => {
    render(
      <Pin as="section" data-testid="pin">
        custom element
      </Pin>
    );
    const el = screen.getByTestId("pin");
    expect(el.tagName.toLowerCase()).toBe("section");
  });
});
