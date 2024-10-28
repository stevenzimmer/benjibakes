import {redirect} from "next/navigation";
import {stripe} from "@/utils/stripe";
import SuccessPageTemplate from "@/components/SuccessPageTemplate";
export default async function SuccessPage({
    searchParams: {id, pay_later},
}: {
    searchParams: {id: string; pay_later: string};
}) {
    if (!id && !pay_later) {
        redirect("/");
    }

    const payment = id ? await stripe.paymentIntents.retrieve(id) : null;

    const charge = payment
        ? await stripe.charges.retrieve(payment.latest_charge as string)
        : null;

    const serializedCharge = charge ? JSON.stringify(charge) : null;

    return <SuccessPageTemplate serializedCharge={serializedCharge} />;
}
