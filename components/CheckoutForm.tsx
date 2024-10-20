"use client";
import {useState} from "react";
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";

import {useRouter} from "next/navigation";

import {AnimatePresence, motion} from "framer-motion";
import formatPrice from "@/utils/formatPrice";
import {Button} from "./ui/button";
import {useCartStore} from "@/store";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function CheckoutForm({clientSecret}: {clientSecret: string}) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const {
        setCheckoutError,
        checkoutError,
        setShowSidebar,
        setCheckoutState,
    } = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(false);
    const cartStore = useCartStore();
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.cost! * item.quantity!;
    }, 0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setCheckoutError("");
        setIsLoading(true);

        const {error: submitError} = await elements.submit();

        if (submitError) {
            // console.log({submitError});
            setCheckoutError(submitError?.message as string);
            setIsLoading(false);
            return;
        }

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            clientSecret,
            redirect: "if_required",
        });

        if (error) {
            setCheckoutError(error.message as string);
            setIsLoading(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            // console.log("checkout Cart", cartStore.cart);
            setShowSidebar(false);
            cartStore.setCheckoutLineItems(cartStore.cart);
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: cartStore.cart,
                    email: cartStore.email,
                    pickupDate: cartStore.pickupDate,
                    paymentIntentId: paymentIntent.id,
                }),
            });

            const {result, error} = await res.json();

            if (error) {
                setCheckoutError(error);
                return;
            }
            // console.log({result});
            setShowSidebar(false);
            cartStore.clearStore();
            setCheckoutState("cart");

            setIsLoading(false);
            router.push(`/success?id=${paymentIntent.id}`);
        }
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
                <AnimatePresence>
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="text-red-500 py-3"
                    >
                        {checkoutError}
                    </motion.p>
                </AnimatePresence>
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
                className="w-full bg-bb-blue disabled:opacity-25 text-white hover:bg-bb-blue/80 transition-all duration-200 text-2xl py-10 disabled:cursor-not-allowed disabled:animate-pulse"
                id="submit"
                type="submit"
                disabled={isLoading || !stripe || !elements}
            >
                <span>
                    {isLoading ? "Processing..." : `Pay ${formattedPrice}`}
                </span>
            </Button>
        </form>
    );
}
