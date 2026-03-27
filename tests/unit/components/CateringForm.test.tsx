import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CateringForm from "@/components/Catering/Form";
import { mockToast } from "../mocks/toast";
import { renderWithTheme } from "../test-utils";

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
  Calendar: ({ onSelect }: { onSelect: (date: Date) => void }) => (
    <button onClick={() => onSelect(new Date("2026-04-15T12:00:00Z"))}>
      Pick event date
    </button>
  ),
}));

describe("CateringForm", () => {
  it("shows validation errors when required fields are missing", async () => {
    renderWithTheme(<CateringForm />);

    fireEvent.click(
      screen.getByRole("button", { name: /Submit catering request/i }),
    );

    expect(
      await screen.findByText("Please provide your first and last name."),
    ).toBeTruthy();
    expect(
      screen.getByText("Please provide a valid email address."),
    ).toBeTruthy();
    expect(screen.getByText("A date for the event is required.")).toBeTruthy();
    expect(
      screen.getByText(
        "Please provide a little bit more details about your catering needs.",
      ),
    ).toBeTruthy();
  });

  it("submits successfully and shows the thank-you state", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithTheme(<CateringForm />);

    fireEvent.change(screen.getByLabelText(/Your name/i), {
      target: { value: "Benji Bakes" },
    });
    fireEvent.change(screen.getByLabelText(/Your email address/i), {
      target: { value: "benji@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Catering details/i), {
      target: {
        value: "We need individually wrapped cookies for a client event.",
      },
    });
    fireEvent.click(screen.getByText("Pick event date"));

    fireEvent.click(
      screen.getByRole("button", { name: /Submit catering request/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Thank you for considering us for your event!/i),
      ).toBeTruthy();
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Success",
      }),
    );
  });

  it("restores the submit state and shows an error toast when the request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        error: "Unable to send catering request",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithTheme(<CateringForm />);

    fireEvent.change(screen.getByLabelText(/Your name/i), {
      target: { value: "Benji Bakes" },
    });
    fireEvent.change(screen.getByLabelText(/Your email address/i), {
      target: { value: "benji@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Catering details/i), {
      target: {
        value: "We need individually wrapped cookies for a client event.",
      },
    });
    fireEvent.click(screen.getByText("Pick event date"));

    fireEvent.click(
      screen.getByRole("button", { name: /Submit catering request/i }),
    );

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
        }),
      );
    });

    expect(
      screen.queryByText(/Thank you for considering us for your event!/i),
    ).toBeNull();
    expect(
      screen.getByRole("button", { name: /Submit catering request/i }),
    ).toBeTruthy();
  });
});
