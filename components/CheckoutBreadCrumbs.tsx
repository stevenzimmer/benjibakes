import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";

export default function CheckoutBreadCrumbs() {
    const {setCheckoutState, checkoutState} = useContext(ThemeContext);

    const cartStore = useCartStore();

    const canProceedToCustomerDetails = cartStore.cart.length > 0;
    const canProceedToOrderDetails = cartStore.email && cartStore.name;

    const canProceedToCheckout =
        canProceedToCustomerDetails &&
        canProceedToOrderDetails &&
        cartStore.pickupDate;

    const steps = [
        {key: "cart", label: "Cart", canGo: true},
        {
            key: "customerDetails",
            label: "Details",
            canGo: canProceedToCustomerDetails,
        },
        {
            key: "orderDetails",
            label: "Pickup",
            canGo: canProceedToOrderDetails,
        },
        {key: "checkout", label: "Payment", canGo: canProceedToCheckout},
    ];

    const normalizedState =
        checkoutState === "confirmOrder" ? "checkout" : checkoutState;
    const currentIndex = steps.findIndex(
        (step) => step.key === normalizedState,
    );

    return (
        <div className="mb-6 rounded-2xl border border-bb-brown-20 bg-white/90 p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {steps.map((step, index) => {
                    const isActive = normalizedState === step.key;
                    const isComplete = index < currentIndex;
                    return (
                        <button
                            key={step.key}
                            disabled={!step.canGo}
                            onClick={() => {
                                if (step.canGo) {
                                    setCheckoutState(step.key);
                                }
                            }}
                            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${
                                isActive
                                    ? "border-bb-brown bg-bb-brown text-white hover:bg-bb-ink"
                                    : isComplete
                                    ? "border-bb-sage bg-bb-sage text-bb-ink"
                                    : "border-bb-brown-20 text-bb-brown"
                            } ${
                                step.canGo
                                    ? "hover:border-bb-brown hover:bg-bb-brown/10"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            <span className="text-xs">{index + 1}</span>
                            <span>{step.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
