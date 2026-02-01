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
import {PausedOrders} from "./PausedOrders";

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
                    name: cartStore.name,
                    pickupDate: cartStore.pickupDate,
                    paymentIntentId: paymentIntent.id,
                }),
            });

            const {error} = await res.json();

            if (error) {
                setCheckoutError(error);
                return;
            }
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
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-bb-brown-20 bg-white/90 p-5 shadow-sm">
                    <PausedOrders />
                    {/* <h3 className="mb-4 font-display text-xl text-bb-ink">
                        Payment information
                    </h3> */}
                    {/* <PaymentElement
                        id="payment-element"
                        options={{
                            layout: "tabs",
                        }}
                    /> */}
                    {/* {checkoutError && (
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
                    )} */}

                    {/* <Button
                        className="mt-4 w-full rounded-full bg-bb-brown text-white font-semibold py-6 text-lg hover:bg-bb-ink disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        id="submit"
                        type="submit"
                        disabled={isLoading || !stripe || !elements}
                    >
                        {isLoading
                            ? "Order is processing..."
                            : `Pay ${formattedPrice}`}
                        {isLoading && (
                            <svg
                                className="animate-spin ml-2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        )}
                    </Button> */}
                </div>
                <div className="space-y-4">
                    <div className="rounded-2xl border border-bb-brown-20 bg-bb-brown-10/70 p-5">
                        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-bb-blue font-semibold">
                            Order summary
                        </p>
                        <div className="space-y-3 text-sm md:text-base">
                            {cartStore.cart.map((item, idx) => (
                                <div
                                    key={`${item.price_id}-${idx}`}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-bb-brown">
                                        {item.quantity} × {item.title} (
                                        {item.number})
                                    </span>
                                    <span className="font-semibold text-bb-ink">
                                        {formatPrice(
                                            item.cost! * item.quantity!,
                                        )}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between border-t border-bb-brown-20 pt-3 font-semibold text-bb-ink">
                                <span>Total</span>
                                <span>{formattedPrice}</span>
                            </div>
                            <p className="text-sm text-bb-brown/70">
                                Pickup date: {cartStore.pickupDate}
                            </p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-bb-brown-20 bg-white/90 p-5 text-sm md:text-base text-bb-brown">
                        <p className="mb-2">
                            After checkout, we&apos;ll send a confirmation email
                            with your order details and receipt. We&apos;ll also
                            follow up to coordinate pickup time.
                        </p>
                        {/* <BakeryAddress /> */}
                    </div>
                </div>
            </div>
        </form>
    );
}
