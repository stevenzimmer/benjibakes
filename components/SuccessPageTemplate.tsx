"use client";
import {Button} from "@/components/ui/button";
import formatPrice from "@/utils/formatPrice";
import CheckoutItems from "@/components/CheckoutItems";
import {useCartStore} from "@/store";
import {calculateOrderAmount} from "@/utils/calculateOrderAmount";

export default function SuccessPageTemplate({
    serializedCharge,
}: {
    serializedCharge: string | null;
}) {
    const {checkoutPickupDate, checkoutLineItems} = useCartStore();
    const charge = serializedCharge ? JSON.parse(serializedCharge) : null;

    const total = calculateOrderAmount(checkoutLineItems as any);
    return (
        <div className="flex flex-wrap justify-between w-full h-full">
            <div className="w-full lg:w-5/12 lg:px-6">
                <div className="mb-6">
                    <h1 className="font-semibold text-3xl lg:text-4xl mb-6">
                        Thank you!
                    </h1>
                    <p className="mb-5">
                        We have sent an order confirmation email to{" "}
                        <span className="font-semibold">
                            {charge ? charge.receipt_email : ""}
                        </span>{" "}
                        with your order details.
                    </p>

                    <p className="mb-3 text-lg lg:text-xl">
                        <span className="font-semibold">Total</span>:{" "}
                        {formatPrice(charge ? charge.amount : total)}
                    </p>
                    <p className="mb-3 text-lg lg:text-xl">
                        <span className="font-semibold">Pickup Date</span>:{" "}
                        {charge
                            ? charge.metadata.pickupDate
                            : checkoutPickupDate}
                    </p>
                    {charge && (
                        <Button variant="default">
                            <a
                                target="_blank"
                                href={charge.receipt_url as string}
                            >
                                View Receipt
                            </a>
                        </Button>
                    )}
                    <p className="mt-6">
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
            <div className="w-full lg:w-6/12 lg:px-6">
                <h2 className="font-semibold text-2xl">Your order Details</h2>
                {charge && (
                    <p className="my-3 text-sm text-slate-600">
                        Order #: {charge.id}
                    </p>
                )}
                <CheckoutItems />
            </div>
        </div>
    );
}
