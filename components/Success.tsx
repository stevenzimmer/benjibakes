import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function Success() {
    const {setCheckoutState, setShowSidebar} = useContext(ThemeContext);
    return (
        <>
            <div>Success</div>
            <div>Thank you for your order!</div>
            <button
                onClick={() => {
                    setCheckoutState("cart");
                    setShowSidebar(false);
                }}
            >
                Back to Home
            </button>
        </>
    );
}
