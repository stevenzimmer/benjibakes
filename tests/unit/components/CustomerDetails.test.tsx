import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CustomerDetails from "@/components/CustomerDetails";
import { useCartStore } from "@/store";
import { mockToast } from "../mocks/toast";
import { renderWithThemeAndProbe, resetCartStore } from "../test-utils";

describe("CustomerDetails", () => {
  beforeEach(() => {
    resetCartStore();
  });

  it("stores the fetched customer and advances to the pickup step", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        customer: {
          email: "benji@example.com",
          id: "cus_123",
          name: "Benji Bakes",
        },
        isNewCustomer: true,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithThemeAndProbe(<CustomerDetails />);

    fireEvent.change(screen.getByLabelText(/First and last name/i), {
      target: { value: "Benji Bakes" },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "benji@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Set order details/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(useCartStore.getState().customerId).toBe("cus_123");
    expect(useCartStore.getState().email).toBe("benji@example.com");
    expect(screen.getByTestId("checkout-state").textContent).toBe(
      "orderDetails",
    );
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Welcome, Benji Bakes!",
      }),
    );
  });

  it("shows an error and does not advance when the customer lookup fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        error: "Customer lookup failed",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithThemeAndProbe(<CustomerDetails />);

    fireEvent.change(screen.getByLabelText(/First and last name/i), {
      target: { value: "Benji Bakes" },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "benji@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Set order details/i }));

    await waitFor(() => {
      expect(screen.getAllByText("Customer lookup failed")).toHaveLength(2);
    });

    expect(useCartStore.getState().customerId).toBe("");
    expect(screen.getByTestId("checkout-state").textContent).toBe("cart");
  });
});
