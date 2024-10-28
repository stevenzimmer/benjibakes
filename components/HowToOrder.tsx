import Image from "next/image";
import {Separator} from "./ui/separator";
import BakeryAddress from "./BakeryAddress";
export default function HowToOrder() {
    return (
        <div className="scroll-my-32" id="order">
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl text-bb-brown font-light mt-6 pb-6 pt-12 border-b-8 border-dotted w-full flex items-center justify-center mb-6 border-bb-blue/50 font-pw">
                    How to Order
                </h2>
            </div>
            <div className="flex items-end flex-wrap  -mx-6 pt-6 pb-12">
                <div className="w-full md:w-7/12 px-6 mb-12 lg:mb-0">
                    <ol className=" text-lg md:text-xl text-bb-brown list-decimal pl-6 mb-6">
                        <li>
                            <span className="font-semibold">
                                Choose your cookies
                            </span>{" "}
                            from our seasonal{" "}
                            <a
                                href="#menu"
                                className="text-bb-brown underline font-semibold"
                            >
                                menu
                            </a>{" "}
                            above.
                        </li>
                        <li>
                            <span className="font-semibold">
                                View your shopping cart
                            </span>{" "}
                            and confirm your order.
                        </li>
                        <li>
                            <span className="font-semibold">
                                Provide your email address and select a date
                            </span>{" "}
                            which you&apos;d to pickup the cookies.
                        </li>
                        <li>
                            <span className="font-semibold">
                                Complete your order
                            </span>{" "}
                            through the checkout process.
                        </li>
                    </ol>

                    <p className=" text-lg md:text-xl text-bb-brown mb-6">
                        After order is completed, we will send you a
                        confirmation email with the order details.
                    </p>
                    <BakeryAddress />

                    <Separator className="my-12 border-bb-brown" />

                    <p className=" text-lg md:text-xl text-bb-brown mb-3">
                        <span className="font-semibold">
                            Catering available
                        </span>
                        ! Free delivery for Rocklin, Roseville, Lincoln, Granite
                        Bay, and Loomis areas for catering orders over $75.
                    </p>

                    <p className=" text-lg md:text-xl text-bb-brown mb-12">
                        We accept cash, Zelle payments (
                        {process.env.NEXT_PUBLIC_SMTP_ORDER_EMAIL}), or{" "}
                        <a
                            href="https://venmo.com/benjibakes"
                            target="_blank"
                            className="underline "
                        >
                            Venmo (@benjibakes)
                        </a>
                        .
                    </p>
                    <p className="text-lg md:text-2xl text-bb-brown font-semibold">
                        Email{" "}
                        <a
                            className="text-bb-blue text-xl md:text-2xl leading-loose font-light mb-6 underline "
                            href={`mailto:${process.env.NEXT_PUBLIC_SMTP_ORDER_EMAIL}`}
                        >
                            {process.env.NEXT_PUBLIC_SMTP_ORDER_EMAIL}
                        </a>{" "}
                        if you have any questions
                    </p>
                </div>
                <div className="w-full md:w-5/12 px-6">
                    <figure>
                        <Image
                            src="/thank-you-benji.png"
                            alt="Benji says thank you"
                            width={200}
                            height={200}
                            className="w-full"
                        />
                    </figure>
                </div>
            </div>
        </div>
    );
}
