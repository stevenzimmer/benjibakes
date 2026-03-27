import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useEffect } from "react";
import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

import { useToast } from "@/hooks/use-toast";
import CheckoutForm from "@/components/CheckoutForm";

export default function Checkout() {
  const cartStore = useCartStore();
  const { setCheckoutError, setCheckoutState } = useContext(ThemeContext);
  const { toast } = useToast();
  const {
    cart,
    clientSecret,
    customerId,
    paymentIntent,
    pickupDate,
    setClientSecret,
    setPaymentIntent,
  } = cartStore;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (clientSecret) return;

    async function getPaymentIntent() {
      if (!paymentIntent || !clientSecret) {
        setCheckoutError("");
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            customerId,
            payment_intent_id: paymentIntent,
            pickupDate,
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
          setClientSecret(data.paymentIntent.client_secret);
          setPaymentIntent(data.paymentIntent.id);
        }
      }
    }

    void getPaymentIntent();
  }, [
    cart,
    clientSecret,
    customerId,
    paymentIntent,
    pickupDate,
    setCheckoutError,
    setCheckoutState,
    setClientSecret,
    setPaymentIntent,
    toast,
  ]);

  const options: StripeElementsOptions = {
    clientSecret,
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
      {clientSecret && (
        <div className="mb-12">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
    </>
  );
}
