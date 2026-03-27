import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendEmailMock } = vi.hoisted(() => ({
  sendEmailMock: vi.fn(),
}));

vi.mock("@/utils/sendEmail", () => ({
  sendEmail: sendEmailMock,
}));

import { POST } from "@/app/api/send-order-email/route";

describe("POST /api/send-order-email", () => {
  beforeEach(() => {
    sendEmailMock.mockReset();
    process.env.SMTP_ORDER_EMAIL = "orders@benjibakes.test";
  });

  it("sends store and customer confirmation emails", async () => {
    sendEmailMock
      .mockResolvedValueOnce({ result: "store-sent" })
      .mockResolvedValueOnce({ result: "customer-sent" });

    const response = await POST(
      new Request("http://localhost/api/send-order-email", {
        body: JSON.stringify({
          cart: [
            {
              cost: 2100,
              number: "6",
              price_id: "bb-choco-chip-6",
              quantity: 2,
              title: "Brown Butter Chocolate Chip Cookie",
            },
          ],
          email: "benji@example.com",
          name: "Benji",
          pickupDate: "April 2, 2026",
        }),
        method: "POST",
      }),
      {} as any,
    );

    expect(sendEmailMock).toHaveBeenCalledTimes(2);
    expect(sendEmailMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        subject: "Pay on pickup Order from Benji",
        to: "orders@benjibakes.test",
      }),
    );
    expect(sendEmailMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        subject: "Benji Bakes order",
        to: "benji@example.com",
      }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      result: "store-sent",
      resultCustomer: "customer-sent",
    });
  });

  it("returns a 500 response when an email send fails", async () => {
    sendEmailMock.mockRejectedValue(new Error("SMTP unavailable"));

    const response = await POST(
      new Request("http://localhost/api/send-order-email", {
        body: JSON.stringify({
          cart: [],
          email: "benji@example.com",
          name: "Benji",
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
