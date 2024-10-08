import Image from "next/image";
const menuItems = [
    {
        label: "Benji Bakes' Famous",
        title: "Brown Butter Chocolate Chip Cookie",
        description:
            "Our best-seller, the Brown Butter Chocolate Chip Cookie, offers a rich twist on the classic. Made with perfectly browned butter, gooey chocolate chips, and topped with flaky sea salt, these cookies have a depth of flavor that's irresistible.",
        price: "12 for $24 | 24 for $40",
        image: "/bb-choco-chip.png",
    },
    {
        label: "Halloween Special",
        title: "Monster Cookie",
        description: `Introducing our spooktacular October special, the "Monster Cookie"! Packed with M&Ms, pretzels, oats, and chocolate chips, this sweet and salty treat is the perfect addition to your Halloween celebrations. Add them to your boo baskets for a fun and festive surprise!`,
        price: "6 for $13  |  12 for $25",
        image: "/monster-cookie.png",
        special: true,
    },
    {
        label: "Rotating Favorite",
        title: "Celebration Cookie",
        description:
            "Celebrate life's sweet moments with our vibrant Celebration Cookie! Packed with colorful sprinkles and soft, chewy goodness, these cookies are the ultimate party treat. Whether it's a birthday, anniversary, or any occasion, this cookie will make every celebration sweeter.",
        price: "6 for $12  |  12 for $23",
        image: "/celebration.png",
    },
];
const d = new Date();
const month = d.getMonth();

// Create a seasonal menu based on the current month
let season = "";
switch (month) {
    case 0:
    case 1:
    case 2:
        season = "Winter";
        break;

    case 3:
    case 4:
        season = "Spring";
        break;
    case 8:
    case 9:
        season = "Fall";
        break;
    case 10:
    case 11:
        season = "Holiday";
        break;
    default:
        season = "Summer";
        break;
}

export default function Home() {
    return (
        <main className="px-6 pb-12 lg:px-16 lg:pb-16 bg-white max-w-6xl mx-auto rounded-lg relative py-12 md:py-0">
            <div className="lg:sticky top-3 left-0 right-0 px-6 py-3 w-full h-full shadow-md mb-6 md:mb-12 bg-white/80 rounded-lg z-10 hidden md:block">
                <div className="flex justify-center md:justify-between flex-wrap items-center">
                    <div className="w-full md:w-1/12">
                        <Image
                            src="/bb-letters.png"
                            alt="Benji Bakes Letters Icon"
                            width={120}
                            height={120}
                            className="mx-auto mb-6 md:mb-0"
                            title="Benji Bakes Logo"
                        />
                    </div>
                    <div className="w-full md:w-11/12">
                        <div className="w-full flex justify-center text-center md:justify-end items-center flex-wrap ">
                            <a
                                href="#order"
                                className="inline-block text-bb-brown rounded-md text-xl text-center font-semibold px-6 mb-3 md:mb-0"
                            >
                                How to order
                            </a>
                            <a
                                className="bg-bb-brown inline-block px-6 lg:px-12 py-2 lg:py-3 rounded-md text-white text-xl font-semibold hover:bg-bb-brown/90 transition-opacity duration-200"
                                href="#menu"
                            >
                                View our {season} Menu
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="sr-only">Benji Bakes</h1>
            <div className="px-12">
                <figure>
                    <Image
                        src="/logo-horizontal.png"
                        alt="Benji Bakes Logo"
                        width={400}
                        height={400}
                        className="mb-6 mx-auto w-full max-w-lg"
                        title="Benji Bakes Logo"
                    />
                </figure>
            </div>
            <div className="lg:px-12">
                <figure>
                    <Image
                        src="/cookie-stack-crop.png"
                        alt="Brown Butter Cookie Stack"
                        width={600}
                        height={600}
                        className="w-full"
                    />
                </figure>

                <div className="text-center">
                    <div className=" max-w-2xl mx-auto text-xl leading-normal">
                        <h2 className="font-semibold text-2xl mb-3">
                            Welcome to Benji Bakes!
                        </h2>
                        <p>
                            We&apos;re happy you found us! We are an at-home
                            bakery located in Rocklin, California with a passion
                            for <i>really</i> good home-made cookies.{" "}
                            <a href="#menu" className="underline">
                                See our menu
                            </a>{" "}
                            and{" "}
                            <a href="#order" className="underline">
                                order information
                            </a>{" "}
                            below, and be sure to check back often as we swap in
                            new cookies monthly!
                        </p>
                    </div>
                </div>
            </div>

            <div id="menu" className="scroll-my-32">
                <h2 className="text-3xl md:text-5xl text-bb-brown font-light mt-6 pb-6 pt-12 border-b-8 border-dotted w-full flex items-center justify-center mb-6 border-bb-blue/50 font-pw">
                    {season} Menu
                </h2>

                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className={` md:px-12 py-12 w-full rounded-lg mb-6 group relative overflow-hidden ${
                            item.special ? "bg-orange-100" : "bg-blue-50"
                        }`}
                    >
                        <div className="flex justify-center items-center flex-wrap w-full">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-12 md:px-6 mb-6">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={200}
                                    height={200}
                                    className="rounded-lg w-full h-full object-contain group-hover:rotate-90 transition-transform duration-200"
                                />
                            </div>
                            <div className="w-full md:w-1/2 lg:w-2/3 px-6">
                                <p className="italic mb-2">{item.label}</p>
                                <h3 className="text-2xl mb-2 font-light">
                                    {item.title}
                                </h3>
                                <p className="italic mb-2">
                                    {item.description}
                                </p>
                                <p className="font-semibold text-lg italic">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                        {item.special && (
                            <Image
                                src="/benji-boo.png"
                                alt="Boo Benji Special"
                                width={150}
                                height={150}
                                className="absolute bottom-0 right-0 translate-x-full group-hover:translate-x-0 transition-transform duration-200 w-[100px] md:w-[150px]"
                            />
                        )}
                    </div>
                ))}
            </div>

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
                            ! Free delivery for Rocklin, Roseville, Lincoln,
                            Granite Bay, and Loomis areas for orders over $75.
                        </p>
                        <p className=" text-lg md:text-xl text-bb-brown">
                            We accept cash, Zelle payments
                            (allie@benjibakes.com), or{" "}
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
        </main>
    );
}
