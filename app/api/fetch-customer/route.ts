import {stripe} from "@/utils/stripe";

import {NextRequest, NextResponse} from "next/server";
// import {getServerSession} from "next-auth/next";
// import {authOptions} from "../auth/[...nextauth]/route";

// import {prisma} from "@/lib/prisma";
import {AddCartType} from "@/types/Cart";
import {metadata} from "@/app/layout";

// type Item = {
//     name: string;
//     description: string;
//     unit_amount: number;
//     image: string;
//     quantity: number;
// };

// const calculateOrderAmount = (items: Item[]) => {
//     const totalPrice = items.reduce((acc, item) => {
//         return acc + item.unit_amount! * item.quantity!;
//     }, 0);
//     return totalPrice;
// };

export async function POST(req: Request) {
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

    const {email} = await req.json();

    console.log("-----------------------");

    // console.log({pickupDate});

    console.log({email});

    // console.log({payment_intent_id});

    // const total = calculateOrderAmount(items);

    try {
        const searchCustomers = await stripe.customers.search({
            query: `email:\'${email}\'`,
        });

        let newCustomer;

        if (!searchCustomers.data.length) {
            newCustomer = await stripe.customers.create({
                email,
            });
        }

        console.log({newCustomer});

        console.log("searched customer", searchCustomers.data);

        console.log("-----------------------");

        return NextResponse.json(
            {
                customer: newCustomer || searchCustomers.data[0],
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error && error.message,
            },
            {
                status: 500,
            }
        );
    }

    // Create Order Data
    // const orderData = {
    //     amount: total,
    //     currency: "usd",
    //     status: "pending",
    //     paymentIntentID: payment_intent_id,
    //     products: {
    //         create: items.map((item: Item) => ({
    //             name: item.name,
    //             description: item.description || null,
    //             unit_amount: item.unit_amount,
    //             image: item.image,
    //             quantity: item.quantity,
    //         })),
    //     },
    //     metadata: {
    //         dropOffDateTime,
    //     },
    // };

    // if (payment_intent_id) {
    //     console.log("A payment intent id exists");
    //     const current_intent = await stripe.paymentIntents.retrieve(
    //         payment_intent_id
    //     );

    //     if (current_intent) {
    //         console.log("current intent");

    //         console.log({current_intent});
    //         if (current_intent.status === "succeeded") {
    //             return NextResponse.json(
    //                 {
    //                     paymentIntent: current_intent,
    //                 },
    //                 {
    //                     status: 200,
    //                 }
    //             );
    //         } else {
    //             // const updated_intent = await stripe.paymentIntents.update(
    //             //     payment_intent_id,
    //             //     {
    //             //         amount: total,
    //             //         metadata: {
    //             //             pickupDate,
    //             //         },
    //             //     }
    //             // );

    //             // console.log({updated_intent});

    //             //Fetch order with product ids
    //             // const [existing_order, updated_order] = await Promise.all([
    //             //     prisma.order.findFirst({
    //             //         where: {paymentIntentID: updated_intent.id},
    //             //         include: {products: true},
    //             //     }),
    //             //     prisma.order.update({
    //             //         where: {paymentIntentID: updated_intent.id},
    //             //         data: {
    //             //             amount: total,
    //             //             products: {
    //             //                 deleteMany: {},
    //             //                 create: items.map((item) => ({
    //             //                     name: item.name,
    //             //                     description: item.description || null,
    //             //                     unit_amount: parseFloat(item.unit_amount),
    //             //                     image: item.image,
    //             //                     quantity: item.quantity,
    //             //                 })),
    //             //             },
    //             //         },
    //             //     }),
    //             // ]);

    //             // console.log({existing_order});

    //             // console.log({updated_order});

    //             // if (!existing_order) {
    //             //     return NextResponse.json(
    //             //         {
    //             //             message: "Invalid Payment Intent",
    //             //         },
    //             //         {
    //             //             status: 400,
    //             //         }
    //             //     );
    //             // }

    //             return NextResponse.json(
    //                 {
    //                     paymentIntent: updated_intent,
    //                 },
    //                 {
    //                     status: 200,
    //                 }
    //             );
    //         }
    //     }
    // } else {
    //     console.log("No payment intent id exists, create one...");
    //     // const retrieveCustomer = await stripe.customers.retrieve();
    //     // const paymentIntent = await stripe.paymentIntents.create({
    //     //     amount: calculateOrderAmount(items),
    //     //     currency: "usd",
    //     //     automatic_payment_methods: {enabled: true},
    //     //     metadata: {
    //     //         pickupDate,
    //     //     },
    //     // });

    //     // orderData.paymentIntentID = paymentIntent.id;

    //     // const newOrder = await prisma.order.create({
    //     //     data: orderData,
    //     // });

    //     // console.log({newOrder});

    //     // console.log({paymentIntent});

    //     return NextResponse.json(
    //         {
    //             paymentIntent,
    //         },
    //         {
    //             status: 200,
    //         }
    //     );
    // }
}
