import {motion} from "framer-motion";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
// import {CircleMinus, CirclePlus} from "lucide-react";
import type {AddCartType} from "@/types/Cart";
// import { useCartStore } from "@/store";
export default function CartItem({item}: {item: AddCartType}) {
    return (
        <motion.div
            layout
            className="flex lg:items-center py-4  border-b border-bb-brown w-full"
        >
            <div className="w-1/4 px-3">
                <Image
                    src={item.image!}
                    className="w-full  border-bb-blue object-cover mx-auto"
                    alt={item.title}
                    width={100}
                    height={100}
                />
            </div>

            <div className="w-3/4 px-3">
                <p className="text-base lg:text-xl font-semibold mb-2">{item.title}</p>
                <p className="mb-2 text-xs lg:text-base">
                    <span className="font-semibold ">{item.quantity}</span> box
                    {item.quantity && item?.quantity > 1 && "es"} of{" "}
                    {item.number} cookies
                </p>

                <p className="text-xs lg:text-base">
                    Total:{" "}
                    <span className="font-semibold">
                        {formatPrice(item.cost! * item.quantity!)}
                    </span>
                </p>
            </div>
        </motion.div>
    );
}
