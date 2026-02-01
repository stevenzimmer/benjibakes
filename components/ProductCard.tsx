"use client";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import {useCartStore} from "@/store";
import {Price} from "@/types/Cart";
import {Plus, Minus} from "lucide-react";
import {useToast} from "@/hooks/use-toast";

export default function ProductCard({item}: {item: any}): JSX.Element {
    const {prices} = item;
    const {toast} = useToast();
    const cartStore = useCartStore();
    const handleAddToCart = (priceIndex: number) => {
        cartStore.addProduct({
            title: `${item.title}`,
            image: item.image,
            id: item.id,
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
            id: item.id,
            quantity: 1,
            price_id: prices[priceIndex].id,
            number: prices[priceIndex].number,
            cost: prices[priceIndex].cost,
        });
        toast({
            title: "Removed from cart",
            description: `An order of ${prices[priceIndex].number} ${item.title}s has been removed from your cart`,
        });
    };
    return (
        <div
            className={`w-full rounded-[28px] overflow-hidden border border-bb-brown-20 bg-white/90 shadow-[0_20px_50px_rgba(59,36,23,0.12)] group ${
                item.special ? "ring-1 ring-bb-gold/40" : ""
            }`}
        >
            <div className="relative">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 text-bb-brown px-3 py-1 text-xs font-semibold border border-bb-brown-20">
                    {item.label}
                </span>
                <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full h-64 md:h-96 object-contain group-hover:scale-[1.03] transition-transform duration-300"
                />
            </div>
            <div className="p-5">
                <h3 className="font-display text-2xl md:text-3xl text-bb-ink mb-2">
                    {item.title}
                </h3>
                {item.description && (
                    <p className="text-sm md:text-base text-bb-brown/80 mb-5">
                        {item.description}
                    </p>
                )}
                <div className="space-y-3">
                    {item.prices.map((price: any, i: number) => {
                        const cartItem = cartStore.cart.find(
                            (item) => item.price_id === price.id,
                        );
                        return (
                            <div
                                key={i}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-bb-brown-20 bg-bb-brown-10/60 px-4 py-3"
                            >
                                <div>
                                    <p className="font-semibold text-bb-ink">
                                        {price.number} cookies
                                    </p>
                                    <p className="text-sm text-bb-brown/70">
                                        {formatPrice(price?.cost ?? 0)} per box
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <QuantityButton
                                        onClick={() => handleRemoveFromCart(i)}
                                        price={price}
                                        item={item}
                                        i={i}
                                        state="decrement"
                                    >
                                        <Minus size={16} />
                                    </QuantityButton>
                                    <p className="w-6 text-center font-semibold text-bb-ink">
                                        {cartItem?.quantity ?? 0}
                                    </p>
                                    <QuantityButton
                                        onClick={() => handleAddToCart(i)}
                                        price={price}
                                        item={item}
                                        i={i}
                                        state="increment"
                                    >
                                        <Plus size={16} />
                                    </QuantityButton>
                                </div>
                            </div>
                        );
                    })}
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
                    ? "hover:bg-bb-brown hover:text-white"
                    : "hover:bg-bb-rose hover:text-bb-ink"
            } bg-white border border-bb-brown-20 p-2 rounded-full transition-colors`}
            onClick={() => onClick(i)}
            title={`${state === "increment" ? "Add" : "Remove"} ${
                price.number
            } ${item.title} ${state === "increment" ? "to" : "from"} cart`}
        >
            {children}
        </button>
    );
}
