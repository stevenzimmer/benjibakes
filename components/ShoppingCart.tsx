import {useCartStore} from "@/store";
import CartItem from "./CartItem";
import formatPrice from "@/utils/formatPrice";

import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function ShoppingCart() {
    const cartStore = useCartStore();
    const {setCheckoutState} = useContext(ThemeContext);
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        // console.log({item});
        return acc + item.cost! * item.quantity!;
    }, 0);
    const handleSelectPickupDate = () => {
        setCheckoutState("pickupDate");
        // cartStore.setPickupDate("");
    };
    return (
        <>
            <div className="mb-6">
                {cartStore.cart.map((item, i) => {
                    return <CartItem key={i} item={item} />;
                })}
            </div>
            <p className="mb-6 font-semibold text-xl">
                Cart Total: {formatPrice(totalPrice)}
            </p>

            <Button
                className="group disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed border-2 text-bb-brown border-bb-brown hover:border-bb-brown/80 font-semibold text-lg py-6 hover:text-bb-brown"
                variant={"ghost"}
                onClick={handleSelectPickupDate}
            >
                Provide customer details and pickup date{" "}
                <ArrowRight
                    className="ml-3 group-hover:translate-x-1 transition-transform duration-200"
                    size={20}
                />
            </Button>
        </>
    );
}
