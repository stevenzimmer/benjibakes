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
        return acc + item.cost! * item.quantity!;
    }, 0);
    const handleSelectPickupDate = () => {
        setCheckoutState("customerDetails");
    };
    return (
        <>
            <div className="mb-6">
                {cartStore.cart.map((item, i) => {
                    return <CartItem key={i} item={item} />;
                })}
            </div>
            <p className="mb-6 font-semibold text-xl">
                Order Total: {formatPrice(totalPrice)}
            </p>
            <div className="sticky bottom-0 right-0 flex justify-end">
                <Button
                    className="group text-bb-brown  font-semibold py-6 text-base md:text-lg flex justify-end bg-bb-brown-10 hover:bg-bb-brown-20 hover:text-bb-brown shadow-lg"
                    variant="ghost"
                    onClick={handleSelectPickupDate}
                >
                    Provide customer details{" "}
                    <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={16}
                    />
                </Button>
            </div>
        </>
    );
}
