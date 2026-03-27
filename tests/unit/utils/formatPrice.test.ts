import { describe, expect, it } from "vitest";
import formatPrice from "@/utils/formatPrice";

describe("formatPrice", () => {
  it("formats whole-dollar amounts in USD", () => {
    expect(formatPrice(2100)).toBe("$21");
  });

  it("rounds down to the configured whole-dollar display", () => {
    expect(formatPrice(2150)).toBe("$22");
  });
});
