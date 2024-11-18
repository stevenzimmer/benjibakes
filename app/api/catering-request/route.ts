import {NextResponse} from "next/server";
import {NextApiResponse} from "next";

import {sendEmail} from "@/utils/sendEmail";

export async function POST(req: Request, res: NextApiResponse) {
    const {details, email, eventDate, username} = await req.json();

    console.log({details});
    console.log({email});
    console.log({eventDate});
    console.log({username});

    const html = `
        <h1>Catering Request from ${username}</h1>
        <h2>Event Details</h2>
        <p>${details}</p>
        <p>Event Date: ${eventDate}</p>
        <p>Customer Email: ${email}</p>
    `;

    try {
        const {result} = await sendEmail({
            to: process.env.SMTP_ORDER_EMAIL!,
            subject: `Catering request from ${username}`,
            body: html,
        });

        return NextResponse.json(
            {result: "success"},
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
