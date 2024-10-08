"use client";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";
import {Button} from "@/components/ui/button";
export default function CheckoutButton() {
    const {setCheckoutError, setCheckoutState} = useContext(ThemeContext);
    const cartStore = useCartStore();

    return (
        <Button
            disabled={cartStore.pickupDate === ""}
            className="bg-bb-blue text-white px-4 py-2 rounded-lg w-full font-semibold text-lg disabled:cursor-not-allowed disabled:bg-gray-300"
            onClick={(e) => {
                e.preventDefault();

                // setShowCheckout(true);
                setCheckoutState("checkout");
                setCheckoutError("");
            }}
        >
            Go to Checkout
        </Button>
    );
}
