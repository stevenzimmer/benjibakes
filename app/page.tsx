import Image from "next/image";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6 md:px-12 bg-white max-w-6xl mx-auto rounded-lg ">
            <h1 className="sr-only">Benji Bakes</h1>
            <Image
                src="/logo-horizontal.png"
                alt="Beni Bakes Logo"
                width={300}
                height={300}
                className="mb-6 md:mb-12"
            />
            <p className="text-lg md:text-2xl text-amber-900 font-semibold">
                We are taking orders!
            </p>
            <a
                className="text-bb-brown text-xl md:text-3xl font-pw leading-loose font-light inline-block mb-6"
                href="mailto:allie@benjibakes.com"
            >
                allie@benjibakes.com
            </a>
            <Image
                src="/cookie-stack-crop.png"
                alt="Brown Butter Cookie Stack"
                width={600}
                height={600}
                className="mb-6"
            />
            <p></p>
            <p className="text-lg md:text-xl text-amber-900">
                So much more to come, stay tuned...
            </p>
        </main>
    );
}
