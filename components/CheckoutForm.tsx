"use client";
import {useState, useEffect} from "react";
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";

import formatPrice from "@/utils/formatPrice";
import {Button} from "./ui/button";
import {useCartStore} from "@/store";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function CheckoutForm({clientSecret}: {clientSecret: string}) {
    const stripe = useStripe();
    const elements = useElements();

    // useEffect(() => {
    //     //  Create payment intent as soon as page loads
    //     if (!stripe) {
    //         return;
    //     }

    //     if (!clientSecret) {
    //         return;
    //     }
    // }, [stripe, clientSecret]);

    const {setCheckoutState, setCheckoutError, checkoutError} = useContext(
        ThemeContext
    );

    const [isLoading, setIsLoading] = useState(false);
    const cartStore = useCartStore();
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!;
    }, 0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCheckoutError("");
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        stripe
            .confirmPayment({
                elements,
                redirect: "if_required",
            })
            .then((res: any) => {
                console.log({res});
                if (res.error) {
                    console.log(res.error);
                    setCheckoutError(res.error.message);
                    setIsLoading(false);
                }
                if (res.paymentIntent?.status === "succeeded") {
                    setCheckoutState("success");
                    cartStore.clearCart();
                    cartStore.setPaymentIntent("");
                    cartStore.setClientSecret("");
                    setIsLoading(false);
                }
            });
    };

    const formattedPrice = formatPrice(totalPrice);

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <PaymentElement
                id="payment-element"
                options={{
                    layout: "tabs",
                }}
            />
            {checkoutError && (
                <div className="text-red-500 text-sm mt-2">{checkoutError}</div>
            )}
            <div className="my-6 text-xl bg-slate-100 p-6 rounded-lg">
                <p className="mb-3 ">
                    <strong>Checkout Total</strong>: {formattedPrice}
                </p>
                <p>
                    <strong>Pickup Date</strong>: {cartStore.pickupDate}
                </p>
            </div>
            <Button
                className="w-full bg-bb-blue disabled:opacity-25 text-white hover:bg-bb-blue/80 transition-all duration-200"
                id="submit"
                type="submit"
                disabled={isLoading || !stripe || !elements}
            >
                <span>{isLoading ? "Processing..." : "Pay now"}</span>
            </Button>
        </form>
    );
}
