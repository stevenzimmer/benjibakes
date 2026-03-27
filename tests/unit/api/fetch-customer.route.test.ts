import { beforeEach, describe, expect, it, vi } from "vitest";

const { createCustomerMock, searchCustomersMock } = vi.hoisted(() => ({
  createCustomerMock: vi.fn(),
  searchCustomersMock: vi.fn(),
}));

vi.mock("@/utils/stripe", () => ({
  stripe: {
    customers: {
      create: createCustomerMock,
      search: searchCustomersMock,
    },
  },
}));

import { POST } from "@/app/api/fetch-customer/route";

describe("POST /api/fetch-customer", () => {
  beforeEach(() => {
    createCustomerMock.mockReset();
    searchCustomersMock.mockReset();
  });

  it("returns an existing customer when one is found", async () => {
    searchCustomersMock.mockResolvedValue({
      data: [{ email: "benji@example.com", id: "cus_existing", name: "Benji" }],
    });

    const response = await POST(
      new Request("http://localhost/api/fetch-customer", {
        body: JSON.stringify({
          email: "benji@example.com",
          name: "Benji",
        }),
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      customer: {
        email: "benji@example.com",
        id: "cus_existing",
        name: "Benji",
      },
      isNewCustomer: false,
    });
    expect(createCustomerMock).not.toHaveBeenCalled();
  });

  it("creates and returns a new customer when no match exists", async () => {
    searchCustomersMock.mockResolvedValue({ data: [] });
    createCustomerMock.mockResolvedValue({
      email: "new@example.com",
      id: "cus_new",
      name: "New Customer",
    });

    const response = await POST(
      new Request("http://localhost/api/fetch-customer", {
        body: JSON.stringify({
          email: "new@example.com",
          name: "New Customer",
        }),
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      customer: {
        email: "new@example.com",
        id: "cus_new",
        name: "New Customer",
      },
      isNewCustomer: true,
    });
    expect(createCustomerMock).toHaveBeenCalledWith({
      email: "new@example.com",
      name: "New Customer",
    });
  });

  it("returns a 500 error when Stripe fails", async () => {
    searchCustomersMock.mockRejectedValue(new Error("Stripe unavailable"));

    const response = await POST(
      new Request("http://localhost/api/fetch-customer", {
        body: JSON.stringify({
          email: "broken@example.com",
          name: "Broken",
        }),
        method: "POST",
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Stripe unavailable",
    });
  });
});
