"use client";
import {createContext} from "react";

const ThemeContext = createContext({
    showCheckout: false,
    setShowCheckout: (showCheckout: boolean) => {},
    checkoutError: "",
    setCheckoutError: (checkoutError: string) => {},
    showSidebar: false,
    setShowSidebar: (showSidebar: boolean) => {},
    checkoutState: "",
    setCheckoutState: (checkoutState: string) => {},
    sheetOpen: false,
    setSheetOpen: (sheetOpen: boolean) => {},
});

export default ThemeContext;
