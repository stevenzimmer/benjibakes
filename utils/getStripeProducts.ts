import {stripe} from "./stripe";

export const getStripeProducts = async () => {
    const getProducts = await stripe.products.list({
        active: true,
    });

    // Sort products by menu_order number in metadata
    const products = getProducts.data.sort(
        (a, b) =>
            parseInt(a.metadata.menu_order, 10) -
            parseInt(b.metadata.menu_order, 10)
    );

    // console.log({products});

    const productsWithPrices = await Promise.all(
        products.map(async (product) => {
            // console.log({product});
            const getPrices = await stripe.prices.list({product: product.id});

            // Sort prices by unit_amount
            const prices = getPrices.data.sort(
                (a, b) => (a?.unit_amount ?? 0) - (b?.unit_amount ?? 0)
            );
            // console.log({prices});
            return {
                id: product.id,
                menu_label: product.metadata.menu_label,
                name: product.name,
                description: product.description,
                image: product.images[0],
                currency: "usd",
                prices,
            };
        })
    );
    return productsWithPrices;
};
