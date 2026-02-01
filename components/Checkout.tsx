import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useCartStore} from "@/store";
import {useEffect} from "react";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

import {useToast} from "@/hooks/use-toast";
import CheckoutForm from "@/components/CheckoutForm";

export default function Checkout() {
    const cartStore = useCartStore();
    const {setCheckoutError, setCheckoutState} = useContext(ThemeContext);
    const {toast} = useToast();

    async function getPaymentIntent() {
        if (!cartStore.paymentIntent || !cartStore.clientSecret) {
            setCheckoutError("");
            const response = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    items: cartStore.cart,
                    customerId: cartStore.customerId,
                    payment_intent_id: cartStore.paymentIntent,
                    pickupDate: cartStore.pickupDate,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setCheckoutState("error");
                setCheckoutError(data.error);
                toast({
                    title: "Error",
                    description: data.error,
                    variant: "destructive",
                });
                return;
            }

            if (data.paymentIntent.status === "succeeded") {
                setCheckoutState("success");
            } else {
                cartStore.setClientSecret(data.paymentIntent.client_secret);
                cartStore.setPaymentIntent(data.paymentIntent.id);
            }
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!cartStore.clientSecret) {
            getPaymentIntent();
        }
    }, []);

    const options: StripeElementsOptions = {
        clientSecret: cartStore.clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating",
            variables: {
                colorPrimary: "#2C7A7B",
                colorBackground: "#FFFDF9",
                colorText: "#1F150F",
                colorDanger: "#B91C1C",
                borderRadius: "12px",
                fontFamily: "Manrope, system-ui, sans-serif",
            },
        },
    };

    return (
        <>
            {cartStore.clientSecret && (
                <div className="mb-12">
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm clientSecret={cartStore.clientSecret} />
                    </Elements>
                </div>
            )}
        </>
    );
}
