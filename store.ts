import {create} from "zustand";
import {persist} from "zustand/middleware";

import {CartState} from "./types/Cart";

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            clearStore: () =>
                set((state) => ({
                    cart: [],
                    paymentIntent: "",
                    clientSecret: "",
                    pickupDate: "",
                })),
            cart: [],
            clearCart: () => set((state) => ({cart: []})),
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
                    const existingItem = state.cart.find((cartItem) => {
                        return cartItem.price_id === item.price_id;
                    });

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
                            return cartItem.price_id !== item.price_id;
                        });
                        return {cart: filteredCart};
                    }
                }),
        }),

        {name: "cart-store"}
    )
);
