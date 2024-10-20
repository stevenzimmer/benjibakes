"use client";
import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";

import {useCartStore} from "@/store";
import PickupDate from "./PickupDate";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import {useContext, useState, useEffect} from "react";
import ThemeContext from "@/context/ThemeContext";
import EmptyCart from "./EmptyCart";
import Success from "./Success";
import CheckoutBreadCrumbs from "./CheckoutBreadCrumbs";

export default function SheetSidebar() {
    const cartStore = useCartStore();
    const {checkoutState, sheetOpen, setSheetOpen} = useContext(ThemeContext);

    const [sheetTitle, setSheetTitle] = useState("Review your shopping cart");

    useEffect(() => {
        switch (checkoutState) {
            case "cart":
                setSheetTitle("Step 1: Review your shopping cart");
                break;
            case "pickupDate":
                setSheetTitle("Step 2: Provide order details");
                break;
            case "checkout":
                setSheetTitle("Final Step: Complete checkout");
                break;

            case "success":
                setSheetTitle("Order Complete");
                break;
            default:
                setSheetTitle("Review your shopping cart");
        }
    }, [checkoutState]);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent className="w-11/12 sm:w-[600px] sm:max-w-full overflow-scroll">
                {checkoutState !== "success" && <CheckoutBreadCrumbs />}
                <SheetTitle className="mb-6">{sheetTitle}</SheetTitle>
                {checkoutState === "cart" && (
                    <>
                        {cartStore.cart.length > 0 ? (
                            <ShoppingCart />
                        ) : (
                            <EmptyCart />
                        )}
                    </>
                )}

                {checkoutState === "checkout" && <Checkout />}
                {checkoutState === "pickupDate" && <PickupDate />}
                {checkoutState === "success" && <Success />}
            </SheetContent>
        </Sheet>
    );
}
