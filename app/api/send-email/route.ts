import {NextResponse} from "next/server";
import {NextApiResponse} from "next";

import {sendEmail} from "@/utils/sendEmail";
import {AddCartType} from "@/types/Cart";

export async function POST(req: Request, res: NextApiResponse) {
    const {cart, email, pickupDate, paymentIntentId} = await req.json();

    const cartItems = cart.reduce((str: string, item: AddCartType) => {
        return (
            str +
            `<li>${item.quantity} order of (${item.number}) ${item.title}</li>`
        );
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
}
