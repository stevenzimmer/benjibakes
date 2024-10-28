import {stripe} from "./stripe";

export const getStripeProduct = async (prodId: string) => {
    const product = await stripe.products.retrieve(prodId);

    const price = await stripe.prices.list({product: prodId});

    const productWithPrice = {
        id: product.id,
        name: product.name,
        unit_amount: price.data[0].unit_amount,
        description: product.description,
        image: product.images[0],
        currency: price.data[0].currency,
    };
    return productWithPrice;
};
