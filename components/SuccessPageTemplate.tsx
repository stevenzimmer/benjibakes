"use client";
import {Button} from "@/components/ui/button";
import formatPrice from "@/utils/formatPrice";
import CheckoutItems from "@/components/CheckoutItems";
import {useCartStore} from "@/store";
import {calculateOrderAmount} from "@/utils/calculateOrderAmount";
import BakeryAddress from "./BakeryAddress";

export default function SuccessPageTemplate({
    serializedCharge,
}: {
    serializedCharge: string | null;
}) {
    const {checkoutPickupDate, checkoutLineItems} = useCartStore();
    const charge = serializedCharge ? JSON.parse(serializedCharge) : null;

    const total = calculateOrderAmount(checkoutLineItems as any);
    return (
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] w-full h-full">
            <div className="rounded-3xl border border-bb-brown-20 bg-white/90 p-6 shadow-sm">
                <div className="mb-6">
                    <h1 className="font-display text-3xl lg:text-4xl mb-4 text-bb-ink">
                        Thank you!
                    </h1>
                    <p className="mb-5 text-bb-brown/80">
                        We have sent an order confirmation email to{" "}
                        <span className="font-semibold text-bb-ink">
                            {charge ? charge.receipt_email : ""}
                        </span>{" "}
                        with your order details.
                    </p>

                    <p className="mb-3 text-lg lg:text-xl text-bb-ink">
                        <span className="font-semibold">Total</span>:{" "}
                        {formatPrice(charge ? charge.amount : total)}
                    </p>
                    <p className="mb-5 text-lg lg:text-xl text-bb-ink">
                        <span className="font-semibold">Pickup Date</span>:{" "}
                        {charge
                            ? charge.metadata.pickupDate
                            : checkoutPickupDate}
                    </p>

                    {charge && (
                        <Button className="mt-4 rounded-full bg-bb-brown text-white hover:bg-bb-ink">
                            <a
                                target="_blank"
                                href={charge.receipt_url as string}
                            >
                                View Receipt
                            </a>
                        </Button>
                    )}
                    <p className="mt-6 text-bb-brown">
                        Please email{" "}
                        <a
                            className="font-semibold underline"
                            href="mailto:allie@benjibakes.com"
                        >
                            allie@benjibakes.com
                        </a>{" "}
                        if you have any questions or need to make any changes to
                        your order.
                    </p>
                </div>
            </div>
            <div className="rounded-3xl border border-bb-brown-20 bg-bb-brown-10/70 p-6 shadow-sm">
                <h2 className="font-display text-2xl text-bb-ink mb-2">
                    Your order details
                </h2>
                {charge && (
                    <p className="my-3 text-sm text-bb-brown/70">
                        Order #: {charge.id}
                    </p>
                )}
                <CheckoutItems />
            </div>
        </div>
    );
}
