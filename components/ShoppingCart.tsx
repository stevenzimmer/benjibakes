import {useCartStore} from "@/store";
import {motion} from "framer-motion";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";

import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
// import {IoAddCircle, IoRemoveCircle} from "react-icons/io5";
import {Button} from "@/components/ui/button";
import {ArrowRight, CirclePlus, CircleMinus} from "lucide-react";

export default function ShoppingCart() {
    const cartStore = useCartStore();
    const {setCheckoutState} = useContext(ThemeContext);
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        // console.log({item});
        return acc + item.unit_amount! * item.quantity!;
    }, 0);
    const handleSelectPickupDate = () => {
        setCheckoutState("pickupDate");
        // cartStore.setPickupDate("");
    };
    return (
        <>
            <div className="mb-6">
                {cartStore.cart.map((item, i) => {
                    // console.log({item});
                    return (
                        <motion.div
                            layout
                            key={i}
                            className="flex items-center py-4  border-b border-bb-brown"
                        >
                            <div className="w-1/4 px-3">
                                <Image
                                    src={item.image!}
                                    className="w-full mb-2 border-bb-blue object-cover mx-auto"
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                />
                                <div className="flex items-center w-full justify-center ">
                                    <button
                                        onClick={() => {
                                            cartStore.removeProduct(item);
                                        }}
                                        className="text-red-300 text-2xl"
                                    >
                                        {/* <IoRemoveCircle /> */}
                                        <CircleMinus />
                                    </button>
                                    <button
                                        onClick={() =>
                                            cartStore.addProduct(item)
                                        }
                                        className="text-green-300 text-2xl"
                                    >
                                        <CirclePlus />
                                        {/* <IoAddCircle /> */}
                                    </button>
                                </div>
                            </div>

                            <div className="w-3/4 px-3">
                                <p className="text-xl font-semibold mb-2">
                                    {item.name}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">
                                        {item.quantity}
                                    </span>{" "}
                                    box
                                    {item.quantity &&
                                        item?.quantity > 1 &&
                                        "es"}{" "}
                                    of {item.price_nickname} cookies
                                </p>

                                <p>
                                    Total:{" "}
                                    <span className="font-semibold">
                                        {formatPrice(
                                            item.unit_amount! * item.quantity!
                                        )}
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    );
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
