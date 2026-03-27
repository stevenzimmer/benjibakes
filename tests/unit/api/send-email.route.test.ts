import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendEmailMock } = vi.hoisted(() => ({
  sendEmailMock: vi.fn(),
}));

vi.mock("@/utils/sendEmail", () => ({
  sendEmail: sendEmailMock,
}));

import { POST } from "@/app/api/send-email/route";

describe("POST /api/send-email", () => {
  beforeEach(() => {
    sendEmailMock.mockReset();
    process.env.SMTP_ORDER_EMAIL = "orders@benjibakes.test";
  });

  it("sends the online-checkout confirmation email to the store", async () => {
    sendEmailMock.mockResolvedValue({ result: "sent" });

    const response = await POST(
      new Request("http://localhost/api/send-email", {
        body: JSON.stringify({
          cart: [
            {
              cost: 2100,
              number: "6",
              price_id: "bb-choco-chip-6",
              quantity: 1,
              title: "Brown Butter Chocolate Chip Cookie",
            },
          ],
          email: "benji@example.com",
          name: "Benji",
          paymentIntentId: "pi_123",
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
      }),
      {} as any,
    );

    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "Order from Benji",
        to: "orders@benjibakes.test",
      }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      result: "sent",
    });
  });

  it("returns a 500 response when sending fails", async () => {
    sendEmailMock.mockRejectedValue(new Error("SMTP unavailable"));

    const response = await POST(
      new Request("http://localhost/api/send-email", {
        body: JSON.stringify({
          cart: [],
          email: "benji@example.com",
          name: "Benji",
          paymentIntentId: "pi_123",
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
      }),
      {} as any,
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "SMTP unavailable",
    });
  });
});
