import { render, screen } from "@testing-library/react";
import React from "react";
import Center from "./index";
import { describe, it, expect } from "vitest";

describe("Center component", () => {
  it("renders children correctly", () => {
    render(
      <Center>
        <span>Child Element</span>
      </Center>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });

  it("applies flex centering by default", () => {
    const { container } = render(<Center>Content</Center>);
    expect(container.firstChild).toHaveClass("flex");
  });

  it("applies grid centering when variant='grid'", () => {
    const { container } = render(<Center variant="grid">Content</Center>);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("applies absolute positioning when variant='absolute'", () => {
    const { container } = render(<Center variant="absolute">Content</Center>);
    expect(container.firstChild).toHaveClass("absolute", "inset-0", "flex");
  });

  it("applies horizontal and vertical alignment correctly in flex mode", () => {
    const { container } = render(
      <Center horizontal vertical>
        Content
      </Center>
    );
    expect(container.firstChild).toHaveClass("justify-center");
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("applies correct minHeight class when using string values", () => {
    const { container } = render(<Center minHeight="medium">Content</Center>);
    expect(container.firstChild).toHaveClass("min-h-[600px]");
  });

  it("applies inline style when minHeight is a number", () => {
    const { container } = render(<Center minHeight={300}>Content</Center>);
    expect(container.firstChild).toHaveStyle("min-height: 300px");
  });

  it("applies custom className properly", () => {
    const { container } = render(
      <Center className="bg-red-500">Content</Center>
    );
    expect(container.firstChild).toHaveClass("bg-red-500");
  });
});
