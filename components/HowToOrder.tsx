import Image from "next/image";
import {Separator} from "./ui/separator";
import Link from "next/link";

export default function HowToOrder() {
    return (
        <div className="scroll-my-32" id="order">
            <div className="text-center">
                <h2 className="font-display text-3xl md:text-5xl text-bb-ink mt-6 pb-6 pt-12 border-b border-bb-brown-20 w-full flex items-center justify-center mb-8">
                    How to Order
                </h2>
            </div>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] pt-6 pb-12">
                <div className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            {
                                title: "Choose your cookies",
                                body:
                                    "Pick seasonal favorites from our menu and build your box.",
                            },
                            {
                                title: "Review your cart",
                                body:
                                    "Adjust quantities, then confirm your order details.",
                            },
                            {
                                title: "Add your info",
                                body:
                                    "Share your name, email, and select a pickup date.",
                            },
                            {
                                title: "Pay online",
                                body:
                                    "Checkout securely. We’ll email your receipt instantly.",
                            },
                        ].map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-2xl border border-bb-brown-20 bg-white/90 p-5 shadow-sm"
                            >
                                <p className="text-sm font-semibold text-bb-blue mb-2">
                                    Step {index + 1}
                                </p>
                                <h3 className="font-display text-xl text-bb-ink mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-bb-brown/80 text-sm md:text-base">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-2xl border border-bb-brown-20 bg-bb-brown-10/70 p-6">
                        <p className="text-lg md:text-xl text-bb-brown mb-4">
                            After checkout, we&apos;ll send a confirmation email
                            with your order details and receipt. We&apos;ll
                            follow up to coordinate your pickup time.
                        </p>
                        {/* <BakeryAddress /> */}
                    </div>

                    <Separator className="my-4 border-bb-brown-20" />

                    <div className="space-y-4 text-base md:text-lg text-bb-brown">
                        <p>
                            Looking for something custom?{" "}
                            <Link
                                href="/catering"
                                className="font-semibold underline underline-offset-2"
                                title="Learn more about our Catering options"
                            >
                                Explore catering options
                            </Link>{" "}
                            for events and large orders.
                        </p>
                        <p>
                            Questions? Email{" "}
                            <a
                                className="text-bb-blue font-semibold underline underline-offset-2"
                                href={`mailto:${process.env.NEXT_PUBLIC_SMTP_ORDER_EMAIL}`}
                            >
                                {process.env.NEXT_PUBLIC_SMTP_ORDER_EMAIL}
                            </a>
                            .
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <figure className="rounded-3xl overflow-hidden border border-bb-brown-20 shadow-lg bg-white/90">
                        <Image
                            src="/thank-you-benji.png"
                            alt="Benji says thank you"
                            width={400}
                            height={400}
                            className="w-full object-cover"
                        />
                    </figure>
                    <div className="rounded-2xl border border-bb-brown-20 bg-white/90 p-6">
                        <p className="text-sm uppercase tracking-[0.2em] text-bb-blue font-semibold mb-2">
                            Pickup Details
                        </p>
                        <p className="text-bb-brown">
                            Orders are prepared fresh for your selected pickup
                            date. Need to adjust timing? Just reply to your
                            confirmation email.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
