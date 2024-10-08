"use client";
import {AiFillShopping} from "react-icons/ai";
import {motion, AnimatePresence} from "framer-motion";
import {useCartStore} from "@/store";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function ShoppingCartButton() {
    const cartStore = useCartStore();
    const {showSidebar, setShowSidebar} = useContext(ThemeContext);

    const totalQuanity = cartStore.cart.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
    );

    return (
        <button
            onClick={() => setShowSidebar(true)}
            className="text-5xl text-bb-blue flex items-end relative ml-6"
            // title={`${showSidebar ? "Close" : "View"} Shopping Cart`}
        >
            <AiFillShopping />
            <AnimatePresence>
                {cartStore.cart.length > 0 && (
                    <motion.span
                        animate={{scale: 1}}
                        initial={{scale: 0}}
                        className="absolute -top-1 -right-1 bg-bb-brown text-white font-semibold w-5 h-5 rounded-full text-center flex items-center justify-center text-xs"
                    >
                        {totalQuanity > 9 ? "9+" : totalQuanity}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}
