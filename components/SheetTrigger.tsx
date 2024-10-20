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
        <div className="relative ">
            <Box
                onClick={() => setSheetOpen(!sheetOpen)}
                className="md:ml-6 text-bb-brown"
                size={32}
            />
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
    );
}
