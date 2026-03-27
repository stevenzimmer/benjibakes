import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import OrderDetails from "@/components/OrderDetails";
import { renderWithThemeAndProbe, resetCartStore } from "../test-utils";

vi.mock("@/components/ui/popover", () => ({
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("@/components/ui/calendar", () => ({
  Calendar: ({
    disabled,
    onSelect,
  }: {
    disabled: (date: Date) => boolean;
    onSelect: (date: Date) => void;
  }) => (
    <div>
      <div data-testid="yesterday-disabled">
        {String(disabled(new Date("2026-03-02T12:00:00Z")))}
      </div>
      <button onClick={() => onSelect(new Date("2026-03-04T12:00:00Z"))}>
        Pick valid pickup date
      </button>
    </div>
  ),
}));

describe("OrderDetails", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-03T12:00:00Z"));
    resetCartStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("marks past dates as disabled and advances after selecting a valid pickup date", () => {
    renderWithThemeAndProbe(<OrderDetails />);

    expect(screen.getByTestId("yesterday-disabled").textContent).toBe("true");

    fireEvent.click(screen.getByText("Pick valid pickup date"));

    expect(screen.getByText(/Selected pickup date/i)).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: /Review and send order/i }),
    );

    expect(screen.getByTestId("checkout-state").textContent).toBe(
      "confirmOrder",
    );
  });
});
