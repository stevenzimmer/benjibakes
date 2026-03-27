import {stripe} from "@/utils/stripe";

import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {email, name} = await req.json();

    try {
        const searchCustomers = await stripe.customers.search({
            query: `email:\'${email}\'`,
        });

        let newCustomer;

        let isNewCustomer = false;

        if (!searchCustomers.data.length) {
            isNewCustomer = true;
            newCustomer = await stripe.customers.create({
                email,
                name,
            });
        }

        return NextResponse.json(
            {
                customer: newCustomer || searchCustomers.data[0],
                isNewCustomer,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error && error.message,
            },
            {
                status: 500,
            },
        );
    }
}
