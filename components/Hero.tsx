import Image from "next/image";
export default function Hero() {
    return (
        <>
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
                        title="Brown Butter Cookie Stack"
                        width={1000}
                        height={1000}
                        className="w-full"
                    />
                </figure>

                <div className="text-center">
                    <div className=" max-w-2xl mx-auto text-xl leading-normal">
                        <p>
                            Welcome to Benji Bakes, we&apos;re so happy you
                            found us! We are an at-home bakery located in
                            Rocklin, California with a passion for <i>really</i>{" "}
                            good cookies.
                        </p>
                        <p>
                            See our{" "}
                            <a
                                href="#menu"
                                className="underline font-semibold underline-offset-2"
                            >
                                menu
                            </a>{" "}
                            and{" "}
                            <a
                                href="#order"
                                className="underline font-semibold underline-offset-2"
                            >
                                order information
                            </a>{" "}
                            below, and be sure to check back often as we swap in
                            new cookies monthly!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
