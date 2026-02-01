"use client";
import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";

import {useCartStore} from "@/store";
import OrderDetails from "./OrderDetails";
import CustomerDetails from "./CustomerDetails";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import {useContext, useState, useEffect} from "react";
import ThemeContext from "@/context/ThemeContext";
import EmptyCart from "./EmptyCart";
import Success from "./Success";
import CheckoutBreadCrumbs from "./CheckoutBreadCrumbs";
import ConfirmOrder from "./ConfirmOrder";
import {Button} from "./ui/button";

export default function SheetSidebar() {
    const cartStore = useCartStore();
    const {
        checkoutState,
        sheetOpen,
        setSheetOpen,
        setCheckoutState,
    } = useContext(ThemeContext);

    const [sheetTitle, setSheetTitle] = useState("Review your shopping cart");

    useEffect(() => {
        switch (checkoutState) {
            case "cart":
                setSheetTitle("Your cart");
                break;
            case "customerDetails":
                setSheetTitle("Your details");
                break;
            case "orderDetails":
                setSheetTitle("Pickup details");
                break;
            case "checkout":
                setSheetTitle("Secure checkout");
                break;

            case "confirmOrder":
                setSheetTitle("Confirm and send");
                break;

            case "success":
                setSheetTitle("Order complete");
                break;
            case "error":
                setSheetTitle("Something went wrong. Please try again.");
                break;
            default:
                setSheetTitle("Your cart");
        }
    }, [checkoutState]);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent className="w-full sm:w-[820px] sm:max-w-full overflow-scroll py-16 bg-bb-cream/80">
                {checkoutState !== "success" && cartStore.cart.length > 0 && (
                    <CheckoutBreadCrumbs />
                )}
                {cartStore.cart.length > 0 && (
                    <SheetTitle className="mb-6 font-display text-2xl md:text-3xl text-bb-ink">
                        {sheetTitle}
                    </SheetTitle>
                )}
                {checkoutState === "cart" && (
                    <>
                        {cartStore.cart.length > 0 ? (
                            <>
                                <ShoppingCart />
                            </>
                        ) : (
                            <div className="flex items-center flex-col justify-center h-full">
                                <EmptyCart />
                            </div>
                        )}
                    </>
                )}
                {checkoutState === "customerDetails" && <CustomerDetails />}
                {checkoutState === "orderDetails" && <OrderDetails />}
                {checkoutState === "checkout" && <Checkout />}
                {checkoutState === "confirmOrder" && <ConfirmOrder />}
                {checkoutState === "success" && <Success />}
                {checkoutState === "error" && (
                    <div>
                        <Button
                            onClick={() => {
                                setCheckoutState("cart");
                            }}
                            className="rounded-full bg-bb-brown text-white hover:bg-bb-ink"
                        >
                            Back to Cart
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
