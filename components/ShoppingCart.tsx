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
                className="group "
                variant={"ghost"}
                onClick={handleSelectPickupDate}
            >
                Next Step: Provide customer details and pickup date{" "}
                <ArrowRight
                    className="ml-3 group-hover:translate-x-1 transition-transform duration-200"
                    size={20}
                />
            </Button>
        </>
    );
}
