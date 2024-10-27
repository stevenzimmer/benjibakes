"use client";
import {Box} from "lucide-react";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";

import {motion, AnimatePresence} from "framer-motion";
import {useCartStore} from "@/store";
export default function SheetTrigger() {
    const {setSheetOpen, sheetOpen} = useContext(ThemeContext);
    const cartStore = useCartStore();
    const totalQuanity = cartStore.cart.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
    );
    return (
        <button
            aria-label="Open shopping cart"
            className="relative bg-bb-brown md:ml-6  rounded-full px-3 py-1 flex items-center"
            onClick={() => setSheetOpen(!sheetOpen)}
        >
            <Box className="text-white" size={32} />

            <div className="w-6">
                {cartStore.cart.length > 0 && (
                    <AnimatePresence>
                        <motion.span
                            animate={{scale: 1}}
                            initial={{scale: 0}}
                            className="text-white font-semibold"
                        >
                            {totalQuanity > 9 ? "9+" : totalQuanity}
                        </motion.span>
                    </AnimatePresence>
                )}
            </div>
        </button>
    );
}
