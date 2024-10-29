import {useCartStore} from "@/store";
import CartItem from "./CartItem";
import {Button} from "@/components/ui/button";
import formatPrice from "@/utils/formatPrice";
import {useContext, useState} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

export default function ConfirmOrder() {
    const cartStore = useCartStore();
    const {toast} = useToast();
    const router = useRouter();
    const {setCheckoutError, setCheckoutState, setShowSidebar} = useContext(
        ThemeContext
    );

    const [isSent, setIsSent] = useState(false);
    const [isSendingOrder, setIsSendingOrder] = useState(false);

    const handleOrderSend = async () => {
        setIsSendingOrder(true);

        const res = await fetch("/api/send-order-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: cartStore.cart,
                email: cartStore.email,
                name: cartStore.name,
                pickupDate: cartStore.pickupDate,
            }),
        });

        const {error} = await res.json();

        if (error) {
            setCheckoutError(error);
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
            return;
        }
        setIsSendingOrder(false);
        setIsSent(true);
        setShowSidebar(false);

        cartStore.setCheckoutLineItems(cartStore.cart);
        cartStore.setCheckoutPickupDate(cartStore.pickupDate);
        cartStore.clearStore();
        toast({
            title: "Order sent",
            description:
                "Your order has been sent and you will receive an email confirmation shortly.",
        });
        router.push(`/success?pay_later=true`);
        setCheckoutState("cart");
    };

    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.cost! * item.quantity!;
    }, 0);
    return (
        <div className="relative">
            {!isSent ? (
                <>
                    <h2>Order Summary</h2>
                    <div>
                        {cartStore.cart.map((item, i) => (
                            <CartItem key={i} item={item} />
                        ))}
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg my-6">
                        <p className="mb-3">
                            <span className="font-semibold">
                                Customer name:
                            </span>{" "}
                            {cartStore.name}
                        </p>
                        <p className="mb-3">
                            <span className="font-semibold">
                                Customer Email:
                            </span>{" "}
                            {cartStore.email}
                        </p>
                        <p className="mb-3">
                            <span className="font-semibold">Pickup Date:</span>{" "}
                            {cartStore.pickupDate}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Amount due on pickup:
                            </span>{" "}
                            <span>{formatPrice(totalPrice)}</span>
                        </p>
                    </div>
                    <div className="sticky bottom-0 left-0 right-0 shadow-lg">
                        <Button
                            onClick={handleOrderSend}
                            className="border-2 text-white bg-bb-blue border-bb-blue hover:bg-bb-blue-50 hover:border-bb-blue/80 font-semibold text-lg py-6 hover:text-white w-full disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                            title="Send order"
                            aria-label="Send order"
                            disabled={isSendingOrder}
                        >
                            {isSendingOrder
                                ? "Order is processing"
                                : "Send order"}
                            {isSendingOrder && (
                                <svg
                                    className="animate-spin ml-2 h-5 w-5 text-bb-blue"
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
                        </Button>
                    </div>
                </>
            ) : (
                <div className="bg-green-50 p-3 rounded-lg">
                    <h2>Order Sent!</h2>
                    <p>
                        Your order has been sent. You will receive an email
                        confirmation shortly!
                    </p>
                </div>
            )}
        </div>
    );
}
