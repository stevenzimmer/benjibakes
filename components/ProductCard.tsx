"use client";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import {useCartStore} from "@/store";
import {Price} from "@/types/Cart";
import {Plus, Minus} from "lucide-react";
import {useToast} from "@/hooks/use-toast";

export default function ProductCard({
    item,
    i,
}: {
    item: any;
    i: number;
}): JSX.Element {
    const {prices} = item;
    const {toast} = useToast();
    const cartStore = useCartStore();
    const handleAddToCart = (priceIndex: number) => {
        cartStore.addProduct({
            title: `${item.title}`,
            image: item.image,
            id: item.name,
            quantity: 1,
            price_id: prices[priceIndex].id,
            number: prices[priceIndex].number,
            cost: prices[priceIndex].cost,
        });
        toast({
            title: "Added to cart",
            description: `An order of ${prices[priceIndex].number} ${item.title}s has been added to your cart`,
        });
    };

    const handleRemoveFromCart = (priceIndex: number) => {
        cartStore.removeProduct({
            title: `${item.title}`,
            image: item.image,
            id: item.name,
            quantity: 1,
            price_id: prices[priceIndex].id,
            number: prices[priceIndex].number,
            cost: prices[priceIndex].unit_amount,
        });
        toast({
            title: "Removed from cart",
            description: `An order of ${prices[priceIndex].number} ${item.title}s has been removed from your cart`,
        });
    };
    return (
        <div
            className={`xl:px-12 pt-6 md:py-12 w-full rounded-lg mb-12 md:mb-6 group overflow-hidden relative ${
                item.special ? "bg-orange-100" : "bg-blue-50"
            }`}
        >
            <div
                className={`flex justify-center flex-wrap w-full ${
                    i % 2 !== 0 ? "flex-row-reverse" : ""
                }`}
            >
                <div className="w-full md:w-1/2 lg:w-2/5 px-12 md:px-6 mb-6 md:mb-0">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full group-hover:rotate-90 transition-transform duration-200 max-w-md mx-auto"
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-3/5 p-2 md:px-6">
                    <div className="px-4 md:px-0">
                        <p className="italic mb-2">{item.label}</p>
                        <h3 className="text-2xl mb-2 font-light">
                            {item.title}
                        </h3>
                        {item.description && (
                            <p className="italic mb-2">{item.description}</p>
                        )}
                    </div>
                    <div className="bg-white p-3 md:p-6 rounded-lg border mt-6 shadow-lg">
                        <h4 className="md:text-lg px-2 font-semibold">
                            Add {item.title} to cart
                        </h4>
                        {item.prices.map((price: any, i: number) => {
                            const cartItem = cartStore.cart.find(
                                (item) => item.price_id === price.id
                            );
                            return (
                                <div
                                    key={i}
                                    className="px-2 py-3 relative flex items-center justify-between flex-wrap border-b last:border-b-0"
                                >
                                    <div className="relative py-3 w-6/12 lg:w-7/12 text-left">
                                        <span
                                            className=" select-none
                                        sm:text-lg md:text-base lg:text-xl font-semibold"
                                        >
                                            {price.number} cookies for{" "}
                                            {formatPrice(price?.cost ?? 0)}
                                        </span>
                                    </div>

                                    <div className="w-6/12 lg:w-5/12 flex items-center justify-end font-semibold text-lg relative group/prices ">
                                        <QuantityButton
                                            onClick={() =>
                                                handleRemoveFromCart(i)
                                            }
                                            price={price}
                                            item={item}
                                            i={i}
                                            state="decrement"
                                        >
                                            <Minus />
                                        </QuantityButton>
                                        <p className="mx-3 lg:mx-6">
                                            {cartItem?.quantity ?? 0}
                                        </p>
                                        <QuantityButton
                                            onClick={() => handleAddToCart(i)}
                                            price={price}
                                            item={item}
                                            i={i}
                                            state="increment"
                                        >
                                            <Plus />
                                        </QuantityButton>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {item.special && (
                <Image
                    src="/benji-boo.png"
                    alt="Boo Benji Special"
                    width={150}
                    height={150}
                    className="absolute bottom-0 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 w-[100px] md:w-[200px] hidden md:block"
                />
            )}
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
        title: string;
        image: string;
    };
    i: number;
    state: "increment" | "decrement";
}) {
    return (
        <button
            className={`${
                state === "increment"
                    ? " hover:border-green-300"
                    : " hover:border-red-300"
            } bg-slate-100 border-2 border-transparent p-1 lg:p-2 xl:p-3 rounded-lg`}
            onClick={() => onClick(i)}
            title={`${state === "increment" ? "Add" : "Remove"} ${
                price.number
            } ${item.title} ${state === "increment" ? "to" : "from"} cart`}
        >
            {children}
        </button>
    );
}
