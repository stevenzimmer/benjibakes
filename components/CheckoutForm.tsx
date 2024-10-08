"use client";
import {useState, useEffect} from "react";
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";

import formatPrice from "@/utils/formatPrice";
// import {Button} from "./ui/button";
import {useCartStore} from "@/store";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function CheckoutForm({clientSecret}: {clientSecret: string}) {
    const stripe = useStripe();
    const elements = useElements();

    const {setCheckoutState} = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(false);
    const cartStore = useCartStore();
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!;
    }, 0);

    // useEffect(() => {
    //     if (!stripe) {
    //         return;
    //     }

    //     // if (!cartStore.clientSecret) {
    //     //     return;
    //     // }
    // }, [stripe]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        stripe
            .confirmPayment({
                elements,
                redirect: "if_required",
            })
            .then((res) => {
                console.log({res});

                if (res.error) {
                    console.log(res.error);
                    setIsLoading(false);
                }
                if (res.paymentIntent?.status === "succeeded") {
                    // cartStore.setCheckoutStatus("success");
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
            <p className="my-6">Checkout Total: {formattedPrice}</p>
            <p>Pickup Date: {cartStore.pickupDate}</p>
            <button
                className="w-full bg-teal-600 disabled:opacity-25 text-white hover:bg-teal-700"
                id="submit"
                type="submit"
                disabled={isLoading || !stripe || !elements}
            >
                <span>{isLoading ? "Processing..." : "Pay now"}</span>
            </button>
        </form>
    );
}
