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
