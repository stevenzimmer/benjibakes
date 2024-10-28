"use client";
import {Button} from "@/components/ui/button";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";
export default function ViewCartButton() {
    const {setSheetOpen, sheetOpen} = useContext(ThemeContext);
    const cartStore = useCartStore();
    if (cartStore.cart.length === 0) {
        return null;
    }
    return (
        <div className="flex justify-center">
            <Button
                onClick={() => setSheetOpen(!sheetOpen)}
                size="lg"
                className="bg-bb-brown text-lg font-semibold hover:bg-bb-brown/80 text-center px-12 py-6"
            >
                View your shopping cart
            </Button>
        </div>
    );
}
