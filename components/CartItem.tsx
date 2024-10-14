import {motion} from "framer-motion";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";

import type {AddCartType} from "@/types/Cart";
export default function CartItem({item}: {item: AddCartType}) {

    return (
        <motion.div
            layout
            className="flex items-center py-4  border-b border-bb-brown"
        >
            <div className="w-1/4 px-3">
                <Image
                    src={item.image!}
                    className="w-full  border-bb-blue object-cover mx-auto"
                    alt={item.name}
                    width={100}
                    height={100}
                />
                {/* <div className="flex items-center w-full justify-center mt-2">
                    <button
                        onClick={() => {
                            cartStore.removeProduct(item);
                        }}
                        className="text-red-300 text-2xl"
                    >
                        <CircleMinus />
                    </button>
                    <button
                        onClick={() => cartStore.addProduct(item)}
                        className="text-green-300 text-2xl"
                    >
                        <CirclePlus />
                    </button>
                </div> */}
            </div>

            <div className="w-3/4 px-3">
                <p className="text-xl font-semibold mb-2">{item.name}</p>
                <p className="mb-2">
                    <span className="font-semibold">{item.quantity}</span> box
                    {item.quantity && item?.quantity > 1 && "es"} of{" "}
                    {item.price_nickname} cookies
                </p>

                <p>
                    Total:{" "}
                    <span className="font-semibold">
                        {formatPrice(item.unit_amount! * item.quantity!)}
                    </span>
                </p>
            </div>
        </motion.div>
    );
}
