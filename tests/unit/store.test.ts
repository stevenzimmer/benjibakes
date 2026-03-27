import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/store";
import { resetCartStore } from "./test-utils";

const sampleItem = {
  cost: 2100,
  id: "bb-choco-chip",
  image: "/bb-choco-chip.png",
  number: "6",
  price_id: "bb-choco-chip-6",
  quantity: 1,
  title: "Brown Butter Chocolate Chip Cookie",
};

describe("useCartStore", () => {
  beforeEach(() => {
    resetCartStore();
  });

  it("increments quantity when the same product is added twice", () => {
    const store = useCartStore.getState();

    store.addProduct(sampleItem);
    store.addProduct(sampleItem);

    expect(useCartStore.getState().cart).toEqual([
      {
        ...sampleItem,
        quantity: 2,
      },
    ]);
  });

  it("decrements quantity and removes the line item when it reaches zero", () => {
    const store = useCartStore.getState();

    store.addProduct(sampleItem);
    store.addProduct(sampleItem);

    store.removeProduct(sampleItem);
    expect(useCartStore.getState().cart[0]?.quantity).toBe(1);

    store.removeProduct(sampleItem);
    expect(useCartStore.getState().cart).toEqual([]);
  });

  it("clears cart and payment intent state without touching the success-page snapshot", () => {
    useCartStore.setState({
      ...useCartStore.getState(),
      cart: [sampleItem],
      checkoutLineItems: [sampleItem],
      clientSecret: "secret_123",
      paymentDetails: "visa",
      paymentIntent: "pi_123",
      pickupDate: "April 2, 2026",
    });

    useCartStore.getState().clearStore();

    const state = useCartStore.getState();
    expect(state.cart).toEqual([]);
    expect(state.clientSecret).toBe("");
    expect(state.paymentDetails).toBe("");
    expect(state.paymentIntent).toBe("");
    expect(state.pickupDate).toBe("");
    expect(state.checkoutLineItems).toEqual([sampleItem]);
  });
});
