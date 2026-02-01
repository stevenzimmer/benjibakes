import {motion} from "framer-motion";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import type {AddCartType} from "@/types/Cart";
export default function CartItem({item}: {item: AddCartType}) {
    return (
        <motion.div
            layout
            className="flex lg:items-center py-4 border-b border-bb-brown-20 w-full gap-4"
        >
            <div className="w-1/4 px-2">
                <Image
                    src={item.image!}
                    className="w-full rounded-xl border border-bb-brown-20 object-cover mx-auto"
                    alt={item.title}
                    width={100}
                    height={100}
                />
            </div>

            <div className="w-3/4 px-2">
                <p className="text-lg md:text-xl font-semibold mb-1 text-bb-ink">
                    {item.title}
                </p>
                <p className="mb-2 text-sm md:text-base text-bb-brown/80">
                    <span className="font-semibold text-bb-ink">
                        {item.quantity}
                    </span>{" "}
                    box{item.quantity && item?.quantity > 1 && "es"} of{" "}
                    {item.number} cookies
                </p>

                <p className="text-sm md:text-base text-bb-brown">
                    Total:{" "}
                    <span className="font-semibold text-bb-ink">
                        {formatPrice(item.cost! * item.quantity!)}
                    </span>
                </p>
            </div>
        </motion.div>
    );
}
