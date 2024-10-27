import {stripe} from "@/utils/stripe";

import {NextRequest, NextResponse} from "next/server";
import {AddCartType} from "@/types/Cart";
import {calculateOrderAmount} from "@/utils/calculateOrderAmount";

export async function POST(req: NextRequest) {
    const {items, payment_intent_id, pickupDate, customerId} = await req.json();

    const total = calculateOrderAmount(items);

    const orderInfo = items
        .map((item: AddCartType) => {
            return `(${item.quantity}) ${item.price_id} | `;
        })
        .toString();

    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(
            payment_intent_id
        );

        if (current_intent) {
            if (current_intent.status === "succeeded") {
                return NextResponse.json(
                    {
                        paymentIntent: current_intent,
                    },
                    {
                        status: 200,
                    }
                );
            } else {
                const updated_intent = await stripe.paymentIntents.update(
                    payment_intent_id,
                    {
                        amount: total,
                        metadata: {
                            pickupDate,
                            orderInfo,
                        },
                        customer: customerId,
                    }
                );

                //Fetch order with product ids
                // const [existing_order, updated_order] = await Promise.all([
                //     prisma.order.findFirst({
                //         where: {paymentIntentID: updated_intent.id},
                //         include: {products: true},
                //     }),
                //     prisma.order.update({
                //         where: {paymentIntentID: updated_intent.id},
                //         data: {
                //             amount: total,
                //             products: {
                //                 deleteMany: {},
                //                 create: items.map((item) => ({
                //                     name: item.name,
                //                     description: item.description || null,
                //                     unit_amount: parseFloat(item.unit_amount),
                //                     image: item.image,
                //                     quantity: item.quantity,
                //                 })),
                //             },
                //         },
                //     }),
                // ]);

                // if (!existing_order) {
                //     return NextResponse.json(
                //         {
                //             message: "Invalid Payment Intent",
                //         },
                //         {
                //             status: 400,
                //         }
                //     );
                // }

                return NextResponse.json(
                    {
                        paymentIntent: updated_intent,
                    },
                    {
                        status: 200,
                    }
                );
            }
        }
    } else {
        try {
            // console.log("No payment intent id exists, create one...");
            // const retrieveCustomer = await stripe.customers.retrieve();
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(items),
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
                metadata: {
                    pickupDate,
                    orderInfo,
                },
                customer: customerId,
            });

            // orderData.paymentIntentID = paymentIntent.id;

            // const newOrder = await prisma.order.create({
            //     data: orderData,
            // });

            // console.log({newOrder});

            return NextResponse.json(
                {
                    paymentIntent,
                },
                {
                    status: 200,
                }
            );
        } catch (error) {
            return NextResponse.json(
                {
                    error: "Error creating payment intent",
                },
                {
                    status: 500,
                }
            );
        }
    }
}
