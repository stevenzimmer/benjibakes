"use client";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import {useCartStore} from "@/store";
import {Price} from "@/types/Cart";
import {Plus, Minus} from "lucide-react";

export default function ProductCard({item}: {item: any}): JSX.Element {
    const {prices} = item;
    const cartStore = useCartStore();
    // cartStore.clearCart();
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
    };
    return (
        <div
            className={` md:px-12 py-12 w-full rounded-lg mb-6 group overflow-hidden relative ${
                item.special ? "bg-orange-100" : "bg-blue-50"
            }`}
        >
            <div className="flex justify-center flex-wrap w-full">
                <div className="w-full md:w-1/2 lg:w-2/5 px-12 md:px-6 mb-6 md:mb-0">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full group-hover:rotate-90 transition-transform duration-200"
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-3/5 px-6">
                    <p className="italic mb-2">{item.label}</p>
                    <h3 className="text-2xl mb-2 font-light">{item.title}</h3>
                    {item.description && (
                        <p className="italic mb-2">{item.description}</p>
                    )}
                    <div className="mt-6 mb-3">
                        <h4 className="text-2xl px-3  font-semibold">
                            Add to cart
                        </h4>
                    </div>
                    <div className="bg-white px-6 rounded-lg border">
                        {item.prices.map((price: any, i: number) => {
                            console.log({price});
                            const cartItem = cartStore.cart.find(
                                (item) => item.price_id === price.id
                            );
                            return (
                                <div
                                    key={i}
                                    className="px-2 py-3 relative flex items-center "
                                >
                                    <div className="relative py-3 lg:w-7/12">
                                        <span className="whitespace-nowrap select-none text-xl font-semibold">
                                            {price.number} cookies for{" "}
                                            {formatPrice(price?.cost ?? 0)}
                                        </span>
                                    </div>

                                    <div className="lg:w-5/12 flex items-center justify-center font-semibold text-lg relative group/prices mx-6 border bg-white p-3 rounded-lg">
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
                                        <p className="mx-6">
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
                    className="absolute bottom-0 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 w-[100px] md:w-[200px] "
                />
            )}
        </div>
    );
}

{
    /* <div
                        key={i}
                        className={` md:px-12 py-12 w-full rounded-lg mb-6 group relative overflow-hidden ${
                            item.special ? "bg-orange-100" : "bg-blue-50"
                        }`}
                    >
                        <div className="flex justify-center items-center flex-wrap w-full">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-12 md:px-6 mb-6">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={200}
                                    height={200}
                                    className="rounded-lg w-full h-full object-contain group-hover:rotate-90 transition-transform duration-200"
                                />
                            </div>
                            <div className="w-full md:w-1/2 lg:w-2/3 px-6">
                                <p className="italic mb-2">{item.label}</p>
                                <h3 className="text-2xl mb-2 font-light">
                                    {item.title}
                                </h3>
                                <p className="italic mb-2">
                                    {item.description}
                                </p>
                                <p className="font-semibold text-lg italic">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                        {item.special && (
                            <Image
                                src="/benji-boo.png"
                                alt="Boo Benji Special"
                                width={150}
                                height={150}
                                className="absolute bottom-0 right-0 translate-x-full group-hover:translate-x-0 transition-transform duration-200 w-[100px] md:w-[150px]"
                            />
                        )}
                    </div> */
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
            } border-2 border-transparent p-3 rounded-lg`}
            onClick={() => onClick(i)}
            title={`${state === "increment" ? "Add" : "Remove"} ${
                price.nickname
            } ${item.name} ${state === "increment" ? "to" : "from"} cart`}
        >
            {children}
        </button>
    );
}
