import { beforeEach, describe, expect, it, vi } from "vitest";

const { createMock, retrieveMock, updateMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
  retrieveMock: vi.fn(),
  updateMock: vi.fn(),
}));

vi.mock("@/utils/stripe", () => ({
  stripe: {
    paymentIntents: {
      create: createMock,
      retrieve: retrieveMock,
      update: updateMock,
    },
  },
}));

import { POST } from "@/app/api/create-payment-intent/route";

const items = [
  {
    cost: 2100,
    id: "bb-choco-chip",
    number: "6",
    price_id: "bb-choco-chip-6",
    quantity: 2,
    title: "Brown Butter Chocolate Chip Cookie",
  },
];

describe("POST /api/create-payment-intent", () => {
  beforeEach(() => {
    createMock.mockReset();
    retrieveMock.mockReset();
    updateMock.mockReset();
  });

  it("creates a payment intent with order metadata", async () => {
    createMock.mockResolvedValue({
      client_secret: "secret_123",
      id: "pi_123",
      status: "requires_payment_method",
    });

        const response = await POST(
            new Request("http://localhost/api/create-payment-intent", {
                body: JSON.stringify({
                    customerId: "cus_123",
          items,
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
            }) as any,
        );

        expect(response).toBeDefined();
        if (!response) {
            throw new Error("Expected a response");
        }

        expect(createMock).toHaveBeenCalledWith({
      amount: 4200,
      automatic_payment_methods: {
        enabled: true,
      },
      currency: "usd",
      customer: "cus_123",
      metadata: {
        orderInfo: "(2) bb-choco-chip-6 | ",
        pickupDate: "April 2, 2026",
      },
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      paymentIntent: {
        client_secret: "secret_123",
        id: "pi_123",
        status: "requires_payment_method",
      },
    });
  });

  it("returns the existing intent when it already succeeded", async () => {
    retrieveMock.mockResolvedValue({
      id: "pi_existing",
      status: "succeeded",
    });

        const response = await POST(
            new Request("http://localhost/api/create-payment-intent", {
                body: JSON.stringify({
                    customerId: "cus_123",
          items,
          payment_intent_id: "pi_existing",
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
            }) as any,
        );

        expect(response).toBeDefined();
        if (!response) {
            throw new Error("Expected a response");
        }

        expect(updateMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      paymentIntent: {
        id: "pi_existing",
        status: "succeeded",
      },
    });
  });

  it("updates an existing open intent instead of creating a new one", async () => {
    retrieveMock.mockResolvedValue({
      id: "pi_existing",
      status: "requires_payment_method",
    });
    updateMock.mockResolvedValue({
      id: "pi_existing",
      status: "requires_payment_method",
    });

        const response = await POST(
            new Request("http://localhost/api/create-payment-intent", {
                body: JSON.stringify({
                    customerId: "cus_123",
          items,
          payment_intent_id: "pi_existing",
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
            }) as any,
        );

        expect(response).toBeDefined();
        if (!response) {
            throw new Error("Expected a response");
        }

        expect(updateMock).toHaveBeenCalledWith("pi_existing", {
      amount: 4200,
      customer: "cus_123",
      metadata: {
        orderInfo: "(2) bb-choco-chip-6 | ",
        pickupDate: "April 2, 2026",
      },
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      paymentIntent: {
        id: "pi_existing",
        status: "requires_payment_method",
      },
    });
  });

  it("returns a 500 response when Stripe cannot create a payment intent", async () => {
    createMock.mockRejectedValue(new Error("Stripe create failed"));

        const response = await POST(
            new Request("http://localhost/api/create-payment-intent", {
                body: JSON.stringify({
                    customerId: "cus_123",
          items,
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
            }) as any,
        );

        expect(response).toBeDefined();
        if (!response) {
            throw new Error("Expected a response");
        }

        expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Error creating payment intent",
    });
  });
});
