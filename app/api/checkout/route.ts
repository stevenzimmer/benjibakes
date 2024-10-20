import {stripe} from "@/utils/stripe";
import {NextResponse} from "next/server";
export async function POST(req: Request) {
    const {line_items} = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            return_url: `${req.headers.get(
                "origin"
            )}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json(
            {
                id: session.id,
                client_secret: session.client_secret,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error,
            },
            {
                status: 500,
            }
        );
    }
}
