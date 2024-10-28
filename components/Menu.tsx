import season from "@/utils/getSeason";
import ProductCard from "@/components/ProductCard";
import {products} from "@/utils/products";
import ViewCartButton from "./ViewCartButton";

export default async function Menu() {
    return (
        <div id="menu" className="scroll-my-24">
            <h2 className="text-3xl md:text-5xl text-bb-brown font-light mt-6 pb-6 pt-12 border-b-8 border-dotted w-full flex items-center justify-center mb-6 border-bb-blue/50 font-pw">
                {season} Menu
            </h2>

            {products.map((item, i) => (
                <ProductCard item={item} key={i} />
            ))}
            <ViewCartButton />
        </div>
    );
}
