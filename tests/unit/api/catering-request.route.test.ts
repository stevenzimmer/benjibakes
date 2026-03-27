import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendEmailMock } = vi.hoisted(() => ({
  sendEmailMock: vi.fn(),
}));

vi.mock("@/utils/sendEmail", () => ({
  sendEmail: sendEmailMock,
}));

import { POST } from "@/app/api/catering-request/route";

describe("POST /api/catering-request", () => {
  beforeEach(() => {
    sendEmailMock.mockReset();
    process.env.SMTP_ORDER_EMAIL = "orders@benjibakes.test";
  });

  it("sends the catering request details to the store inbox", async () => {
    sendEmailMock.mockResolvedValue({ result: "sent" });

    const response = await POST(
      new Request("http://localhost/api/catering-request", {
        body: JSON.stringify({
          details: "We need individually wrapped cookies for a conference.",
          email: "benji@example.com",
          eventDate: "2026-04-15T12:00:00.000Z",
          username: "Benji Bakes",
        }),
        method: "POST",
      }),
      {} as any,
    );

    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "Catering request from Benji Bakes",
        to: "orders@benjibakes.test",
      }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      result: "success",
    });
  });

  it("returns a 500 response when the catering email fails", async () => {
    sendEmailMock.mockRejectedValue(new Error("SMTP unavailable"));

    const response = await POST(
      new Request("http://localhost/api/catering-request", {
        body: JSON.stringify({
          details: "Need cookies.",
          email: "benji@example.com",
          eventDate: "2026-04-15T12:00:00.000Z",
          username: "Benji Bakes",
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
