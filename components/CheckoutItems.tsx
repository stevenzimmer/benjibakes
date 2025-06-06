"use client";
import {useCartStore} from "@/store";
import CartItem from "./CartItem";
export default function CheckoutItems() {
    const cartStore = useCartStore();
    return (
        <div className="mb-6">
            {cartStore.checkoutLineItems.map((item, i) => (
                <CartItem key={i} item={item} />
            ))}
        </div>
    );
}
