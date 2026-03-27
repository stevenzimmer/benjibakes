import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ShoppingCart from "@/components/ShoppingCart";
import { renderWithThemeAndProbe, seedCartStore } from "../test-utils";

describe("ShoppingCart", () => {
  beforeEach(() => {
    seedCartStore({
      cart: [
        {
          cost: 2100,
          id: "bb-choco-chip",
          image: "/bb-choco-chip.png",
          number: "6",
          price_id: "bb-choco-chip-6",
          quantity: 2,
          title: "Brown Butter Chocolate Chip Cookie",
        },
      ],
    });
  });

  it("shows the order total and advances to customer details", () => {
    renderWithThemeAndProbe(<ShoppingCart />);

    expect(screen.getByText(/Order Total: \$42/i)).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: /Provide customer details/i }),
    );

    expect(screen.getByTestId("checkout-state").textContent).toBe(
      "customerDetails",
    );
  });
});
