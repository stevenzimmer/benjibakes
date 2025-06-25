"use client";
import Link from "next/link";

export default function ClosedModal() {
    // const [isOpen, setIsOpen] = useState(true);
    // if (!isOpen) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-black/80 z-20">
            <div className="w-1/2 mx-auto h-full flex items-center justify-center p-6">
                <div className="bg-white p-6 px-12 w-full text-center rounded-xl shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Benji Bakes is Taking a Break 👶🍪
                    </h1>
                    <p className="text-xl">
                        We are welcoming a new addition to our Benji Bakes
                        family so we are pausing orders while we settle into
                        this sweet new season.
                    </p>
                    <p className="text-lg mt-4">
                        Feel free to browse the site, but ordering is closed.
                        Thank you for the support and understanding! 💛 Stay in
                        the loop by following us on{" "}
                        <Link
                            href="https://www.instagram.com/benjibakescookies/"
                            target="_blank"
                            className="text-bb-brown font-semibold underline-offset-2 underline"
                        >
                            Instagram
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
