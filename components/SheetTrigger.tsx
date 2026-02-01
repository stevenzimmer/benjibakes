"use client";
import {ShoppingBag} from "lucide-react";
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
            className="relative bg-bb-brown text-white ml-2 sm:ml-4 rounded-full px-4 py-2 flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => setSheetOpen(!sheetOpen)}
        >
            <ShoppingBag className="text-white" size={18} />
            <span className="text-sm md:text-base font-semibold">
                Cart
            </span>

            {cartStore.cart.length > 0 && (
                <AnimatePresence>
                    <motion.div
                        animate={{scale: 1}}
                        initial={{scale: 0}}
                        className="w-5"
                    >
                        <span className="text-white font-semibold">
                            {totalQuanity > 9 ? "9+" : totalQuanity}
                        </span>
                    </motion.div>
                </AnimatePresence>
            )}
        </button>
    );
}
