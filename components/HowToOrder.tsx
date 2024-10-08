import Image from "next/image";

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
                    <p className="text-lg md:text-2xl text-bb-brown font-semibold">
                        Email orders to{" "}
                    </p>
                    <a
                        className="text-bb-blue text-xl md:text-2xl leading-loose font-light mb-6 underline block"
                        href="mailto:allie@benjibakes.com"
                    >
                        allie@benjibakes.com
                    </a>

                    <p className="text-lg md:text-xl text-bb-brown mb-1">
                        In the email, please include your:
                    </p>
                    <ul className="list-disc pl-8 text-lg md:text-xl text-bb-brown mb-3">
                        <li>Name</li>
                        <li>Phone number</li>
                        <li>Order details</li>
                        <li>Pickup date and time</li>
                    </ul>
                    <p className=" text-lg md:text-xl text-bb-brown mb-3">
                        <span className="font-semibold">
                            Catering available
                        </span>
                        ! Free delivery for Rocklin, Roseville, Lincoln, Granite
                        Bay, and Loomis areas for orders over $75.
                    </p>
                    <p className=" text-lg md:text-xl text-bb-brown">
                        We accept cash, Zelle payments (allie@benjibakes.com),
                        or{" "}
                        <a
                            href="https://venmo.com/benjibakes"
                            target="_blank"
                            className="underline "
                        >
                            Venmo (@benjibakes)
                        </a>
                        .
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
