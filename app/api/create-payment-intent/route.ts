import {stripe} from "@/utils/stripe";

import {NextRequest, NextResponse} from "next/server";
// import {getServerSession} from "next-auth/next";
// import {authOptions} from "../auth/[...nextauth]/route";

// import {prisma} from "@/lib/prisma";
import {AddCartType} from "@/types/Cart";
import {metadata} from "@/app/layout";

type Item = {
    name: string;
    description: string;
    unit_amount: number;
    image: string;
    quantity: number;
};

const calculateOrderAmount = (items: Item[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!;
    }, 0);
    return totalPrice;
};

export async function POST(req: NextRequest) {
    // console.log(req.body);
    // const request = await req.json();
    // console.log({request})
    // const userSession = await getServerSession(authOptions);

    // if (!userSession) {
    //     return NextResponse.json(
    //         {message: "You must be logged in."},
    //         {
    //             status: 403,
    //         }
    //     );
    // }

    const {items, payment_intent_id, pickupDate, customerId} = await req.json();

    console.log("-----------------------");

    console.log({pickupDate});

    console.log({payment_intent_id});

    console.log({customerId});

    const total = calculateOrderAmount(items);

    if (payment_intent_id) {
        console.log("A payment intent id exists");
        const current_intent = await stripe.paymentIntents.retrieve(
            payment_intent_id
        );

        if (current_intent) {
            console.log("current intent");

            console.log({current_intent});
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
                        },
                        customer: customerId,
                    }
                );

                console.log({updated_intent});

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

                // console.log({existing_order});

                // console.log({updated_order});

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
            console.log("No payment intent id exists, create one...");
            // const retrieveCustomer = await stripe.customers.retrieve();
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(items),
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
                metadata: {
                    pickupDate,
                },
                customer: customerId,
            });

            // orderData.paymentIntentID = paymentIntent.id;

            // const newOrder = await prisma.order.create({
            //     data: orderData,
            // });

            // console.log({newOrder});

            console.log({paymentIntent});

            return NextResponse.json(
                {
                    paymentIntent,
                },
                {
                    status: 200,
                }
            );
        } catch (error) {
            console.error({error});
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
