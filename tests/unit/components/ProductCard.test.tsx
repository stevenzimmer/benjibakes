import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ProductCard from "@/components/ProductCard";
import { products } from "@/utils/products";
import { useCartStore } from "@/store";
import { mockToast } from "../mocks/toast";
import { resetCartStore } from "../test-utils";

describe("ProductCard", () => {
  beforeEach(() => {
    resetCartStore();
  });

  it("adds and removes a product line item from the cart", () => {
    render(<ProductCard item={products[0]} />);

    const addButton = screen.getByTitle(
      /Add 6 Brown Butter Chocolate Chip Cookie to cart/i,
    );
    const removeButton = screen.getByTitle(
      /Remove 6 Brown Butter Chocolate Chip Cookie from cart/i,
    ) as HTMLButtonElement;

    expect(removeButton.disabled).toBe(true);

    fireEvent.click(addButton);

    expect(useCartStore.getState().cart[0]?.quantity).toBe(1);
    expect(removeButton.disabled).toBe(false);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Added to cart",
      }),
    );

    fireEvent.click(removeButton);

    expect(useCartStore.getState().cart).toEqual([]);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Removed from cart",
      }),
    );
  });
});
