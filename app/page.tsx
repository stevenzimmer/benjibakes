import Image from "next/image";
const menuItems = [
    {
        label: "Benji Bakes' Famous",
        title: "Brown Butter Chocolate Chip Cookie",
        description:
            "A giant chocolate chip cookie made with toasty brown butter, topped with Maldon sea salt flakes for sweet and salty perfection. Add walnuts for small charge!",
        price: "6 for $12 | 12 for $22 | 24 for $38",
        image: "/bb-choco-chip.png",
    },
    {
        label: "Seasonal Special",
        title: "Pumpkin Snickerdoodle",
        description:
            "A large, chewy snickerdoodle made with brown butter, real pumpkin and cinnamon to ring in the beginning of fall.",
        price: "6 for $14  |  12 for $25",
        image: "/pumpkin-snickerdoodle.png",
    },
    {
        label: "Rotating Favorite",
        title: "Celebration Cookie",
        description:
            "A soft, chewy sugar cookie loaded with colorful sprinkles…perfect for any celebration.",
        price: "6 for $12  |  12 for $22",
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
        <main className="px-6 py-12 lg:p-16 bg-white max-w-6xl mx-auto rounded-lg relative">
            <h1 className="sr-only">Benji Bakes</h1>
            <div className="px-12">
                <figure>
                    <Image
                        src="/logo-horizontal.png"
                        alt="Beni Bakes Logo"
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
                    <a
                        className="bg-bb-brown inline-block px-12 py-3 rounded-md text-white text-xl font-semibold hover:bg-bb-brown/90 transition-opacity duration-200 mb-12"
                        href="#menu"
                    >
                        View our {season} Menu
                    </a>
                    <div className=" max-w-2xl mx-auto text-xl leading-normal">
                        <p>
                            Welcome to Benji Bakes, we&apos;re so happy you
                            found us! We are an at-home bakery located in
                            Rocklin, California with a passion for <i>really</i>{" "}
                            good cookies.
                        </p>
                        <p>
                            See our our menu and order information below, and be
                            sure to check back often as we swap in new cookies
                            monthly!
                        </p>
                    </div>
                </div>
            </div>

            <div id="menu">
                <h2 className="text-3xl md:text-5xl text-bb-brown font-light mt-6 py-6 md:py-12 border-b-8 border-dotted w-full flex items-center justify-center mb-6 border-bb-blue/50 font-pw">
                    {season} Menu
                </h2>

                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className="bg-slate-100 px-6 md:px-12 py-12 w-full rounded-lg mb-6 group"
                    >
                        <div className="flex justify-center items-center flex-wrap w-full">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-6 mb-6">
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
                    </div>
                ))}
            </div>

            <div className="">
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
                    <li>
                        Pickup date and time (either Tuesday or Thursday
                        afternoon)
                    </li>
                </ul>
                <p className="font-semibold text-lg md:text-xl text-bb-brown">
                    Party catering available!
                </p>
                <p className="font-semibold text-lg md:text-xl text-bb-brown">
                    We accept cash, Venmo, or Zelle payments only at this time.
                </p>
            </div>
        </main>
    );
}
