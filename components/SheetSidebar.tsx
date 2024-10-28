"use client";
import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";

import {useCartStore} from "@/store";
import PickupDetails from "./PickupDetails";
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
                setSheetTitle("Step 1: Review your shopping cart");
                break;
            case "customerDetails":
                setSheetTitle("Step 2: Provide your information");
                break;
            case "pickupDate":
                setSheetTitle("Step 3: Provide pickup details");
                break;
            case "checkout":
                setSheetTitle("Final Step: Complete payment");
                break;

            case "confirmOrder":
                setSheetTitle("Final Step: Confirm and send your order");
                break;

            case "success":
                setSheetTitle("Order Complete");
                break;
            case "error":
                setSheetTitle(
                    "There was an error creating your order. Please try again."
                );
                break;
            default:
                setSheetTitle("Review your shopping cart");
        }
    }, [checkoutState]);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent className="w-full sm:w-[800px] sm:max-w-full overflow-scroll py-16">
                {checkoutState !== "success" && cartStore.cart.length > 0 && (
                    <CheckoutBreadCrumbs />
                )}
                {cartStore.cart.length > 0 && (
                    <SheetTitle className="mb-6">{sheetTitle}</SheetTitle>
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
                {checkoutState === "pickupDate" && <PickupDetails />}
                {checkoutState === "checkout" && <Checkout />}
                {checkoutState === "confirmOrder" && <ConfirmOrder />}
                {checkoutState === "success" && <Success />}
                {checkoutState === "error" && (
                    <div>
                        <Button
                            onClick={() => {
                                setCheckoutState("cart");
                            }}
                        >
                            Back to Cart
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
