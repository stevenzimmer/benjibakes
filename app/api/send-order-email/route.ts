import {NextResponse} from "next/server";
import {NextApiResponse} from "next";

import {sendEmail} from "@/utils/sendEmail";
import {AddCartType} from "@/types/Cart";
import {calculateOrderAmount} from "@/utils/calculateOrderAmount";
import formatPrice from "@/utils/formatPrice";
export async function POST(req: Request, res: NextApiResponse) {
    const {cart, email, pickupDate, name} = await req.json();

    const cartItems = cart.reduce((str: string, item: AddCartType) => {
        return (
            str +
            `<li>${item.quantity} order${item.quantity &&
                item.quantity > 1 &&
                "s"} of (${item.number}) ${item.title}</li>`
        );
    }, "");

    const total = calculateOrderAmount(cart);

    const htmlStore = `
        <h1>Order Summary</h1>
        <h2>Items:</h2>
        <ul>
            ${cartItems}
        </ul>
        <p>Customer Email: ${email}</p>
        <p>Customer Name: ${name}</p>
        <p>Pick up Date: ${pickupDate}</p>
        <p>Amount due on pickup: ${formatPrice(total)}</p>
    `;

    const htmlCustomer = `
        <h1>Thank you for your order!</h1>
        <h2>Items:</h2>
        <ul>
            ${cartItems}
        </ul>
        <p>Amount due on pickup: ${formatPrice(total)}</p>
        
        <p>Your order will be ready for pick up anytime between 3pm and 6pm on ${pickupDate}</p>
        <p>Pick up location:</p>
        <p>Benji Bakes</p>
        <p>4535 Mountaingate Dr.</p>
        <p>Rocklin, Ca 95765</p>
        <p><a href="https://www.google.com/maps/place/4535+Mountaingate+Dr,+Rocklin,+CA+95765/@38.8288284,-121.2527969,17z/data=!3m1!4b1!4m6!3m5!1s0x809b1897ec277435:0x31e0224be2fb318c!8m2!3d38.8288284!4d-121.250222!16s%2Fg%2F11c2gc8b9g?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank">View on map</a></p>
        <p>Please reply to this email or reach out to us at allie@benjibakes.com if you have any questions or need to make changes to your order.</p>
        <p>Thank you for choosing Benji Bakes!</p>
    `;

    try {
        // Send email to the store
        const {result} = await sendEmail({
            // to: process.env.SMTP_ORDER_EMAIL!,
            to: "webdevzim@gmail.com",
            name: "Steven",
            subject: `Pay on pickup Order from ${name}`,
            body: htmlStore,
        });

        // Send email to the customer
        const {result: resultCustomer} = await sendEmail({
            to: email,
            name,
            subject: `Benji Bakes order`,
            body: htmlCustomer,
        });

        console.log({result});

        return NextResponse.json(
            {result, resultCustomer},
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
