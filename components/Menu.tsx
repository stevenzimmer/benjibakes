import season from "@/utils/getSeason";
import ProductCard from "@/components/ProductCard";
import {products} from "@/utils/products";
// import ViewCartButton from "./ViewCartButton";

export default async function Menu() {
    return (
        <div id="menu" className="scroll-my-24">
            <h2 className="font-display text-3xl md:text-5xl text-bb-ink mt-6 pb-6 pt-12 border-b border-bb-brown-20 w-full flex items-center justify-center mb-8">
                Menu
            </h2>

            <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
                {products.map((item, i) => (
                    <ProductCard item={item} key={i} />
                ))}
            </div>
            {/* <ViewCartButton /> */}
        </div>
    );
}
