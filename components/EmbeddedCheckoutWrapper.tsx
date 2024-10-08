"use client";
import {loadStripe} from "@stripe/stripe-js";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import {useCallback, useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";
export default function EmbeddedCheckoutWrapper() {
    const cartStore = useCartStore();
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY!
    );

    const {showCheckout, setShowCheckout, setCheckoutError} = useContext(
        ThemeContext
    );

    const line_items = cartStore.cart.map((item) => {
        return {
            price: item.price_id,
            quantity: item.quantity,
        };
    });

    const fetchClientSecret = useCallback(async () => {
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                line_items,
            }),
        });

        const data = await response.json();

        if (data.error) {
            setCheckoutError(
                "There was an error processing your order, please reach out to allie@benjibakes.com to complete your order. Sincerest apologies for the inconvenience."
            );
            setShowCheckout(false);
            return;
        }

        return data.client_secret;
    }, [line_items]);

    const options = {
        fetchClientSecret,
    };

    return (
        <>
            {showCheckout && (
                <div className="fixed top-0 right-0 w-4/5  h-full flex items-center bg-white shadow-lg z-50">
                    <div className="w-full px-12">
                        <button
                            className="text-xl text-right text-slate-900"
                            onClick={() => setShowCheckout(false)}
                        >
                            Go Back
                        </button>
                        {/*                         
                        <EmbeddedCheckoutProvider
                            stripe={stripePromise}
                            options={options}
                        >
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider> */}
                        <Checkout />
                    </div>
                </div>
            )}
        </>
    );
}
