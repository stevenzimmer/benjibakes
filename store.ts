import {create} from "zustand";
import {persist} from "zustand/middleware";

import {CartState} from "./types/Cart";

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            clearCart: () => set((state) => ({cart: []})),
            onCheckout: "cart",
            setCheckoutStatus: (val) => set((state) => ({onCheckout: val})),
            paymentIntent: "",
            setPaymentIntent: (val) => set((state) => ({paymentIntent: val})),
            clientSecret: "",
            setClientSecret: (val) => set((state) => ({clientSecret: val})),
            pickupDate: "",
            setPickupDate: (val: string) => set((state) => ({pickupDate: val})),
            email: "",
            setEmail: (val: string) => set((state) => ({email: val})),
            checkoutLineItems: [],
            setCheckoutLineItems: (val) =>
                set((state) => ({checkoutLineItems: val})),
            customerId: "",
            setCustomerId: (val: string) => set((state) => ({customerId: val})),
            addProduct: (item) =>
                set((state) => {
                    const existingItem = state.cart.find(
                        (cartItem) => cartItem.price_id === item.price_id
                    );
                    // console.log({existingItem});

                    if (existingItem) {
                        const updatedCart = state.cart.map((cartItem) => {
                            if (cartItem.price_id === item.price_id) {
                                return {
                                    ...cartItem,
                                    quantity: cartItem.quantity! + 1,
                                };
                            }

                            return cartItem;
                        });

                        return {cart: updatedCart};
                    } else {
                        // console.log({item});
                        return {
                            cart: [
                                ...state.cart,
                                {
                                    ...item,
                                    quantity: 1,
                                },
                            ],
                        };
                    }
                }),
            removeProduct: (item) =>
                set((state) => {
                    // console.log("removeProduct", item);
                    const existingItem = state.cart.find((cartItem) => {
                        // console.log({cartItem});
                        return cartItem.price_id === item.price_id;
                    });
                    // console.log({existingItem});

                    if (existingItem && existingItem.quantity! > 1) {
                        const updatedCart = state.cart.map((cartItem) => {
                            if (cartItem.price_id === item.price_id) {
                                return {
                                    ...cartItem,
                                    quantity: cartItem.quantity! - 1,
                                };
                            }
                            return cartItem;
                        });
                        return {cart: updatedCart};
                    } else {
                        // Remove Item from cart
                        const filteredCart = state.cart.filter((cartItem) => {
                            // console.log({cartItem});
                            return cartItem.price_id !== item.price_id;
                        });
                        return {cart: filteredCart};
                    }
                }),
        }),

        {name: "cart-store"}
    )
);
