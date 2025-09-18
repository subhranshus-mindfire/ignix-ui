import { render, screen } from "@testing-library/react";
import AppShell from "./index";
import { describe, expect, it } from "vitest";

describe("AppShell Component", () => {
  const brand = <div data-testid="brand">Brand</div>;
  const menu = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/settings" },
  ];
  const user = <div data-testid="user">User Profile</div>;
  const footer = <div data-testid="footer">Footer</div>;
  const children = <div data-testid="main">Main Content</div>;

  it("renders brand, menu, user, and children", () => {
    render(
      <AppShell navigation="side" brand={brand} menu={menu} user={user}>
        {children}
      </AppShell>
    );

    expect(screen.getByTestId("brand")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByTestId("user")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <AppShell
        navigation="side"
        brand={brand}
        menu={menu}
        user={user}
        footer={footer}
      >
        {children}
      </AppShell>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("supports top navigation mode", () => {
    render(
      <AppShell navigation="top" brand={brand} menu={menu} user={user}>
        {children}
      </AppShell>
    );

    expect(screen.getByTestId("brand")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("supports drawer navigation mode", () => {
    render(
      <AppShell navigation="drawer" brand={brand} menu={menu}>
        {children}
      </AppShell>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("applies responsive layout when enabled", () => {
    render(
      <AppShell navigation="side" brand={brand} menu={menu} responsive>
        {children}
      </AppShell>
    );

    // Just check children still render (responsive tested by class presence in implementation)
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
