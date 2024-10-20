import {NextResponse} from "next/server";
import {NextApiResponse} from "next";

import {sendEmail} from "@/utils/sendEmail";
import {AddCartType} from "@/types/Cart";

export async function POST(req: Request, res: NextApiResponse) {
    const {cart, email, pickupDate, paymentIntentId} = await req.json();

    const cartItems = cart.reduce((str: string, item: AddCartType) => {
        return str + `<li>${item.quantity} ${item.title}(${item.number})</li>`;
    }, "");

    const html = `
        <h1>Order Summary</h1>
        <h2>Payment Intent ID: ${paymentIntentId}</h2>
        <ul>
            ${cartItems}
        </ul>
        <p>Customer Email: ${email}</p>
        <p>Pick up Date: ${pickupDate}</p>
    `;

    try {
        const {result} = await sendEmail({
            to: process.env.SMTP_ORDER_EMAIL!,
            name: "Steven",
            subject: `Order from ${email}`,
            body: html,
        });

        return NextResponse.json(
            {result},
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

    // const rawBody = await buffer(req.body);

    // console.log({rawBody});

    // const headersList = headers();

    // const sig = headersList.get("stripe-signature");

    // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // if (!sig) {
    //     return NextResponse.json(
    //         {message: "Missing Stripe Signature"},
    //         {
    //             status: 403,
    //         }
    //     );
    // }

    // let event: Stripe.Event;

    // try {
    //     event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!);

    //     console.log({event});
    // } catch (error) {
    //     console.log({error});

    //     return NextResponse.json(
    //         {message: "Webhook Error"},
    //         {
    //             status: 400,
    //         }
    //     );
    // }

    // switch (event.type) {
    //     case "payment_intent.created":
    //         console.log("PaymentIntent was created!");

    //         const paymentIntent = event.data.object as Stripe.PaymentIntent;
    //         console.log({paymentIntent});

    //         console.log("PaymentIntent was created!");

    //         break;

    //     case "charge.succeeded":
    //         console.log("Charge was successful!");

    //         const charge = event.data.object as Stripe.Charge;

    //         console.log({charge});

    //         if (typeof charge.payment_intent === "string") {
    //             // const order = await prisma.order.update({
    //             //     where: {
    //             //         paymentIntentID: charge.payment_intent,
    //             //     },
    //             //     data: {
    //             //         status: "paid",
    //             //     },
    //             // });
    //             console.log("Order was updated!");
    //         }
    //         console.log("Charge was successful!");

    //         console.log("charge ID:", charge.id);
    //         console.log("charge pickup date: ", charge.metadata.pickupDate);
    //         console.log("Charge Email:", charge.receipt_email);
    //         console.log("Charge Amount:", charge.amount);
    //         console.log("Receipt Email:", charge.receipt_url);
    //         console.log("Customer ID:", charge.customer);

    //         break;

    //     default:
    //         console.log(`Unhandled event type ${event.type}`);
    //         break;
    // }
}
