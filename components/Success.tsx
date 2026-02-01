import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function Success() {
    const {setCheckoutState, setShowSidebar} = useContext(ThemeContext);
    return (
        <>
            <div className="rounded-2xl border border-bb-brown-20 bg-white/90 p-6 text-center shadow-sm">
                <h2 className="font-display text-2xl text-bb-ink mb-2">
                    Order complete
                </h2>
                <p className="text-bb-brown/80 mb-6">
                    Thank you for your order! A confirmation email is on its
                    way.
                </p>
                <button
                    className="rounded-full bg-bb-brown text-white font-semibold px-6 py-3 hover:bg-bb-ink transition-colors"
                    onClick={() => {
                        setCheckoutState("cart");
                        setShowSidebar(false);
                    }}
                >
                    Back to Home
                </button>
            </div>
        </>
    );
}
