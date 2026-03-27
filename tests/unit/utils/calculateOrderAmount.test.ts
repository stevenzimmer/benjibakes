import { describe, expect, it } from "vitest";
import { calculateOrderAmount } from "@/utils/calculateOrderAmount";

describe("calculateOrderAmount", () => {
  it("returns the total amount in cents for all cart items", () => {
    const total = calculateOrderAmount([
      {
        cost: 2100,
        description: "Chocolate chip",
        image: "/cookie.png",
        name: "Brown Butter Chocolate Chip",
        quantity: 2,
      },
      {
        cost: 3300,
        description: "Red velvet",
        image: "/red-velvet.png",
        name: "Red Velvet",
        quantity: 1,
      },
    ]);

    expect(total).toBe(7500);
  });

  it("returns zero for an empty order", () => {
    expect(calculateOrderAmount([])).toBe(0);
  });
});
