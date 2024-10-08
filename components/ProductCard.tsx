"use client";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import {useCartStore} from "@/store";
import {motion, AnimatePresence} from "framer-motion";
import {Price} from "@/types/Cart";
export default function ProductCard({
    item,
}: {
    item: {
        name: string;
        id: string;
        unit_amount: number;
        image: string;
        menu_label: string;
        description: string;
        price_nickname: string;
        price_id: string;
        prices: Price[];
    };
}): JSX.Element {
    const {prices} = item;
    const cartStore = useCartStore();
    const handleAddToCart = (priceIndex: number) => {
        cartStore.addProduct({
            name: `${item.name}`,
            image: item.image,
            id: item.name,
            quantity: 1,
            price_id: prices[priceIndex].id,
            price_nickname: prices[priceIndex].nickname,
            unit_amount: prices[priceIndex].unit_amount,
        });
    };

    const handleRemoveFromCart = (priceIndex: number) => {
        cartStore.removeProduct({
            name: `${item.name}`,
            image: item.image,
            id: item.name,
            quantity: 1,
            price_id: prices[priceIndex].id,
            price_nickname: prices[priceIndex].nickname,
            unit_amount: prices[priceIndex].unit_amount,
        });
    };
    return (
        <div className="bg-slate-100 md:px-12 py-12 w-full rounded-lg mb-6 group">
            <div className="flex justify-center items-center flex-wrap w-full">
                <div className="w-full md:w-1/2 lg:w-1/3 px-12 md:px-6 mb-6">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="rounded-lg w-full h-full object-contain group-hover:rotate-90 transition-transform duration-200"
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3 px-6">
                    <p className="italic mb-2">{item.menu_label}</p>
                    <h3 className="text-2xl mb-2 font-light">{item.name}</h3>
                    {item.description && (
                        <p className="italic mb-2">{item.description}</p>
                    )}
                    <div className="mt-6">
                        <h4 className="text-lg  font-semibold">Add to cart</h4>
                    </div>
                    <div className="flex items-center flex-wrap -mx-2">
                        {prices.map((price, i) => {
                            const cartItem = cartStore.cart.find((item) => {
                                return item.price_id === price.id;
                            });
                            return (
                                <div
                                    key={i}
                                    className="w-32 hover:w-44 transition-all px-2 py-3 relative"
                                >
                                    {cartItem && (
                                        <AnimatePresence>
                                            {cartStore.cart.length > 0 && (
                                                <motion.span
                                                    animate={{scale: 1}}
                                                    initial={{scale: 0}}
                                                    className="absolute top-0 right-0 bg-bb-brown text-white font-semibold w-6 h-6  rounded-full text-center flex items-center justify-center text-sm z-10"
                                                >
                                                    {cartItem.quantity}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    )}
                                    <div className="font-semibold text-lg bg-white rounded-lg border-2 border-bb-brown relative group/prices flex items-center text-center justify-center overflow-hidden">
                                        {cartItem && (
                                            <QuantityButton
                                                onClick={() =>
                                                    handleRemoveFromCart(i)
                                                }
                                                price={price}
                                                item={item}
                                                i={i}
                                                state="decrement"
                                            >
                                                -
                                            </QuantityButton>
                                        )}

                                        <div className="relative py-3 text-center">
                                            <span className="whitespace-nowrap select-none cursor-pointer">
                                                {price.nickname} for{" "}
                                                {formatPrice(
                                                    price?.unit_amount ?? 0
                                                )}
                                            </span>
                                        </div>
                                        <QuantityButton
                                            onClick={() => handleAddToCart(i)}
                                            price={price}
                                            item={item}
                                            i={i}
                                            state="increment"
                                        >
                                            +
                                        </QuantityButton>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuantityButton({
    children,
    onClick,
    price,
    item,
    i,
    state = "increment",
}: {
    children: React.ReactNode;
    onClick: (i: number) => void;
    price: Price;
    item: {
        name: string;
        image: string;
    };
    i: number;
    state: "increment" | "decrement";
}) {
    return (
        <button
            className={`${
                state === "increment"
                    ? "bg-green-200 hover:border-green-300 right-0"
                    : "bg-red-200 hover:border-red-300 left-0"
            } border-2 border-transparent absolute top-0 bottom-0 h-full group-hover/prices:opacity-100 opacity-0 duration-200 transition-all w-0 group-hover/prices:w-8 `}
            onClick={() => onClick(i)}
            title={`${state === "increment" ? "Add" : "Remove"} ${
                price.nickname
            } ${item.name} ${state === "increment" ? "to" : "from"} cart`}
        >
            {children}
        </button>
    );
}
