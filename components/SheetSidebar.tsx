"use client";
import {Box} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";

import {useCartStore} from "@/store";
import {motion} from "framer-motion";
import PickupDate from "./PickupDate";
import ShoppingCart from "./ShoppingCart";
import {AnimatePresence} from "framer-motion";
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

    const totalQuanity = cartStore.cart.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
    );

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
            <SheetTrigger asChild>
                <div className="relative ">
                    <Box className="md:ml-6 text-bb-brown" size={32} />

                    <AnimatePresence>
                        {cartStore.cart.length > 0 && (
                            <motion.span
                                animate={{scale: 1}}
                                initial={{scale: 0}}
                                className="absolute -top-2 -right-2 bg-bb-blue text-white font-semibold w-5 h-5 rounded-full text-center flex items-center justify-center text-xs"
                            >
                                {totalQuanity > 9 ? "9+" : totalQuanity}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </SheetTrigger>
            <SheetContent className="w-11/12 sm:w-[600px] sm:max-w-full">
                <CheckoutBreadCrumbs />
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
