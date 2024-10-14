"use client";
import {useState} from "react";
import ThemeContext from "@/context/ThemeContext";

export default function ThemeProvider({children}: {children: React.ReactNode}) {
    const [showCheckout, setShowCheckout] = useState<boolean>(false);
    const [checkoutError, setCheckoutError] = useState<string>("");
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [checkoutState, setCheckoutState] = useState<string>("cart");
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);

    return (
        <ThemeContext.Provider
            value={{
                showCheckout,
                setShowCheckout,
                checkoutError,
                setCheckoutError,
                showSidebar,
                setShowSidebar,
                checkoutState,
                setCheckoutState,
                sheetOpen,
                setSheetOpen,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
