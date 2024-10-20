// "use client";
import {redirect} from "next/navigation";
import {stripe} from "@/utils/stripe";
import {Button} from "@/components/ui/button";
import formatPrice from "@/utils/formatPrice";
import CheckoutItems from "@/components/CheckoutItems";

export default async function SuccessPage({
    searchParams: {id},
}: {
    searchParams: {id: string};
}) {
    if (!id) {
        redirect("/");
    }

    const payment = await stripe.paymentIntents.retrieve(id);

    const charge = await stripe.charges.retrieve(
        payment.latest_charge as string
    );

    // console.log({charge});

    return (
        <div className="flex flex-wrap justify-between w-full h-full">
            <div className="w-full lg:w-5/12 px-6">
                <div className="mb-6">
                    <h1 className="font-semibold text-4xl mb-6">Thank you!</h1>
                    <p className="mb-5">
                        We have sent an order confirmation email to{" "}
                        <span className="font-semibold">
                            {charge.receipt_email}
                        </span>{" "}
                        with your order details.
                    </p>

                    <p className="mb-3 text-xl">
                        <span className="font-semibold">Total</span>:{" "}
                        {formatPrice(charge.amount)}
                    </p>
                    <p className="mb-3 text-xl">
                        <span className="font-semibold">Pickup Date</span>:{" "}
                        {charge.metadata.pickupDate}
                    </p>
                    <Button variant="default">
                        <a target="_blank" href={charge.receipt_url as string}>
                            View Receipt
                        </a>
                    </Button>
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
            <div className="w-full lg:w-6/12 px-6">
                <h2 className="font-semibold text-2xl">Your order Details</h2>
                <p className="my-3 text-sm text-slate-600">
                    Order #: {charge.id}
                </p>
                <CheckoutItems />
            </div>
        </div>
    );
}
