import {stripe} from "@/utils/stripe";

import {NextRequest, NextResponse} from "next/server";
import {AddCartType} from "@/types/Cart";
import {calculateOrderAmount} from "@/utils/calculateOrderAmount";

export async function POST(req: NextRequest) {
    const {items, payment_intent_id, pickupDate, customerId} = await req.json();

    const total = calculateOrderAmount(items);

    console.log({total});

    console.log({payment_intent_id});

    console.log({customerId});

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
        console.log("Creating new payment intent");
        try {
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
